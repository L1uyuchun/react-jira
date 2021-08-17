// 阵势的开发环境中，如果使用了fireBase这种第三方auth服务的话，本文件不需要自己开发
import { http } from "./http";

export interface User {
  name: string;
  personId: number;
  token: string;
}
class StorageOperate {
  // 成员属性
  userInfo: User;
  localStorageKey = "__auth_provider_key__";
  // 构造函数 - 执行初始化操作
  constructor(user: User) {
    this.userInfo = user;
  }
  getToken() {
    return window.localStorage.getItem(this.localStorageKey);
  }
  setToken(user: User) {
    window.localStorage.setItem(this.localStorageKey, user.token || "");
    return user;
  }
  removeItem() {
    window.localStorage.removeItem(this.localStorageKey);
  }
}
const loginStorage = new StorageOperate({} as User);

export const login = (param: { username: string; password: string }) => {
  return http("login", {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    data: param,
  }).then((data) => {
    console.log(data);
    // setUserList(await response.json());
    return loginStorage.setToken(data);
  });
};
export const isLogin = () => {
  const defaultToken = loginStorage.getToken() || "";
  return http("islogin", { token: defaultToken }).then((res) => {
    return res;
  });
};

export const loginOut = async () => loginStorage.removeItem();
