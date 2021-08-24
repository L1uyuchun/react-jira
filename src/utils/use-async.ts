import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "@/utils/index";
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

const useSafeDispath = <T>(dispatch: (...args: T[]) => void) => {
  const [isMounted] = useMountedRef();
  return [
    useCallback(
      (...args: T[]) => (isMounted ? dispatch(...args) : void 0),
      [dispatch, isMounted]
    ),
    isMounted,
  ] as const;
};
export const useAsync = <T>() => {
  // const [httpInfo, dispatch] = useState<asyncpParamsProps<T>>({
  //   ...initState,
  // });
  const [httpInfo, dispatch] = useReducer(
    (
      prevState: asyncpParamsProps<T>,
      action: Partial<asyncpParamsProps<T>>
    ) => ({ ...prevState, ...action }),
    initState
  );
  const [safeDispath, isMounted] = useSafeDispath(dispatch);
  const [loading, setLoading] = useState(false);
  const run = useCallback(
    (promiseFun: Promise<T>) => {
      if (!promiseFun || !promiseFun.then) {
        throw new Error("参数必须为一个Promise");
      }
      safeDispath({
        status: "loading",
      });
      setLoading(true);
      return promiseFun
        .then((data) => {
          safeDispath({
            data,
            status: "success",
          });
          setLoading(false);
          return data;
        })
        .catch((err) => {
          if (isMounted)
            safeDispath({
              error: err,
              status: "error",
            });
          setLoading(false);
          return Promise.reject(err);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    },
    [safeDispath, isMounted]
  );
  // console.log(data, 'httpInfo', httpInfo, isTrue)
  return {
    ...httpInfo,
    loading,
    run,
  };
};
