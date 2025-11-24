import axiosClient from "./axiosClient";

export const getRequestToken = () => {
  return axiosClient.get("/authentication/token/new");
};

export const getSessionId = (requestToken: string) => {
  return axiosClient.post("/authentication/session/new", { request_token: requestToken });
};
