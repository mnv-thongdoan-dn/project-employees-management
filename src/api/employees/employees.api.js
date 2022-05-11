import { ENDPOINTS } from "../endpoints";
import { api } from "../api";

export const apiEmployeesGetList = () => {
  return api.get(ENDPOINTS.employees);
};
