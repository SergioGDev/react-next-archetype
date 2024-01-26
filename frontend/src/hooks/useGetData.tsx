import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import { RespData, RespError } from "@/types/axios.types";

export const useGetData = <T extends Object>(
  url: string,
  needAuthorization = true
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    axios
      .get<RespData<T>>(url, {
        headers: {
          Authorization: needAuthorization && authToken ? `Bearer ${authToken}` : "",
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
        throw new Error("Error:" + error);
      });
  }, []);


  return { data, isLoading };
};
