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
  let url = '';
  for(let key in params) {
    url += `${key}_like=${params[key]}&`
  }
  if(!url) {
    return;
  }
  return api.get(`${ENDPOINTS.employees}?${url}`)
};
