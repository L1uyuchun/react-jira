import React, { FormEvent } from "react";
import { useAuth } from "../../context/auth-context";
export const Login = () => {
  const { login } = useAuth();

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    requestLogin({
      username,
      password,
    });
  };
  const requestLogin = (params: {
    username: string;
    password: string;
  }): void => {
    // console.log(login(params))
    login(params);
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"passwprd"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
