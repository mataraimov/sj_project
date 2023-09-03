import React from 'react';
import { Button, Form, Input } from 'antd';
import l from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/utils/context';

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAuth();
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://139.59.132.105/api/v1/login/', values);
      console.log('Login Successful:', response.data);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('is_admin', response.data.role === '1');
      localStorage.setItem('is_dev', response.data.role === '2');
      localStorage.setItem('is_inv', response.data.role === '3');
      setIsAuth(true);
      navigate('/');
    } catch (error) {
      console.error('Login Failed with POST:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
        <span className={l.form_span}>Phone:</span>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: 'phone',
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
  );
};

export default Login;
