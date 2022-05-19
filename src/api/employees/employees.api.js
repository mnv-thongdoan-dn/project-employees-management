import { ENDPOINTS } from "../endpoints";
import { api } from "../api";

export const apiEmployeesGetList = () => {
  return api.get(ENDPOINTS.employees);
};

export const apiEmployeesCreate = (data) => {
  return api.post(ENDPOINTS.employees, data);
};
