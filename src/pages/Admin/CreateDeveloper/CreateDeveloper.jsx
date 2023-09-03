import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import d from './CreateDeveloper.module.css';
import { Option } from 'antd/es/mentions';

const CreateUser = () => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://139.59.132.105/api/v1/register/', values);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form
      name="basic"
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      autoComplete="off"
      className={d.form}
    >
      <div className={d.form_input}>
        <span className={d.form_span}>Phone:</span>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please input your phone!',
            },
          ]}
          className={d.input}
        >
          <Input />
        </Form.Item>
      </div>

      <div className={d.form_input}>
        <span className={d.form_span}>Имя:</span>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
          className={d.input}
        >
          <Input />
        </Form.Item>
      </div>

      <div className={d.form_input}>
        <span className={d.form_span}>Пароль:</span>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          className={d.input}
        >
          <Input.Password />
        </Form.Item>
      </div>
      <div className={d.form_input}>
        <span className={d.form_span}>Роль:</span>
        <Form.Item
          name="role"
          rules={[
            {
              required: true,
              message: 'Please select a role!',
            },
          ]}
          className={d.input}
        >
          <Select placeholder="Select a role">
            <Option value="1">Admin</Option>
            <Option value="2">Доктор</Option>
            <Option value="3">Психолог</Option>
            <Option value="4">Мед-Сестра</Option>
          </Select>
        </Form.Item>
      </div>
      {/* Добавьте другие поля, если они необходимы в соответствии с вашим UserRegisterSerializer */}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
