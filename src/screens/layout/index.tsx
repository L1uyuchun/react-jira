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
// const { SubMenu } = Menu;

export const Layout = () => {
  return (
    <div>
      <HeaderCom />
      <Routes>
        <Route path={"projectlist"} element={<ProjectList />}></Route>
        <Route path={"project/:id/*"} element={<ProjectDetail />}></Route>
        <Route path={"custom"} element={<Custom />}></Route>

        <Navigate to={"/projectlist"}></Navigate>
        <Route path={"*"} element={<NotFound />}></Route>
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
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item>
        <span>新增项目</span>
      </Menu.Item>
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
  box-shadow: 0 0px 0px 2px rgba(160, 158, 158, 0.1);
  padding: 0px 20px;
  font-size: 1.8rem;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
