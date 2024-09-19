import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  notification,
  ConfigProvider,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../../../redux/api/authApi";
import { logIn } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import "./Login.css";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logInRequest, { data, isSuccess }] = useLogInMutation();

  const onFinish = (values) => {
    logInRequest(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        logIn({
          token: data.payload.token,
          username: data.payload.username,
          email: data.payload.email,
        })
      );
      notification.success({
        message: "Successfully logged in! Go ahead 😊",
      });
      navigate("/profile");
    }
  }, [isSuccess]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#28a745",
          colorBgBase: "#1d1d1d",
          colorText: "#fff",
          colorBorder: "#444",
        },
      }}
    >
      <Form
        className="login-form"
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          overFlow: "hidden",
          backgroundColor: "#1d1d1d",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Title
          level={2}
          className="login-title text-center"
          style={{ color: "#28a745" }}
        >
          Login
        </Title>

        <Form.Item
          label={<span style={{ color: "#fff" }}>Username</span>}
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            style={{ background: "#333", color: "#fff", borderColor: "#444" }}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#fff" }}>Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            style={{ background: "#333", color: "#fff", borderColor: "#444" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="w-full"
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#28a745",
              borderColor: "#28a745",
              width: "100%",
            }}
          >
            Login
          </Button>
        </Form.Item>

        <Text style={{ color: "#fff" }}>
          Don't have an account?{" "}
          <Link to="/auth/signup" style={{ color: "#28a745" }}>
            Sign Up
          </Link>
        </Text>
      </Form>
    </ConfigProvider>
  );
};

export default Login;
