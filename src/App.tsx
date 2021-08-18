import React from "react";
import "antd/dist/antd.less";
import { ProjectListScreen } from "./screens/project-list";
// import { TsReactTest } from "./tasks/use-array/index";
import { Login } from "./screens/login";
import { useAuth } from "./context/auth-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function App() {
  const { user } = useAuth();
  return (
    <ErrorBoundary>
      <div id="content">{user ? <ProjectListScreen /> : <Login />}</div>
    </ErrorBoundary>
  );
}

export default App;
