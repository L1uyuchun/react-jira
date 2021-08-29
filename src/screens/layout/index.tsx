/** @jsxImportSource @emotion/react */
// import { css, jsx } from '@emotion/react'

import { useAuth } from "@/context/auth-context";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Row } from "@/components/Row";
import { ReactComponent as LogoSvg } from "@/assets/images/logo.svg";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import React from "react";
import { ProjectList } from "@/screens/project-list";
import { ProjectDetail } from "@/screens/project-detail";
import { Custom } from "@/screens/custom";
import { NotFound } from "@/screens/not-found";
// import {useCreateProjectParam} from "@/screens/project-list/project-list-hooks";
// const { SubMenu } = Menu;

export const Layout = () => {
  return (
    <div style={{ height: "100%" }}>
      <HeaderCom />
      <Routes>
        <Route path={"projectlist"} element={<ProjectList />} />
        <Route path={"project/:id/*"} element={<ProjectDetail />} />
        <Route path={"custom"} element={<Custom />} />

        <Navigate to={"/projectlist"} replace={true} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
};
const HeaderCom = () => {
  const { user } = useAuth();
  const { loginOut } = useAuth();
  const handleLoginOut = () => {
    loginOut();
  };
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  return (
    <HeaderRow justifyContent={"space-between"} alignItems={"center"}>
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
        marginRight={10}
      >
        <Logo onClick={goToHome}>
          <LogoSvg width={"3rem"} height={"3rem"} />
          <span>Jira SoftWare</span>
        </Logo>
        <ProjectMent />
        <h2 css={{ cursor: "pointer" }}>用户</h2>
      </Row>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key={"1"}>
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
  );
};
const ProjectMent = () => {
  const menu = (
    <Menu>
      <Menu.ItemGroup title="收藏项目">
        <Menu.Item key={"1"}>1st menu item</Menu.Item>
        <Menu.Item key={"2"}>2nd menu item</Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <h1 css={{ cursor: "pointer" }}>项目</h1>
    </Dropdown>
  );
};
const HeaderRow = styled(Row)`
  height: 60px;
  border-bottom: 2px solid #eee;
  padding: 0px 20px;
  font-size: 1.8rem;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
