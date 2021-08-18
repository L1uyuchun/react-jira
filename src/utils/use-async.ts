import { useState } from "react";
interface asyncpParamsProps<D> {
  data: D | null;
  error: { msg?: string };
  status: "idle" | "loading" | "success" | "error";
}
const initState: asyncpParamsProps<null> = {
  data: null,
  error: {},
  status: "idle",
};
export const useAsync = <T>() => {
  const [httpInfo, setHttpInfo] = useState<asyncpParamsProps<T>>({
    ...initState,
  });
  const [loading, setLoading] = useState(false);
  const run = (promiseFun: Promise<T>) => {
    if (!promiseFun || !promiseFun.then) {
      throw new Error("参数必须为一个Promise");
    }
    setHttpInfo({
      ...httpInfo,
      status: "loading",
    });
    setLoading(true);
    return promiseFun
      .then((data) => {
        setHttpInfo({
          ...httpInfo,
          data,
          status: "success",
        });
        return data;
      })
      .catch((err) => {
        setHttpInfo({
          ...httpInfo,
          error: err,
          status: "error",
        });
        return Promise.reject(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // console.log(data, 'httpInfo', httpInfo, isTrue)
  return {
    ...httpInfo,
    loading,
    run,
  };
};
