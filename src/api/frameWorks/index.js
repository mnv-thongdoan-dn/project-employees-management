import { ENDPOINTS } from "../endpoints";
import { api } from "../api";

export const apiFrameWorkGetAll = (id) => {
  return api.get(`${ENDPOINTS.languages}/${id}/${ENDPOINTS.frameworks}`);
};
