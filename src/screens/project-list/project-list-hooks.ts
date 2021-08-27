// import { useAsync } from "@/utils/use-async";
import { useHttp } from "@/utils/http";
// import { Projects } from "./list";
import { Projects, User } from "./list";
import {
  cleanObject,
  useDeleteOptimisticUpdate,
  useEditOptimisticUpdate,
} from "@/utils";
// import { useMount } from "@/utils/custom-hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useUrlQueryParams } from "@/utils/use-url-params";
import { useMutation, useQuery, useQueryClient } from "react-query";
import dayjs from "dayjs";

export const useRequstUsers = (fetchData: boolean) => {
  // const { run, data } = useAsync<User[]>();
  const http = useHttp();
  const { data: userList } = useQuery<User[]>("users", () => http("users"), {
    enabled: fetchData,
  });
  // let result: User[] | undefined = []
  return {
    userList,
  };
};

export const useRequstProjects = (params: {}) => {
  // const [entry, setEntry] = useState(() => () => {});
  // const signalArr = useRef<AbortController[]>([]);
  const http = useHttp();

  // if(signalArr.current.length) {
  //   signalArr.current.forEach((item, index) => {
  //     // if(item.signal.aborted) {
  //     //   signalArr.current.splice(index, 1)
  //     //   return
  //     // }
  //     item.abort();
  //   });
  // }
  // let controller = new AbortController();
  // // let signal = controller.signal;
  // signalArr.current.push(controller);
  const { data, status, isLoading, isSuccess } = useQuery(
    ["projectList", params],
    () =>
      http("projects", {
        data: cleanObject(params),
      })
  );
  // if(isSuccess) {
  //   signalArr.current.pop()
  // }

  // useEffect(() => {
  //   i
  //   const requestPromise = () =>
  //     http("projects", {
  //       data: cleanObject(params),
  //       signal: controller.signal,
  //     });
  //   run(requestPromise());
  //   setEntry(() => () => run(requestPromise()));
  //   // const {data} = useRequstProjects(params)
  //   // setList(data || []);
  // }, [params, http, run, signalArr]);
  return {
    data,
    status,
    loading: isLoading,
  };
};

export const useEditProject = () => {
  const http = useHttp();
  return (params: Partial<Projects>) =>
    http(`project/edit`, {
      data: params,
      method: "POST",
    });
};
export const useEditStar = () => {
  const editPromiseFun = useEditProject();
  const queryClient = useQueryClient();
  const { params: queryKey } = useQueryProjectUrl();
  const config = useEditOptimisticUpdate(["projectList", queryKey]);
  const { mutate } = useMutation(
    (params: { id: number; field: string; value: unknown }) =>
      editPromiseFun(params),
    config
  );
  return { mutate };
};

const useEditProjectApi = () => {
  const http = useHttp();
  return useCallback(
    (id) =>
      http(`project/getInfoById`, {
        data: { id: Number(id) },
        method: "POST",
      }),
    []
  );
};

export const useCreateProjectParam = () => {
  const [createUrlParams, setcreateUrlParams] = useUrlQueryParams([
    "createProject",
  ]);
  const [editUrlParams, setEditUrlParams] = useUrlQueryParams(["editProject"]);
  const createDrawerVisible = useCallback((isVisible: Boolean) => {
    setcreateUrlParams({ createProject: isVisible ? true : undefined });
  }, []);

  const editProjectFun = useEditProjectApi();
  // useEffect(()=> {
  //
  // }, [id])
  const { data: editProjectInitData, isLoading } = useQuery(
    ["projectInfo", editUrlParams],
    () => {
      if (!editUrlParams.editProject) {
        return;
      }
      return editProjectFun(editUrlParams.editProject);
    }
  );

  return {
    drawerVisible:
      createUrlParams.createProject === "true" || !!editUrlParams.editProject,
    isEditProject: !!editUrlParams.editProject,
    createDrawerVisible,
    editProjectInitData: editProjectInitData?.[0],
    isLoading,
    setEditUrlParams,
  };
};

export const useQueryProjectUrl = () => {
  const [urlparam, setUrlParam] = useUrlQueryParams(["name", "personId"]);
  return {
    params: { ...urlparam, personId: Number(urlparam.personId) || undefined },
    setUrlParam,
  };
};

export const useSaveAddProjects = () => {
  const createTime = dayjs().valueOf();
  const http = useHttp();
  return useCallback(
    (params: Partial<Projects>) =>
      http("project/saveProject", {
        data: { ...params, createTime },
        method: "POST",
      }),
    []
  );
};

export const useDeleteProjects = () => {
  const http = useHttp();
  const { params: queryKey } = useQueryProjectUrl();
  const config = useDeleteOptimisticUpdate(["projectList", queryKey]);
  const { mutate: deleteMutate } = useMutation((params: { id: number }) => {
    return http("project/delete", {
      method: "POST",
      data: params,
    });
  }, config);
  return { deleteMutate };
};
