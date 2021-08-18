import { useAuth } from "../context/auth-context";
import { message } from "antd";
const queryString = require("querystring");

const baseUrl = process.env.REACT_APP_API_URL;
interface config extends RequestInit {
  data?: object;
  token?: string;
}

export let controller = new AbortController();
let signal = controller.signal;
signal.addEventListener("abort", () => console.log("abort!"));

export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: config = {}
) => {
  let apiUrl = `${baseUrl}/${url}`;

  const fetchConfig = {
    method: "GET", //默认请求方法
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    // signal: controller.signal, //取消请求
    ...customConfig,
  };

  if (fetchConfig.method.toUpperCase() === "GET" && data) {
    apiUrl += `?${queryString.stringify(data)}`;
  } else if (data) {
    fetchConfig.body = JSON.stringify(data || {});
  }

  return window.fetch(apiUrl, fetchConfig).then(async (response) => {
    const res = await response.json();
    if (res.code === 401) {
      // await loginOut()
      // window.location.reload()
      return Promise.reject("请重新登录");
    }
    if (response.ok && res.code === 200) {
      return res.data;
    } else {
      if (res.data?.msg) {
        message.error(res.data.msg);
      }
      return Promise.reject(res.data);
    }
  });
};
export const useHttp = () => {
  const { user } = useAuth();
  //todo 讲解ts操作符
  return (...[url, config]: Parameters<typeof http>) =>
    http(url, { ...config, token: user?.token });
};
