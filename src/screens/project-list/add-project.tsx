import { Button, Drawer, Form, Input, Select } from "antd";
import {
  useCreateProjectParam,
  useRequstUsers,
  useSaveAddProjects,
} from "@/screens/project-list/project-list-hooks";
import { SelectBiz } from "@/components/select-biz";
import { useMutation, useQueryClient } from "react-query";
import { useEffect } from "react";
import { Projects } from "@/screens/project-list/list";
const { Option } = Select;

export const AddProject = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const queryClient = useQueryClient();
  const { userList } = useRequstUsers(false);
  const [form] = Form.useForm();
  const saveProjectFun = useSaveAddProjects();
  const { mutate, isLoading } = useMutation(
    "saveProjectFun",
    (params: Partial<Projects>) => saveProjectFun(params),
    {
      onSuccess: () => {
        handleCloseDrawer();
        queryClient.invalidateQueries("projectList");
      },
    }
  );

  const {
    drawerVisible,
    createDrawerVisible,
    setEditUrlParams,
    editProjectInitData,
    isEditProject,
  } = useCreateProjectParam();
  useEffect(() => {
    if (drawerVisible) {
      if (isEditProject) {
        form.setFieldsValue(editProjectInitData);
      } else {
        form.resetFields();
      }
    }
  }, [drawerVisible, editProjectInitData]);
  const handleCloseDrawer = () => {
    isEditProject
      ? setEditUrlParams({ editProject: undefined })
      : createDrawerVisible(false);
  };
  const onSave = (values: any) => {
    mutate({ ...values, id: editProjectInitData?.id });
  };

  return (
    <Drawer
      width={"100%"}
      title={isEditProject ? "编辑项目" : "新建项目"}
      placement="right"
      visible={drawerVisible}
      onClose={() => handleCloseDrawer()}
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
