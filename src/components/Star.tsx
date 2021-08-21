/**
 *
 * @params checked:true选中： false: 未选中
 * @params onChange: 可选，修改之后的事件
 */
import { Rate } from "antd";
interface starProps extends React.ComponentProps<typeof Rate> {
  checked: Boolean;
  onChange?: (value: number) => void | undefined;
}
export const Star = ({ checked, onChange, ...restProps }: starProps) => {
  console.log(checked, onChange);
  return (
    <Rate
      count={1}
      value={Number(checked)}
      onChange={(value) => (onChange ? onChange(value) : undefined)}
      {...restProps}
    />
  );
};
