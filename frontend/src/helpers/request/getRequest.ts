import { RespData } from "@/types/axios.types";
import axios from "axios";
import Cookies from "js-cookie";

export const getRequest = <T extends Object>(
  url: string,
  queryParams: { [key: string]: string } = {},
  needAuthorization = true
) => {
  const authToken = Cookies.get("authToken");
  const queryParamsUrl: string = Object.keys(queryParams)
    .map((key: string) => `?${key}=${queryParams[key]}`)
    .join("");

  return axios.get<T>(`${url}${queryParamsUrl}`, {
    headers: {
      Authorization:
        needAuthorization && authToken ? `Bearer ${authToken}` : "",
    },
  });
};
