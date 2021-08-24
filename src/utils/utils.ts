import axios from "axios"

export async function client(url, { data, headers: customHeaders, ...customConfig } = {}) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : "",
    url,
    headers: {
      ...customHeaders,
    },
    ...customConfig
  }
  
  return await axios(config).then(res => {
    if (res.status === 200) {
      return res.data;
    }
  });
}

export async function fireFetch(api = "") {
  return await client(api)
}