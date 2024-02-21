import { useState } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import { RespData, RespError } from "@/types/axios.types";

export const usePostData = <T extends Object>(
  url: string,
  needAuthorization: boolean = true
) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const authToken = Cookies.get("authToken");

  const postData = (body: { [key: string]: any }) => {
    setIsLoading(true);
    axios
      .post(
        url,
        { ...body },
        {
          headers: {
            Authorization:
              needAuthorization && authToken ? `Bearer ${authToken}` : "",
          },
        }
      )
      .then((resp: RespData<T>) => {
        console.log(resp);
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
        console.log('--> ERROR usePostData', error)
        setIsLoading(false);
        setData(undefined);
        throw new Error("Error:" + error);
      });
  };

  return { postData, data, isLoading };
};
