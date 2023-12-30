import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Button, message, Input, DatePicker } from 'antd';
import moment from 'moment';

import { API_URL } from '../../../../components/utils/config';
import { refreshAccessToken } from '../../../../components/utils/refreshToken';

const CreateEpicrisisModal = ({ visible, onCancel, patientId, fetchData }) => {
  const [form] = Form.useForm();
  const [dates, setDates] = useState({});
  const handleDateChange = (field, dateString) => {
    setDates({
      ...dates,
      [field]: dateString ? moment(dateString, 'YYYY-MM-DD') : null,
    });
  };
  const handleOk = async () => {
    try {
      const finalValues = {
        ...form.getFieldsValue(),
        start_treatment: moment(dates.start_treatment).format('YYYY-MM-DD'),
        end_treatment: moment(dates.end_treatment).format('YYYY-MM-DD'),
      };
      await refreshAccessToken();
      await axios.post(`${API_URL}/api/v1/epicrisis/${patientId}/post/`, finalValues, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      message.success('Эпикриз успешно создан');
      form.resetFields();
      fetchData();
      onCancel();
    } catch (error) {
      console.error('Ошибка создания эпикриза:', error);
      message.error('Ошибка создания эпикриза');
    }
  };

  return (
    <Modal
      title="Добавить эпикриз"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Сохранить
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
      ]}>
      <Form form={form} onFinish={handleOk}>
        <Form.Item
          name="start_treatment"
          label="Начало лечения"
          rules={[{ required: true, message: 'Пожалуйста, выберите дату начала лечения' }]}>
          <DatePicker
            onChange={(date, dateString) => handleDateChange('start_treatment', dateString)}
          />
        </Form.Item>
        <Form.Item
          name="end_treatment"
          label="Конец лечения"
          rules={[{ required: true, message: 'Пожалуйста, выберите дату окончания лечения' }]}>
          <DatePicker
            onChange={(date, dateString) => handleDateChange('end_treatment', dateString)}
          />
        </Form.Item>
        <Form.Item
          name="main_diagnosis"
          label="Основной диагноз"
          rules={[
            { required: true, message: 'Введите основной диагноз' },
            { max: 255, message: 'Основной диагноз должен содержать не более 255 символов' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="concomitant"
          label="Сопутствующий"
          rules={[
            { required: true, message: 'Пожалуйста, введите сопутствующие' },
            { max: 125, message: 'Сопутствующее сообщение должно содержать не более 125 символов' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="complications"
          label="Осложнения"
          rules={[
            { required: true, message: 'Пожалуйста, введите осложнения' },
            { max: 255, message: 'Осложнения должны содержать не более 255 символов' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="laboratory_tests"
          label="Лабораторные тесты"
          rules={[
            { required: true, message: 'Пожалуйста, укажите лабораторные анализы' },
            {
              max: 255,
              message: 'Лабораторные исследования должны содержать не более 255 символов',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="instrumental_studies"
          label="Инструментальные исследования"
          rules={[
            { required: true, message: 'Пожалуйста, укажите инструментальные исследования' },
            {
              max: 255,
              message: 'Инструментальные исследования должны содержать не более 255 символов',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="ecg"
          label="ЭКГ"
          rules={[
            { required: true, message: 'Пожалуйста, введите ЭКГ' },
            { max: 255, message: 'ЭКГ должна содержать не более 255 символов' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="x_ray"
          label="Рентген"
          rules={[
            { required: true, message: 'Пожалуйста, введите рентген' },
            { max: 125, message: 'Рентген должен содержать не более 125 символов' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="specialist_consultations"
          label="Консультации специалистов"
          rules={[
            { required: true, message: 'Пожалуйста, введите консультации специалистов' },
            { max: 255, message: 'Консультации специалистов должны быть не более 255 символов' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="treatment"
          label="Лечение"
          rules={[
            { required: true, message: 'Пожалуйста, укажите лечение' },
            { max: 255, message: 'Длина обращения должна быть не более 255 символов' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="treatment_results"
          label="Результаты лечения"
          rules={[
            { required: true, message: 'Пожалуйста, укажите результаты лечения' },
            { max: 255, message: 'Результаты лечения должны содержать не более 255 символов' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="recommendations"
          label="Рекомендации"
          rules={[{ max: 255, message: 'Рекомендации должны содержать не более 255 символов' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEpicrisisModal;
