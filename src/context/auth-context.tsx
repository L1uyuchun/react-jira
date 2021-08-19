import * as AuthCheck from "../utils/auth-provider";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useAsync } from "@/utils/use-async";
import { Spin } from "antd";
import { FullPageWraper } from "@/components/Loading";

interface loginParams {
  username: string;
  password: string;
}
interface contextType {
  user: AuthCheck.User | null;
  login: (params: loginParams) => Promise<void>;
  loginOut: () => Promise<void>;
}
const AuthContext = React.createContext<contextType | null>(null);
AuthContext.displayName = "authContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthCheck.User | null>(null);
  const { loading, run } = useAsync<AuthCheck.User>();
  const login = (params: loginParams) =>
    AuthCheck.login(params).then((user) => {
      setUser(user);
    });
  const loginOut = () => AuthCheck.loginOut().then(() => setUser(null));

  useEffect(() => {
    // const defaultToken = loginStorage.getToken() || "";
    try {
      run(AuthCheck.isLogin())
        .then((user) => {
          setUser(user);
        })
        .catch();
      // console.log(run(http("islogin")))
      // http("islogin", ).then(setUser).catch(err => {
      //    console.log(err)
      //  })
    } catch (err) {}
    // eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, loginOut }}>
      {loading ? (
        <FullPageWraper>
          <Spin size="large" />
        </FullPageWraper>
      ) : (
        ""
      )}
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
