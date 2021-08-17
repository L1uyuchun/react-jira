/** @jsxImportSource @emotion/react */
import { useAuth } from "../../context/auth-context";
import { Form, Input, Button, Divider } from "antd";
import styled from "@emotion/styled";
import loginBgImg from "@/assets/images/loginBg.png";

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
    <LoginPage>
      {/*<Header>*/}
      {/*  <LogoIcon width={'4rem'} height={'3rem'}/>*/}
      {/*  <span css={{width: '100px', fontSize: '2.4rem'}}>jira</span>*/}
      {/*</Header>*/}
      <CardContainer>
        <Form
          onFinish={handleOnSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input placeholder={"用户名"} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password placeholder={"密码"} />
          </Form.Item>
          <Form.Item
            css={{
              ".ant-form-item-control-input-content": {
                display: "flex",
                justifyContent: "center",
              },
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <Divider />
        <Button type="link" block>
          没有账号？注册新账号
        </Button>
      </CardContainer>
    </LoginPage>
  );
};

const LoginPage = styled.div`
  width: 100%;
  height: 100%;
  background-attachment: scroll;
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: border-box;
  background-image: url(${loginBgImg});
  padding-top: 20rem;
`;
// const Header = styled.header`
//   height: 20rem;
//   display: grid;
//   justify-content: center;
//   align-content: center;
//   grid-template-rows: 1fr;
//   grid-template-columns: 4rem 6rem;
//   align-items: end;
// `
const CardContainer = styled.div`
  background-color: #fff;
  width: 40rem;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 15.5rem 5rem 1fr;
  justify-content: center;
  position: absolute;
  left: 50%;
  margin-left: -200px;
  box-shadow: 0px 0px 5px 3px rgb(238, 238, 238, 0.5);
  padding: 40px 20px 40px 20px;
  z-index: 10;
`;
