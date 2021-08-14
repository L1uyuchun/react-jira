import { useArray } from "./use-array";
export const TsReactTest = () => {
  const person: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "ma", age: 22 },
  ];

  const { value, clear, removeIndex, add } = useArray(person);

  // @ts-ignore
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clear</button>
      {value.map((person: any, index: number) => (
        <div key={index}>
          <span>{person?.name}</span>
          <span>{person?.age}</span>
        </div>
      ))}
    </div>
  );
};
