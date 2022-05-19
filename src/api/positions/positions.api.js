import { ENDPOINTS } from "../endpoints";
import { api } from "../api";

export const apiPositionGetAll = () => {
  return api.get(ENDPOINTS.positions);
};
