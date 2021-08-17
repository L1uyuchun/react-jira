import React from "react";
import "antd/dist/antd.less";
import { ProjectListScreen } from "./screens/project-list";
// import { TsReactTest } from "./tasks/use-array/index";
import { Login } from "./screens/login";
import { useAuth } from "./context/auth-context";

function App() {
  const { user } = useAuth();
  return <div id="content">{user ? <ProjectListScreen /> : <Login />}</div>;
}

export default App;
