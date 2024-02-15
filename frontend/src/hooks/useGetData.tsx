import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import { RespData, RespError } from "@/types/axios.types";
import { useAuthContext } from "@/context/AuthContext";

export const useGetData = <T extends Object>(
  url: string,
  queryParams: { [key: string]: string } = {},
  needAuthorization = true
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuthContext();

  const authToken = Cookies.get("authToken");
  const queryParamsUrl: string = Object.keys(queryParams)
    .map((key: string) => `?${key}=${queryParams[key]}`)
    .join("");

  useEffect(() => {
    axios
      .get<RespData<T>>(`${url}${queryParamsUrl}`, {
        headers: {
          Authorization:
            needAuthorization && authToken ? `Bearer ${authToken}` : "",
        },
      })
      .then((resp: RespData<T>) => {
        if (resp.status !== 200) {
          setIsLoading(false);
          const { msg } = resp.data.data as RespError;
          throw new Error("Error:" + msg);
        }

        if (resp.data) {
          setData(resp.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setData(undefined);
        if (error.response.status === 401) {
          logout();
        }
        // throw new Error("Error:" + error);
      });
  }, []);

  return { data, isLoading };
};
