import React from "react";
import { useAuth } from "../../context/auth-context";
import { Form, Input, Button, Card } from "antd";

export const Login = () => {
  const { login } = useAuth();

  const handleOnSubmit = (values: any) => {
    requestLogin(values);
  };
  const requestLogin = (params: {
    username: string;
    password: string;
  }): void => {
    // console.log(login(params))
    login(params);
  };
  return (
    <Card
      style={{
        width: "400px",
        marginTop: "50px",
        position: "absolute",
        left: "50%",
        marginLeft: "-400px",
      }}
    >
      <Form
        onFinish={handleOnSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
