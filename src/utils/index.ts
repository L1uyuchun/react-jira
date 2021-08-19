import { useEffect, useRef } from "react";

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
