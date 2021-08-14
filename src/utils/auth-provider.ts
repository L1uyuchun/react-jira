// 阵势的开发环境中，如果使用了fireBase这种第三方auth服务的话，本文件不需要自己开发
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
  return fetch(`${process.env.REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(param),
  }).then(async (response) => {
    if (response.ok) {
      // setUserList(await response.json());
      return loginStorage.setToken((await response.json()).data);
    } else {
      return Promise.reject(param);
    }
  });
};

export const loginOut = async () => loginStorage.removeItem();
