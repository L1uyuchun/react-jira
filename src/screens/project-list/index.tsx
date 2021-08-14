import { cleanObject } from "../../utils";
import { useMount, useDebounce } from "../../utils/custom-hooks";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import { ListTable } from "./list";
const querystring = require("querystring");
export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debounceParams = useDebounce(params, 500);
  const [list, setList] = useState([]);
  const [userList, setUserList] = useState([]);

  useMount(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`).then(async (response) => {
      if (response.ok) {
        setUserList(await response.json());
      }
    });
  });

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/projects?${querystring.stringify(
        cleanObject(debounceParams)
      )}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParams]);
  return (
    <div>
      <SearchPanel
        params={params}
        setParams={setParams}
        userList={userList}
      ></SearchPanel>
      <ListTable list={list} userList={userList}></ListTable>
    </div>
  );
};
