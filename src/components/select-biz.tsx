import { User } from "@/screens/project-list/list";
import { Select } from "antd";
const { Option } = Select;

type SelectProps = React.ComponentProps<typeof Select>;
type optionPropsKey = "valueKey" | "textKey";

interface bizSelectProps
  extends Omit<SelectProps, "onChange" | "options" | "defaultValue"> {
  value: number | string | undefined | number[] | string[];
  options: any[];
  optionProps: {
    valueKey: string;
    textKey: string;
    key: string;
  };
  defaultOptionText: string;
  onChange: (value: number | undefined) => void;
}
export const SelectBiz = (props: bizSelectProps) => {
  const {
    value,
    options,
    defaultOptionText,
    optionProps,
    onChange,
    ...restProps
  } = props;
  const { valueKey, textKey, key, ...restOptionProps } = optionProps;
  const handleChange = (value: number) => {
    onChange(toNumber(value) || undefined);
  };
  console.log(optionProps, options);

  return (
    <Select value={toNumber(value)} onChange={handleChange} {...restProps}>
      {defaultOptionText ? <Option value={0}>{defaultOptionText}</Option> : ""}
      {(options || []).map((item) => (
        <Option
          // @ts-ignore
          key={item[key]}
          // @ts-ignore
          value={item[valueKey]}
          {...restOptionProps}
        >
          {/*// @ts-ignore*/}
          {item[textKey]}
        </Option>
      ))}
    </Select>
  );
};
const toNumber = (x: unknown) => (isNaN(Number(x)) ? 0 : Number(x));
