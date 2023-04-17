import axios from "axios";
import { toast } from "react-toastify";
import { ssoLoginURL } from "../utils/helper/helper";

export const baseURL = process.env.REACT_APP_API_URL;

// interface CommonHeaderProperties extends HeadersDefaults {
//   Authorization: string;
// }

const client = axios.create({ baseURL });

client.defaults.headers = {
  Authorization: "Bearer",
} as any;
// Add a request interceptor
client.interceptors.request.use(
  (config) => {
    const newConfig = config;
    if (newConfig && newConfig.headers && newConfig.headers.Authorization) {
      newConfig.headers.Authorization = `Bearer ${window.localStorage.getItem("access_token") || ""}`;
    }
    if (
      newConfig?.url?.includes("/auth/validate") &&
      newConfig?.params &&
      Object.keys(newConfig?.params).includes("code") &&
      newConfig?.headers?.Authorization
    ) {
      delete newConfig?.headers?.Authorization;
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
client.interceptors.response.use(
  (response) => {
    if (response?.data instanceof Blob) {
      return response;
    }
    return response || {};
  },
  (error) => {
    if (error?.response) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        ssoLoginURL();
        return Promise.reject(error);
      }
      if (error?.response?.code === "ERR_NETWORK") {
        toast.error("Please check your connectivity. Unable to connect to server", { theme: "colored" });
      }
    } else {
      toast.error("Please check your connectivity. Unable to connect to server", { theme: "colored" });
    }
    return Promise.reject(error);
  },
);

export default client;
