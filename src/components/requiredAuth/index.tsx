import React, { FC, ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setLoginDetails } from "../../store/actions/base.action";
import { IRootState } from "../../store/types/base.type";
import { AuthService } from "../../services/auth.service";
import { GridLoading } from "../../widgets/GridLoading";
import {
  currentDate,
  getItemFromLocalStorage,
  parseJwt,
  setItemInLocalStorage,
  ssoLoginURL,
} from "../../utils/helper/helper";
import { IValidateCode } from "../../types/response.type";

interface IProps extends PropsFromRedux {
  children: JSX.Element;
}

const authService = new AuthService();

const RequiredAuth: FC<IProps> = ({ ...props }): ReactElement => {
  const [isAuthenticated, setAuthenticated] = React.useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  let cronJob: any;

  const setUserDetails = (data: IValidateCode) => {
    setItemInLocalStorage("access_token", data.accessToken);
    setItemInLocalStorage("refresh_token", data.refreshToken);
    const tokenDetails = parseJwt(data.accessToken);
    const userDetails = {
      name: tokenDetails?.name || "NA",
      userName: tokenDetails?.preferred_username || "NA",
      firstName: tokenDetails?.given_name || "NA",
      lastName: tokenDetails?.family_name || "NA",
      email: tokenDetails?.email || "NA",
    };
    clearInterval(cronJob);
    cronJob = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      validateRefreshToken(data.refreshToken);
    }, tokenDetails.exp * 1000 - currentDate());
    setItemInLocalStorage("user_details", JSON.stringify(userDetails));
    setAuthenticated(true);
    setSearchParams({});
  };

  const validateRefreshToken = async (refreshToken: string) => {
    try {
      const response = await authService.validateCode("refresh_token", refreshToken || "");
      setUserDetails(response);
    } catch (error) {
      ssoLoginURL();
    }
  };

  const validateCodeAPI = async () => {
    const accessToken = getItemFromLocalStorage("access_token");
    const refreshToken = getItemFromLocalStorage("refresh_token");
    const authCode = searchParams.get("code");
    if (accessToken && refreshToken && !authCode) {
      const tokenDetails = parseJwt(accessToken);
      if (tokenDetails?.exp && currentDate() >= tokenDetails.exp * 1000) {
        validateRefreshToken(refreshToken);
      } else {
        const userDetails = {
          name: tokenDetails?.name || "NA",
          userName: tokenDetails?.preferred_username || "NA",
          firstName: tokenDetails?.given_name || "NA",
          lastName: tokenDetails?.family_name || "NA",
          email: tokenDetails?.email || "NA",
        };
        clearInterval(cronJob);
        cronJob = setTimeout(() => {
          validateRefreshToken(refreshToken);
        }, tokenDetails.exp * 1000 - currentDate());
        setItemInLocalStorage("user_details", JSON.stringify(userDetails));
        setAuthenticated(true);
      }
    } else if (authCode) {
      try {
        const response = await authService.validateCode("code", authCode || "");
        setUserDetails(response);
      } catch (error) {
        ssoLoginURL();
      }
    } else {
      ssoLoginURL();
    }
  };

  React.useEffect(() => {
    validateCodeAPI();

    return () => clearInterval(cronJob);
  }, []); //eslint-disable-line

  return !isAuthenticated ? <GridLoading /> : props.children;
};

const mapStateToProps = (state: IRootState) => ({
  loginDetails: state.root.login,
});

const mapDispatchToProps = { setLoginDetails };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RequiredAuth);
