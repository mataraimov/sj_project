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
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={l.form}
        >
            <div className={l.form_input}>
                <span className={l.form_span}>Имя или Email:</span>
                <Form.Item
                    name="email_or_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    className={l.input}

                >
                    <Input />
                </Form.Item>
            </div>
            <div className={l.form_input}>
                <span className={l.form_span}>Пароль:</span>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    className={l.input}

                >
                    <Input.Password />
                </Form.Item>
            </div>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Войти
                </Button>
            </Form.Item>
        </Form>
    )

};
export default Login;
