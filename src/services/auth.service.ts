import API from "../api/axios";
import { IValidateCodeResponse, IValidateCode } from "../types/response.type";
import APIhelper from "../utils/helper/response.helper";

export class AuthService extends APIhelper {
  path = "";

  constructor() {
    super();
    this.path = "/auth";
  }

  get commonPath() {
    return this.path;
  }

  async validateCode(type: string, code: string): Promise<IValidateCode> {
    try {
      const params = {
        [`${type}`]: code,
      };
      const response = await API.get<IValidateCodeResponse>(
        `${this.commonPath}/validate${type === "refresh_token" ? "/refresh" : ""}`,
        { params },
      );
      if (response.data) {
        return this.userDTO(response.data);
      }
      return {} as IValidateCode;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
