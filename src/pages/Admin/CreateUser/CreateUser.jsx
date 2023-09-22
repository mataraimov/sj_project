import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import d from './CreateUser.module.css';
import { Option } from 'antd/es/mentions';
import { refreshAccessToken } from '../../../components/utils/refreshToken';
import { useNavigate } from 'react-router-dom';
import CustomNotification from '../../../components/utils/Toasts/CustomNotification';
import { API_URL } from '../../../components/utils/config';

const CreateUser = () => {
  const navigate = useNavigate();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  const onFinish = async (values) => {
    try {
      await refreshAccessToken();
      const response = await axios.post(`${API_URL}/api/v1/register/`, values);
      setShowSuccessNotification(true);
    } catch (error) {
      console.error('Error:', error);
      setShowErrorNotification(true);
    }
  };

  const handleCloseSuccessNotification = () => {
    setShowSuccessNotification(false);
  };

  const handleCloseErrorNotification = () => {
    setShowErrorNotification(false);
  };

  return (
    <div>
      {showSuccessNotification && (
        <CustomNotification
          message="Регистрация прошла успешно!"
          type="success"
          onClose={handleCloseSuccessNotification}
        />
      )}

      {showErrorNotification && (
        <CustomNotification
          message="Ошибка регистрации. Попробуйте еще раз."
          type="error"
          onClose={handleCloseErrorNotification}
        />
      )}

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
    </div>
  );
};

export default CreateUser;
