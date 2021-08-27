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
      title={isEditProject ? "编辑项目" : "新建项目"}
      placement="right"
      onClose={() => dispatch(changeDrawerVisible(false))}
      visible={drawerVisible}
    >
      <Form
        style={{ width: "500px" }}
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onSave}
      >
        <Form.Item name="name" label="名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="organization"
          label="部门"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="personId" label="负责人">
          <SelectBiz
            style={{ width: "100%" }}
            options={userList || []}
            optionProps={{
              valueKey: "id",
              textKey: "name",
              key: "id",
            }}
            defaultOptionText={"负责人"}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
