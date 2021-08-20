import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "@/utils/index";

export const useUrlQueryParams = <T extends string>(keys: T[]) => {
  const [searchParams, setSearchPrams] = useSearchParams();
  // console.log(searchParams.getAll())
  const getSearchParams = useMemo(() => {
    return keys.reduce((pre: { [key in T]: string }, currentKey: T) => {
      return { ...pre, [currentKey]: searchParams.get(currentKey) || "" };
    }, {} as { [key in T]: string });
  }, [searchParams]);
  const resetSearchPrams = (params: Partial<{ [key in T]: unknown }>) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as unknown as URLSearchParams;
    return setSearchPrams(o);
  };
  return [getSearchParams, resetSearchPrams] as const;
};
