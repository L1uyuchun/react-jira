/** @jsxImportSource @emotion/react */
// import { css, jsx } from '@emotion/react'
import { cleanObject } from "../../utils";
import { useMount } from "../../utils/custom-hooks";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import { ListTable } from "./list";
import { useHttp } from "../../utils/http";
import { Row } from "@/components/Row";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { useAuth } from "@/context/auth-context";
import { ReactComponent as LogoSvg } from "@/assets/images/logo.svg";

let signalArr: AbortController[] = [];
export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  // const debounceParams = useDebounce(params, 500);
  const [list, setList] = useState([]);
  const [userList, setUserList] = useState([]);
  const http = useHttp();
  const { user } = useAuth();

  useMount(() => {
    http("users").then((data) => {
      setUserList(data);
    });
  });

  useEffect(() => {
    if (signalArr.length) {
      signalArr.forEach((item) => {
        item.abort();
      });
    }
    let controller = new AbortController();
    // let signal = controller.signal;
    signalArr.push(controller);
    http("projects", { data: cleanObject(params), signal: controller.signal })
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [params]);
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
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.antgroup.com"
                >
                  退出账号
                </a>
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
      <SearchPanel params={params} setParams={setParams} userList={userList} />
      <ListTable list={list} userList={userList} />
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
