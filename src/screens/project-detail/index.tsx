import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Task } from "@/screens/project-detail/task";
import { BackBoard } from "@/screens/project-detail/backBoard";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MenuInfo } from "rc-menu/lib/interface";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { useProjectInfo } from "@/screens/project-detail/detail-custom-hooks";

const { SubMenu } = Menu;
export const projectDetailContext = React.createContext<
  { name: string; id: number }[] | null
>(null);

export const ProjectDetail = () => {
  const [current, setCurrent] = useState("board");
  const navigate = useNavigate();
  const { project } = useProjectInfo();

  const handleClick = (e: MenuInfo) => {
    setCurrent(e.key);
    navigate(e.key, { replace: true });
  };
  return (
    <projectDetailContext.Provider value={project}>
      <NavWraperr>
        {/*<Link to="board">看板</Link>*/}
        {/*<Link to="task">任务组</Link>*/}
        <Menu
          style={{ width: 256 }}
          onClick={handleClick}
          selectedKeys={[current]}
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="light"
        >
          <Menu.Item key="board">看板</Menu.Item>
          <Menu.Item key="task">任务组</Menu.Item>
        </Menu>
        <Routes>
          <Route path={"task"} element={<Task />}></Route>
          <Route path={"board"} element={<BackBoard />}></Route>
          <Navigate to={"board"} replace={true}></Navigate>
        </Routes>
      </NavWraperr>
    </projectDetailContext.Provider>
  );
};

const NavWraperr = styled.div`
  display: flex;
  height: calc(100% - 62px);
`;
