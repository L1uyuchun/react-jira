import { ChangeEvent } from "react";
import { User } from "./list";
import { Input, Select } from "antd";
import styled from "@emotion/styled";
import { SelectBiz } from "@/components/select-biz";
const { Option } = Select;
interface SearchPanelProps {
  params: {
    name?: string;
    personId?: number;
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
  const handleChangeSelect = (value: number | undefined) => {
    setParams({
      ...params,
      personId: value,
    });
  };
  // @ts-ignore
  // @ts-ignore
  return (
    <SearchWraper>
      <Title>项目列表</Title>
      <SearchBox>
        <InputCom
          value={params.name}
          allowClear
          placeholder="请输入项目名称"
          maxLength={50}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            changeInputValue(e);
          }}
        />
        <SelectBiz
          value={params.personId}
          style={{ width: 120 }}
          onChange={handleChangeSelect}
          options={userList}
          optionProps={{
            valueKey: "id",
            textKey: "name",
            key: "id",
          }}
          defaultOptionText={"负责人"}
        />
        {/*<Select*/}
        {/*  */}
        {/*>*/}
        {/*  {userList ? <Option value={""}>负责人</Option> : ""}*/}
        {/*  {userList.map((item) => (*/}
        {/*    <Option value={item?.id.toString()} key={item.id}>*/}
        {/*      {item.name}*/}
        {/*    </Option>*/}
        {/*  ))}*/}
        {/*</Select>*/}
      </SearchBox>
    </SearchWraper>
  );
};

const SearchWraper = styled.div`
  padding: 0 2rem;
  margin: 2rem 0;
`;
const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;
const SearchBox = styled.div`
  display: flex;
`;
const InputCom = styled(Input)`
  width: 20rem;
  margin-right: 1rem;
`;
