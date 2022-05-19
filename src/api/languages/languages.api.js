import { ENDPOINTS } from "../endpoints";
import { api } from "../api";

export const apiLanguagesGetAll = () => {
  return api.get(ENDPOINTS.languages);
};
