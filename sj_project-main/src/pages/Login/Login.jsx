import React from 'react';
import { Button, Form, Input, message } from 'antd';
import l from './Login.module.css';
import axios from 'axios';
import { useAuth } from '../../components/utils/context';
import { API_URL } from '../../components/utils/config';

const Login = () => {
  const { setAuthData } = useAuth();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/login/`, values);
      console.log('Login Successful:', response.data);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setAuthData({ isAuth: true });
      const response2 = await axios.get(`${API_URL}/api/v1/me/`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${response.data.access}`,
        },
      });
      setAuthData((prevState) => ({ ...prevState, role: response2.data.role }));
      localStorage.setItem('role', response2.data.role);
      localStorage.setItem('name', response2.data.name);
      localStorage.setItem('surname', response2.data.surname);
      localStorage.setItem('phone', response2.data.phone);
    } catch (error) {
      if (error.response.status === 401) {
        message.error('Неправильные учетные данные. Пожалуйста, попробуйте снова.');
      } else {
        console.error('Авторизация ошибочна:', error);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Пожалуйста, введите правильные данные для входа');
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
              message: 'Введите номер телефона!',
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
              message: 'Пожалуйста введите пароль!',
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
