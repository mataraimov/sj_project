import React from 'react';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import axios from 'axios';
import i from './CreateInvestor.module.css';
import 'moment/locale/ru';
const { Option } = Select;

const CreatePatient = () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };

  const onFinish = async (values) => {
    // Создайте объект anamnesis_life с необходимыми данными
    const anamnesis_life = {
      // Добавьте здесь необходимые поля и значения
    };

    try {
      const response = await axios.post(
        'http://139.59.132.105/api/v1/patients/',
        {
          ...values,
          anamnesis_life: anamnesis_life, // Передайте объект anamnesis_life как словарь
        },
        { headers },
      );

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
      <div className={i.form_input}>
        <span className={i.form_span}>Имя:</span>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input name!',
            },
          ]}
          className={i.input}
        >
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Фамилия:</span>
        <Form.Item
          name="surname"
          rules={[
            {
              required: true,
              message: 'Please input surname!',
            },
          ]}
          className={i.input}
        >
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Отчество:</span>
        <Form.Item name="patronymic" className={i.input}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Дата рождения:</span>
        <Form.Item
          name="date_of_birth"
          rules={[
            {
              required: true,
              message: 'Please select date of birth!',
            },
          ]}
          className={i.input}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Аватар:</span>
        <Form.Item name="avatar" className={i.input}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Находится в больнице:</span>
        <Form.Item name="in_hospital" valuePropName="checked" className={i.input}>
          <Input type="checkbox" />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Анамнез заболевания:</span>
        <Form.Item name="anamnesis_life" className={i.input}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Состояние:</span>
        <Form.Item name="conditions" className={i.input}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Цена:</span>
        <Form.Item name="price" className={i.input}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Сопровождающие:</span>
        <Form.Item name="escorts" className={i.input}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Жалобы:</span>
        <Form.Item name="complaints" className={i.input}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Дата поступления:</span>
        <Form.Item
          name="date_of_admission"
          rules={[
            {
              required: true,
              message: 'Please select date of admission!',
            },
          ]}
          className={i.input}
        >
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Дата выписки:</span>
        <Form.Item
          name="date_of_discharge"
          rules={[
            {
              required: true,
              message: 'Please select date of discharge!',
            },
          ]}
          className={i.input}
        >
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Отделение:</span>
        <Form.Item name="departament" className={i.input}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Количество дней:</span>
        <Form.Item name="number_of_days" className={i.input}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Группа крови:</span>
        <Form.Item name="blood_type" className={i.input}>
          <Input />
        </Form.Item>
      </div>

      {/* Добавьте другие поля, если необходимо */}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePatient;
