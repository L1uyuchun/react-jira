import { ChangeEvent } from "react";
import { User } from "./list";
import { Button, Input } from "antd";
import styled from "@emotion/styled";
import { SelectBiz } from "@/components/select-biz";
import { Row } from "@/components/Row";
import { useDispatch } from "react-redux";
import { changeDrawerVisible } from "./project-store-slice";
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
  const dispatch = useDispatch();
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
  return (
    <SearchWraper>
      <Row justifyContent={"space-between"} alignItems={"center"}>
        <Title>项目列表</Title>
        <Button onClick={() => dispatch(changeDrawerVisible(true))}>
          新增项目
        </Button>
      </Row>

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
