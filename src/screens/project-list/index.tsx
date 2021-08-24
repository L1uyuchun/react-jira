/** @jsxImportSource @emotion/react */
// import { css, jsx } from '@emotion/react'
import { SearchPanel } from "./search-panel";
// import { useState } from "react";
import { ListTable } from "./list";
import styled from "@emotion/styled";
import {
  useRequstProjects,
  useRequstUsers,
} from "@/screens/project-list/api-custom-hooks";
import { useDocumentTitle } from "@/utils";
import { useUrlQueryParams } from "@/utils/use-url-params";
import { useMemo, useState } from "react";
import { AddProject } from "@/screens/project-list/add-project";
import { Button } from "antd";

export const ProjectList = () => {
  useDocumentTitle("项目列表", false);
  // const [, setParams] = useState({
  //   name: "",
  //   personId: "",
  // });
  const [params, setSearchPrams] = useUrlQueryParams<"name" | "personId">(
    useMemo(() => ["name", "personId"], [])
  );
  const _params = useMemo(() => {
    return { ...params, personId: Number(params.personId) || undefined };
  }, [params]);
  const { data: userList } = useRequstUsers();
  // const list = undefined
  //   const loading = false
  //   const entry = () => {}
  //   console.log(_params)
  const { data: list, loading, entry } = useRequstProjects(_params);
  return (
    <ProjectPage>
      <SearchPanel
        params={_params}
        setParams={setSearchPrams}
        userList={userList || []}
      />
      <ListTable
        list={list || []}
        userList={userList || []}
        loading={loading}
        entry={entry}
      />
      <AddProject></AddProject>
    </ProjectPage>
  );
};
const ProjectPage = styled.div`
  width: 100%;
  height: 100%;
`;
