import { Button, Form, Input, Typography, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signUp } from "../../../redux/slices/authSlice";
import { useSignUpMutation } from "../../../redux/api/authApi";
import "./SignUp.css";

const { Title, Text } = Typography;

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpRequest, { data, isSuccess }] = useSignUpMutation();

  const onFinish = (values) => {
    signUpRequest(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(signUp({ token: data.payload.token }));
      notification.success({
        message: "Successfully signed up! Go ahead 😊",
      });
      navigate("/profile");
    }
  }, [isSuccess]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="custom-signup-form p-4"
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={2} className="text-center" style={{ color: "#fff" }}>
        Sign Up
      </Title>

      <Form.Item
        label="Firstname"
        name="first_name"
        rules={[{ required: true, message: "Please input your firstname!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Photo URL"
        name="photo_url"
        rules={[{ required: true, message: "Please input your photo URL!" }]}
      >
        <Input type="url" />
      </Form.Item>

      <Form.Item>
        <Button className="custom-button" type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>

      <Text>
        Already have an account? <Link to="/auth/login">Log in</Link>
      </Text>
    </Form>
  );
};

export default SignUp;
