import { useAsync } from "@/utils/use-async";
import { http, useHttp } from "@/utils/http";
import { Projects } from "./list";
import { User } from "./list";
import { cleanObject } from "@/utils";
import { useMount } from "@/utils/custom-hooks";
import { useEffect } from "react";

export const useRequstUsers = () => {
  const { run, data } = useAsync<User[]>();
  useMount(() => {
    run(http("users"));
    // const { data: userList } = useRequstUsers()
    // setUserList(userList || [])
  });
  return {
    data,
  };
};

export const useRequstProjects = (params: {}) => {
  const { run, data, status, loading } = useAsync<Projects[]>();
  let signalArr: AbortController[] = [];
  useEffect(() => {
    if (signalArr.length) {
      signalArr.forEach((item) => {
        item.abort();
      });
    }
    let controller = new AbortController();
    // let signal = controller.signal;
    signalArr.push(controller);
    run(http("projects", { data: cleanObject(params) }));
    // const {data} = useRequstProjects(params)
    // setList(data || []);
    // eslint-disable-next-line
  }, [params]);
  return {
    data,
    status,
    loading,
  };
};

export const useEditProject = () => {
  const http = useHttp();
  const { data, status, loading, run } = useAsync();
  const projectEdit = <K>(params: { id: number; field: string; value: K }) => {
    return run(
      http(`project/edit`, {
        data: params,
        method: "POST",
      })
    );
  };
  return { projectEdit, data, loading, status };
};
