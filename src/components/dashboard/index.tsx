import React, { FC, ReactElement } from "react";
import { connect, ConnectedProps } from "react-redux";
import { setDashBoardDetails } from "../../store/actions/base.action";
import { IRootState } from "../../store/types/base.type";

interface IProps extends PropsFromRedux {}

const Dashboard: FC<IProps> = ({ dashboardDetails, ...props }): ReactElement => {
  React.useEffect(() => {
    setTimeout(() => {
      props.setDashBoardDetails({ name: "Hey, Its Dashboard" });
    }, 10000);
  }, [props]);
  return (
    <div>
      <h1 data-testid="dashboard-heading">{dashboardDetails?.header || ""}</h1>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  dashboardDetails: state.root.dashboard,
});

const mapDispatchToProps = { setDashBoardDetails };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Dashboard);
