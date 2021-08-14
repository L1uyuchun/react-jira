import { useState } from "react";

export const useArray = <T>(person: T[]) => {
  // const { value, clear, removeIndex, add } = useArray(person)
  const [value, setValue] = useState(person);
  const clear = (): void => {
    setValue([]);
  };
  const removeIndex = (index: number): void => {
    let _value = [...value];
    _value.splice(index, 1);
    setValue(_value);
  };
  const add = (item: T): void => {
    setValue([...value, item]);
  };
  return {
    value,
    clear,
    removeIndex,
    add,
  };
};
