import React from "react";
import "./App.css";
import { ProjectListScreen } from "./screens/project-list";
// import { TsReactTest } from "./tasks/use-array/index";
import { Login } from "./screens/login";
import { useAuth } from "./context/auth-context";

function App() {
  const { user } = useAuth();
  return (
    <div>
      {user ? <ProjectListScreen></ProjectListScreen> : <Login></Login>}
    </div>
  );
}

export default App;
