import { useState } from "react";
interface asyncpParamsProps<D> {
  data: D | null;
  error: Boolean;
  status: "idle" | "loading" | "success" | "error";
}
const initState: asyncpParamsProps<null> = {
  data: null,
  error: false,
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
      .then((data: T) => {
        setHttpInfo({
          ...httpInfo,
          data,
          status: "success",
        });
      })
      .catch((err) => {
        setHttpInfo({
          ...httpInfo,
          error: true,
          status: "error",
        });
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
