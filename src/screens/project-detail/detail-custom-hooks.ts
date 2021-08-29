import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useHttp } from "@/utils/http";
import { Tasks } from "@/screens/project-detail/type";
import { useAddOptimicUpdate } from "@/utils";
import { useUrlQueryParams } from "@/utils/use-url-params";
import { useRef } from "react";
import { useDebounce } from "@/utils/custom-hooks";

export const useProjectInfo = () => {
  const location = useLocation();
  const http = useHttp();

  const params = useParams();
  const { data } = useQuery(
    "getProjectInfo",
    () =>
      http("getProjectInfo", {
        data: { id: Number(params.id) },
        method: "POST",
      }),
    { enabled: !location.state, retry: 0 }
  );
  return { project: location.state ? [location.state] : data || [] };
};

export const useQueryProjectProcess = (
  params: Partial<Tasks>,
  projectId: number | undefined
) => {
  const http = useHttp();
  return useQuery(["projectProcess", params, projectId], () => {
    if (!projectId) {
      return;
    }
    return http("projectProcess", {
      data: { ...params, projectId },
      method: "POST",
    });
  });
};

export const useDetailSearchParams = () => {
  const [getSearchParams, resetSearchPrams] = useUrlQueryParams(
    useRef(["taskName", "taskGroup", "processorId", "labelName"]).current
  );
  const debounceParams = useDebounce(getSearchParams, 500);
  const _searchParam = {
    ...debounceParams,
    processorId: Number(getSearchParams.processorId),
  };
  return {
    searchParam: _searchParam,
    resetSearchPrams,
  };
};

export const useGetType = (id: number) => {
  const http = useHttp();

  return useQuery(["getType", id], () =>
    http("getTypeById", {
      method: "POST",
      data: { id },
    })
  );
};

export const useCreateBoard = (projectId: number | undefined) => {
  const { searchParam } = useDetailSearchParams();
  const http = useHttp();
  return useMutation(
    "createBoard",
    (params) =>
      http("/createBoard", {
        method: "POST",
        data: params,
      }),
    useAddOptimicUpdate(["projectProcess", searchParam, projectId])
  );
};
export const useAddSubTaskReq = () => {
  const http = useHttp();
  return useMutation("addSubTaskReq", (params: any) =>
    http("/addSubTask", {
      data: params,
      method: "POST",
    })
  );
};
