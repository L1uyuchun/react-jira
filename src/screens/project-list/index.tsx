import { cleanObject } from "../../utils";
import { useMount } from "../../utils/custom-hooks";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import { ListTable } from "./list";
import { useHttp } from "../../utils/http";
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
    <div>
      <SearchPanel params={params} setParams={setParams} userList={userList} />
      <ListTable list={list} userList={userList} />
    </div>
  );
};
