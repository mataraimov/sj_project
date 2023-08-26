import React from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import i from './CreateInvestor.module.css'

const CreateInvestor = () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/add_inv/', values, { headers });
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
      className={i.form}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        className={i.input}

      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        className={i.input}

      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        className={i.input}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
    </Form>
  )
};
export default CreateInvestor;