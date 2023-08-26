import React from "react";
import { Button, Form, Input } from "antd";
import l from "./Login.module.css";
import axios from "axios";

const Login = () => {
  const onFinish = async (values) => {
    try {
      const postResponse = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        values
      );
      console.log("Login Successful:", postResponse.data);
      localStorage.setItem("access_token", postResponse.data.access);
      localStorage.setItem("is_admin", postResponse.data.is_admin);
      localStorage.setItem("is_dev", postResponse.data.is_dev);
      localStorage.setItem("is_inv", postResponse.data.is_inv);
      window.location.reload();
    } catch (postError) {
      console.error("Login Failed with POST:", postError);

      try {
        const putResponse = await axios.put(
          "http://127.0.0.1:8000/api/users/user_update/",
          values
        );
        console.log("Update Successful:", putResponse.data);
      } catch (putError) {
        console.error("Update Failed with PUT:", putError);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={l.form}
    >
      <Form.Item
        name="email_or_name"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
        className={l.input}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        className={l.input}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
