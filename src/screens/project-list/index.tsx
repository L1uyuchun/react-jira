/** @jsxImportSource @emotion/react */
// import { css, jsx } from '@emotion/react'
import { SearchPanel } from "./search-panel";
// import { useState } from "react";
import { ListTable } from "./list";
import styled from "@emotion/styled";
import {
  useQueryProjectUrl,
  useRequstProjects,
  useRequstUsers,
} from "@/screens/project-list/project-list-hooks";
import { useDocumentTitle } from "@/utils";
// import { useUrlQueryParams } from "@/utils/use-url-params";
import { useMemo } from "react";
import { AddProject } from "@/screens/project-list/add-project";
// import { Button } from "antd";
// type searchProps = ('name' | "personId")[]

export const ProjectList = () => {
  useDocumentTitle("项目列表", false);
  // const [, setParams] = useState({
  //   name: "",
  //   personId: "",
  // });

  const { params, setUrlParam } = useQueryProjectUrl();

  const { userList } = useRequstUsers(true);
  // const list = undefined
  //   const loading = false
  //   const entry = () => {}
  //   console.log(_params)
  const { data: list, loading } = useRequstProjects(params);
  // const { drawerVisible } = useCreateProjectParam()
  //   console.log(drawerVisible);

  return (
    <ProjectPage>
      <SearchPanel
        params={params}
        setParams={setUrlParam}
        userList={userList || []}
      />
      <ListTable
        list={list || []}
        userList={userList || []}
        loading={loading}
      />
      <AddProject></AddProject>
    </ProjectPage>
  );
};
const ProjectPage = styled.div`
  width: 100%;
  height: 100%;
`;
