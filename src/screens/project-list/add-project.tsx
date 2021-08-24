import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { changeDrawerVisible } from "./project-store-slice";

export const AddProject = () => {
  const drawerVisible = useSelector(
    (state: RootState) => state.projectList.drawerVisible
  );
  const dispatch = useDispatch();
  return (
    <Drawer
      width={"100%"}
      title="Basic Drawer"
      placement="right"
      onClose={() => dispatch(changeDrawerVisible(false))}
      visible={drawerVisible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
