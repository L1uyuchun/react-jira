import { useEffect, useRef } from "react";
import { Projects } from "@/screens/project-list/list";
import { useQueryClient } from "react-query";

export const isFalsy: (value: unknown) => Boolean = (value) =>
  value === "" || value === undefined || value === null ? true : false;

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key: string) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useDocumentTitle = (
  title: string,
  keepOnmount: boolean = false
) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
    return () => {
      if (!keepOnmount) {
        document.title = oldTitle;
      }
    };
  }, [title, keepOnmount, oldTitle]);
};

export const useMountedRef = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });
  return [isMounted];
};

export const useOptimisticUpdateConfig = (
  queryKey: any,
  setQueryDataCallBack: (old?: any, updateData?: any) => any
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => {},
    onMutate: async (requestParams: any) => {
      const previousData = queryClient.getQueryData(["projectList", queryKey]);
      queryClient.setQueryData(queryKey, (old?: any) => {
        return setQueryDataCallBack(old, requestParams);
      });
      return { previousData };
    },
    onError: (err: Error, requestParams: any, context: any) => {
      queryClient.setQueryData(["projectList", queryKey], context.previousData);
    },
  };
};
export const useEditOptimisticUpdate = (queryKey: any) => {
  return useOptimisticUpdateConfig(
    queryKey,
    (old?: any[], updateData?: any) =>
      old?.map((item) =>
        item.id !== updateData.id
          ? item
          : { ...item, [updateData.field]: updateData.value }
      ) || []
  );
};
export const useDeleteOptimisticUpdate = (queryKey: any) => {
  return useOptimisticUpdateConfig(
    queryKey,
    (old?: any[], updateData?: any) =>
      old?.filter((item) => item.id !== updateData.id) || []
  );
};
