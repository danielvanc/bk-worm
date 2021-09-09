import axios, { AxiosRequestConfig } from "axios";
import { ClientProps } from "interfaces";

export async function client(
  url: string,
  { data, headers: customHeaders, ...customConfig }: ClientProps = {}
) {
  const config: AxiosRequestConfig = {
    method: data ? "POST" : "GET",
    data: data ? JSON.stringify(data) : "",
    url,
    headers: {
      ...customHeaders,
    },
    ...customConfig,
  };

  return await axios(config).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
  });
}

export async function fireFetch(api = "") {
  return await client(api);
}
