import React from "react";
import "antd/dist/antd.less";
// import { ProjectList } from "./screens/project-list";
// import { TsReactTest } from "./tasks/use-array/index";
import { Login } from "./screens/login";
import { useAuth } from "./context/auth-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import {NotFound} from "@/screens/not-found";
// import {Custom} from "@/screens/custom";
// import {ProjectDetail} from "@/screens/project-detail";
import { Layout } from "@/screens/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const { user } = useAuth();
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <div id="content">{user ? <ViewRoutes /> : <Login />}</div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

const ViewRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/*"} element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
