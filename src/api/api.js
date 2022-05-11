import axios from "axios";
import moment from "moment";

import { getTokens } from "../helpers/auth/auth.helpers";

/**
 * All the endpoint that do not require an access token
 */
// const anonymousEndpoints = [AuthEndpointsEnum.LOGIN.toString()];

/**
 * "Wrapper" around getTokens
 * can be changed to have refresh functionality if api supports it
 */
export const getRefreshedToken = () => {
  const { accessToken, expiresAt } = getTokens();

  const isTokenExpired = moment().isSameOrAfter(expiresAt);

  return { accessToken, isTokenExpired };
};

/**
 * Adds authorization headers to API calls
 * @param {AxiosRequestConfig} request
 */
const authInterceptor = async (request) => {
  // const isAnonymous = anonymousEndpoints.some(endpoint =>
  //   request.url?.startsWith(endpoint)
  // );

  const { accessToken } = getRefreshedToken();

  if (accessToken) {
    request.headers.Authorization = `${accessToken}`;
    return request;
  }

  if (!accessToken) {
    // TODO: handle when UNAUTHORIZED;
    // return Promise.reject(ApiStatusCodes.UNAUTHORIZED);
    return request;
  }

  return request;
};

/** Setup an API instance */
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(authInterceptor);
