import { ChangeEvent } from "react";
import { User } from "./list";
import { Input, Select } from "antd";
const { Option } = Select;
interface SearchPanelProps {
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
  userList: User[];
}

export const SearchPanel = ({
  params,
  setParams,
  userList,
}: SearchPanelProps) => {
  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setParams({
      ...params,
      name: e.target.value,
    });
  };
  const handleChangeSelect = (value: string) => {
    console.log(value);
    setParams({
      ...params,
      personId: value,
    });
  };
  return (
    <div style={{ display: "flex", width: "600px" }}>
      <Input
        allowClear
        placeholder="请输入项目名称"
        maxLength={50}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          changeInputValue(e);
        }}
      />
      <Select
        value={params.personId}
        style={{ width: 120 }}
        onChange={handleChangeSelect}
      >
        <Option value={""}>负责人</Option>
        {userList.map((item) => (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};
