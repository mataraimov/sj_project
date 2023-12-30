import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import axios from 'axios';
import i from './CreatePatient.module.css';
// import 'moment/locale/';
import { refreshAccessToken } from '../../../components/utils/refreshToken';
import CustomNotification from '../../../components/utils/Toasts/CustomNotification';
import { API_URL } from '../../../components/utils/config';

const { Option } = Select;

const CreatePatient = () => {
  const [anamnesisLife, setAnamnesisLife] = useState({
    education: null,
    martial_status: null,
    place_work: '',
    criminal_record: '',
    previous_illnesses: '',
    medications: '',
    allergic_history: '',
    date_of_birth: null,
  });
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);
  const [form] = Form.useForm();

  const [educationOptions, setEducationOptions] = useState([]);
  const [familyOptions, setFamilyOptions] = useState([]);
  const fetchEducationOptions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/status/education_list/`);

      setEducationOptions(response.data);
    } catch (error) {
      console.error('Ошибка при получении вариантов обучения:', error);
    }
  };
  const fetchFamilyOptions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/status/family_list/`);

      setFamilyOptions(response.data);
    } catch (error) {
      console.error('Ошибка при получении вариантов семейной группы:', error);
    }
  };

  useEffect(() => {
    fetchEducationOptions();
    fetchFamilyOptions();
  }, []);

  const onFinish = async (values) => {
    try {
      await refreshAccessToken();
      const headers = await {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      values.date_of_birth = anamnesisLife.date_of_birth;
      const response = await axios.post(
        `${API_URL}/api/v1/patients/`,
        {
          ...values,
          anamnesis_life: anamnesisLife,
        },
        { headers },
      );
      setShowSuccessNotification(true);
      form.resetFields();
    } catch (error) {
      setShowErrorNotification(true);
      console.error('Error:', error);
    }
  };
  const handleCloseSuccessNotification = () => {
    setShowSuccessNotification(false);
  };

  const handleCloseErrorNotification = () => {
    setShowErrorNotification(false);
  };
  const handleAnamnesisLifeChange = (field, value) => {
    setAnamnesisLife({
      ...anamnesisLife,
      [field]: value,
    });
  };

  return (
    <Form
      form={form}
      name="basic"
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      autoComplete="off"
      className={i.form}>
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
      <div className={i.form_input}>
        <span className={i.form_span}>Имя:</span>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите имя!',
            },
          ]}
          className={i.input}>
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
              message: 'Пожалуйста, введите фамилию!',
            },
          ]}
          className={i.input}>
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
              message: 'Пожалуйста, выберите дату рождения!',
            },
          ]}
          className={i.input}>
          <DatePicker
            format="YYYY-MM-DD"
            onChange={(date, dateString) => {
              if (typeof dateString === 'string') {
                handleAnamnesisLifeChange('date_of_birth', dateString);
              }
            }}
          />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Образование:</span>
        <Form.Item name="education" className={i.input}>
          <Select
            value={anamnesisLife.education}
            onChange={(value) => handleAnamnesisLifeChange('education', value)}>
            {educationOptions.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Семейное положение:</span>
        <Form.Item name="martial_status" className={i.input}>
          <Select
            value={anamnesisLife.martial_status}
            onChange={(value) => handleAnamnesisLifeChange('martial_status', value)}>
            {familyOptions.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Место работы:</span>
        <Form.Item
          name="place_work"
          className={i.input}
          value={anamnesisLife.place_work}
          onChange={(e) => handleAnamnesisLifeChange('place_work', e.target.value)}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Судимости:</span>
        <Form.Item
          name="criminal_record"
          className={i.input}
          value={anamnesisLife.criminal_record}
          onChange={(e) => handleAnamnesisLifeChange('criminal_record', e.target.value)}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Прошлые заболевания:</span>
        <Form.Item
          name="previous_illnesses"
          className={i.input}
          value={anamnesisLife.previous_illnesses}
          onChange={(e) => handleAnamnesisLifeChange('previous_illnesses', e.target.value)}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Принимаемые медикаменты:</span>
        <Form.Item
          name="medications"
          className={i.input}
          value={anamnesisLife.medications}
          onChange={(e) => handleAnamnesisLifeChange('medications', e.target.value)}>
          <Input />
        </Form.Item>
      </div>

      <div className={i.form_input}>
        <span className={i.form_span}>Аллергический анамнез:</span>
        <Form.Item
          name="allergic_history"
          className={i.input}
          value={anamnesisLife.allergic_history}
          onChange={(e) => handleAnamnesisLifeChange('allergic_history', e.target.value)}>
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
