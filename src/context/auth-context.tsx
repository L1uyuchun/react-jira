import * as AuthCheck from "../utils/auth-provider";
import React, { ReactNode, useContext, useEffect, useState } from "react";

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
  const login = (params: loginParams) => AuthCheck.login(params).then(setUser);
  const loginOut = () => AuthCheck.loginOut().then(() => setUser(null));

  useEffect(() => {
    AuthCheck.isLogin().then(setUser);
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, loginOut }}>
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
