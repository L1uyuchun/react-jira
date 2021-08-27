import { useLocation, useParams } from "react-router-dom";
import { useProjectInfo } from "@/screens/project-detail/detail-custom-hooks";
import { Button, Form, Input, Select } from "antd";
import { SelectBiz } from "@/components/select-biz";
import { useRequstUsers } from "@/screens/project-list/project-list-hooks";
const { Option } = Select;

export const BackBoard = () => {
  const location = useLocation();
  const params = useParams();
  const { project } = useProjectInfo();
  const [form] = Form.useForm();
  const { userList: processorList } = useRequstUsers(true);
  const onFinish = (values: any) => {
    console.log(values);
  };
  const onReset = () => {};

  return (
    <div>
      <h5 style={{ fontSize: "24px", fontWeight: "bold" }}>
        {project?.[0]?.name}看板
      </h5>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="taskName" label="任务名" rules={[{ required: true }]}>
          <Input placeholder={"任务名"} />
        </Form.Item>
        <Form.Item name="taskGroup" label="任务组" rules={[{ required: true }]}>
          <Select allowClear>
            <Option value="">任务组</Option>
            <Option value="外卖组">外卖组</Option>
            <Option value="团购组">团购组</Option>
            <Option value="物料组">物料组</Option>
            <Option value="总部组">总部组</Option>
            <Option value="送餐组">送餐组</Option>
          </Select>
        </Form.Item>
        <Form.Item name="taskGroup" label="任务组" rules={[{ required: true }]}>
          <SelectBiz
            allowClear
            options={processorList || []}
            optionProps={{
              valueKey: "id",
              textKey: "name",
              key: "id",
            }}
            defaultOptionText={"经办人"}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
