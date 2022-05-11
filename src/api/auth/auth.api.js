import { ENDPOINTS } from "../endpoints";
import { api } from "../api";

export const apiAuthLogin = (data) => {
  return api.post(ENDPOINTS.login, data);
};

