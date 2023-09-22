import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
import { Descriptions, Button, Modal, Form, DatePicker, Input, Select, InputNumber } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../components/utils/config';

const { Option } = Select;

const PatientDetails = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [educationOptions, setEducationOptions] = useState([]);
  const [familyOptions, setFamilyOptions] = useState([]);
  const fetchEducationOptions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/status/education_list/`);
      const educationOptions = Object.entries(response.data).map(([key, value]) => ({
        id: +key + 1,
        name: value[Object.keys(value)[0]],
      }));
      // Обновите состояние с вариантами образования
      setEducationOptions(educationOptions);
    } catch (error) {
      console.error('Error fetching education options:', error);
    }
  };
  const fetchFamilyOptions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/status/family_list/`);
      const familyOptions = Object.entries(response.data).map(([key, value]) => ({
        id: +key + 1,
        name: value[Object.keys(value)[0]],
      }));

      setFamilyOptions(familyOptions);
    } catch (error) {
      console.error('Error fetching family options:', error);
    }
  };

  useEffect(() => {
    fetchEducationOptions();
    fetchFamilyOptions();
  }, []);
  useEffect(() => {
    fetchPatientData();
    moment.locale('ru'); // Установите локаль 'ru'
  }, []);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/patients/${id}/`, {
        headers,
      });
      setPatientData(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      axios
        .patch(
          `${API_URL}/api/v1/patients/${id}/`,
          {
            ...values,
            date_of_birth: moment(values.date_of_birth).format('YYYY-MM-DD'),
          },
          { headers },
        )
        .then((response) => {
          setPatientData(response.data);
          setModalVisible(false);
          form.resetFields();
        })
        .catch((error) => {
          console.error('Error updating patient data:', error);
        });
    });
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Descriptions title="Детали пациента">
        <Descriptions.Item label="Имя">{patientData?.name}</Descriptions.Item>
        <Descriptions.Item label="Фамилия">{patientData?.surname}</Descriptions.Item>
        <Descriptions.Item label="Отчество">{patientData?.patronymic}</Descriptions.Item>
        <Descriptions.Item label="Дата рождения">
          {moment(patientData?.date_of_birth).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Образование">
          {patientData?.anamnesis?.education}
        </Descriptions.Item>
        <Descriptions.Item label="Семейное положение">
          {patientData?.anamnesis?.martial_status}
        </Descriptions.Item>
        <Descriptions.Item label="Место работы">
          {patientData?.anamnesis?.place_work}
        </Descriptions.Item>
        <Descriptions.Item label="Судимости">
          {patientData?.anamnesis?.criminal_record}
        </Descriptions.Item>
        <Descriptions.Item label="Прошлые заболевания">
          {patientData?.anamnesis?.previous_illnesses}
        </Descriptions.Item>
        <Descriptions.Item label="Принимаемые медикаменты">
          {patientData?.anamnesis?.medications}
        </Descriptions.Item>
        <Descriptions.Item label="Аллергический анамнез">
          {patientData?.anamnesis?.allergic_history}
        </Descriptions.Item>
        {/* Добавьте другие поля для отображения информации о пациенте */}
      </Descriptions>
      <Button
        type="primary"
        icon={<EditOutlined />}
        style={{ marginBottom: 16, float: 'right' }}
        onClick={showModal}
      >
        Редактировать
      </Button>
      {/* Добавьте другие компоненты для отображения данных о посещениях пациента */}
      <Modal
        title="Редактировать информацию о пациенте"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} initialValues={patientData}>
          <Form.Item name="name" label="Имя">
            <Input />
          </Form.Item>
          <Form.Item name="surname" label="Фамилия">
            <Input />
          </Form.Item>
          <Form.Item name="patronymic" label="Отчество">
            <Input />
          </Form.Item>
          {/* <Form.Item name="date_of_birth" label="Дата рождения">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item> */}
          <Form.Item name={['anamnesis', 'education']} label="Образование">
            <Select>
              {educationOptions.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name={['anamnesis', 'martial_status']} label="Семейное положение">
            <Select>
              {familyOptions.map((option) => (
                <Option key={option.id} value={option.id}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={['anamnesis', 'place_work']} label="Место работы">
            <Input />
          </Form.Item>
          <Form.Item name={['anamnesis', 'criminal_record']} label="Судимости">
            <Input />
          </Form.Item>
          <Form.Item name={['anamnesis', 'previous_illnesses']} label="Прошлые заболевания">
            <Input />
          </Form.Item>
          <Form.Item name={['anamnesis', 'medications']} label="Принимаемые медикаменты">
            <Input />
          </Form.Item>
          <Form.Item name={['anamnesis', 'allergic_history']} label="Аллергический анамнез">
            <Input />
          </Form.Item>
          {/* Добавьте другие поля для редактирования информации о пациенте */}
        </Form>
      </Modal>
    </div>
  );
};

export default PatientDetails;
