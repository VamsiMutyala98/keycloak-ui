import { IValidateCode, IValidateCodeResponse } from "../../types/response.type";

class APIhelper {
  helper = "";

  userDTO(data: IValidateCodeResponse): IValidateCode {
    return {
      accessToken: data?.access_token || this.helper,
      refreshToken: data?.refresh_token || this.helper,
      tokenType: data?.token_type || this.helper,
    };
  }
}

export default APIhelper;
