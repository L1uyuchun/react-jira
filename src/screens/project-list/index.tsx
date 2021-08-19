/** @jsxImportSource @emotion/react */
// import { css, jsx } from '@emotion/react'
import { SearchPanel } from "./search-panel";
import { useState } from "react";
import { ListTable, User } from "./list";
import { Row } from "@/components/Row";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { useAuth } from "@/context/auth-context";
import { ReactComponent as LogoSvg } from "@/assets/images/logo.svg";
import {
  useRequstProjects,
  useRequstUsers,
} from "@/screens/project-list/api-custom-hooks";
import { useMount } from "@/utils/custom-hooks";
import { http } from "@/utils/http";
import { useAsync } from "@/utils/use-async";
import { useDocumentTitle } from "@/utils";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const { user } = useAuth();
  const { data: userList } = useRequstUsers();
  const { data: list, loading } = useRequstProjects(params);
  const { loginOut } = useAuth();
  const handleLoginOut = () => {
    loginOut();
  };

  return (
    <ProjectPage>
      <HeaderRow justifyContent={"space-between"} alignItems={"center"}>
        <Row
          justifyContent={"space-between"}
          alignItems={"center"}
          marginRight={10}
        >
          <Logo>
            <LogoSvg width={"3rem"} height={"3rem"}></LogoSvg>
            <span>Jira SoftWare</span>
          </Logo>
          <h1 css={{ cursor: "pointer" }}>项目</h1>
          <h2 css={{ cursor: "pointer" }}>用户</h2>
        </Row>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <span onClick={handleLoginOut}>退出账号</span>
              </Menu.Item>
            </Menu>
          }
          placement="bottomCenter"
        >
          <Button type="link" css={{ fontWeight: "bold", fontSize: "16px" }}>
            {user ? `Hi ${user.name}` : "游客，请登录"}
          </Button>
        </Dropdown>
      </HeaderRow>
      <SearchPanel
        params={params}
        setParams={setParams}
        userList={userList || []}
      />
      <ListTable
        list={list || []}
        userList={userList || []}
        loading={loading}
      />
    </ProjectPage>
  );
};
const ProjectPage = styled.div`
  width: 100%;
  height: 100%;
`;
const HeaderRow = styled(Row)`
  height: 60px;
  box-shadow: 0 0px 0px 2px rgba(160, 158, 158, 0.1);
  padding: 0px 20px;
  font-size: 1.8rem;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
