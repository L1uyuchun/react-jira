import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useHttp } from "@/utils/http";

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
