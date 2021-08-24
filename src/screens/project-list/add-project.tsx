import { Drawer } from "antd";

export const AddProject = ({
  drawerVisible,
  onClose,
}: {
  drawerVisible?: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      width={"100%"}
      title="Basic Drawer"
      placement="right"
      onClose={onClose}
      visible={drawerVisible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
