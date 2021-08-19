/** @jsxImportSource @emotion/react */
// import { css, jsx } from '@emotion/react'
import { SearchPanel } from "./search-panel";
import { useState } from "react";
import { ListTable } from "./list";
import styled from "@emotion/styled";
import {
  useRequstProjects,
  useRequstUsers,
} from "@/screens/project-list/api-custom-hooks";
import { useDocumentTitle } from "@/utils";

export const ProjectList = () => {
  useDocumentTitle("项目列表", false);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const { data: userList } = useRequstUsers();
  const { data: list, loading } = useRequstProjects(params);
  return (
    <ProjectPage>
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
