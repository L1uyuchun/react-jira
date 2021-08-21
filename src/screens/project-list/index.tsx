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
import { cleanObject, useDocumentTitle } from "@/utils";
import { useUrlQueryParams } from "@/utils/use-url-params";

export const ProjectList = () => {
  useDocumentTitle("项目列表", false);
  // const [, setParams] = useState({
  //   name: "",
  //   personId: "",
  // });
  const [params, setSearchPrams] = useUrlQueryParams<"name" | "personId">([
    "name",
    "personId",
  ]);
  const _params = { ...params, personId: Number(params.personId) || undefined };
  // console.log(getSearchParams)
  const { data: userList } = useRequstUsers();
  const { data: list, loading, entry } = useRequstProjects(params);
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
    </ProjectPage>
  );
};
const ProjectPage = styled.div`
  width: 100%;
  height: 100%;
`;
