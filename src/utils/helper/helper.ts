export const setItemInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getItemFromLocalStorage = (key: string) => {
  if (["user_details"].includes(key)) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || "") : {};
  }
  return localStorage.getItem(key);
};

export const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(""),
  );

  return JSON.parse(jsonPayload);
};

export const currentDate = () =>
  new Date().getTime() + (Number(process.env.REACT_APP_ESTIMATED_REFRESH_TOKEN_TO_LOAD) || 0);

export const ssoLoginURL = () => {
  window.location.replace(
    `${process.env.REACT_APP_AUTH_DOMAIN}/realms/${process.env.REACT_APP_AUTH_REALM_NAME}/protocol/openid-connect/auth?response_type=code&client_id=${process.env.REACT_APP_AUTH_CLIENTID}` ||
      "",
  );
};
