import { useAsync } from "@/utils/use-async";
import { useHttp } from "@/utils/http";
import { Projects } from "./list";
import { User } from "./list";
import { cleanObject } from "@/utils";
import { useMount } from "@/utils/custom-hooks";
import { useEffect, useRef, useState } from "react";

export const useRequstUsers = () => {
  const { run, data } = useAsync<User[]>();
  const http = useHttp();

  useMount(() => {
    run(http("users"));
  });
  return {
    data,
  };
};

export const useRequstProjects = (params: {}) => {
  const { run, data, status, loading } = useAsync<Projects[]>();
  const [entry, setEntry] = useState(() => () => {});
  const signalArr = useRef<AbortController[]>([]);
  const http = useHttp();

  useEffect(() => {
    if (signalArr.current.length) {
      signalArr.current.forEach((item) => {
        item.abort();
      });
    }
    let controller = new AbortController();
    // let signal = controller.signal;
    signalArr.current.push(controller);
    const requestPromise = () =>
      http("projects", {
        data: cleanObject(params),
        signal: controller.signal,
      });
    run(requestPromise());
    setEntry(() => () => run(requestPromise()));
    // const {data} = useRequstProjects(params)
    // setList(data || []);
  }, [params, http, run, signalArr]);
  return {
    data,
    status,
    loading,
    entry,
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
