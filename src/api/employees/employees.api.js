import { ENDPOINTS } from "../endpoints";
import { api } from "../api";

export const apiEmployeesGetList = () => {
  return api.get(ENDPOINTS.employees);
};

export const apiEmployeeGetItem = (id) => {
  return api.get(`${ENDPOINTS.employees}/${id}`);
};

export const apiEmployeesCreate = (data) => {
  return api.post(ENDPOINTS.employees, data);
};

export const apiEmployeesDelete = (id) => {
  return api.delete(`${ENDPOINTS.employees}/${id}`);
};

export const apiEmployeesUpdate = (datas) => {
  return api.patch(`${ENDPOINTS.employees}/${datas.idEmployee}`, datas.dataEmployee);
};

export const apiEmployeesSearch = (params) => {
  return api.get(`${ENDPOINTS.employees}?name_like=${params.name || ''}&position_like=${params.position || ''}&language_like=${params.language || ''}&frameWorks_like=${params.frameWorks || ''}`);
};
