import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Modal, Form, DatePicker, Input, Select, InputNumber, message } from 'antd';
import moment from 'moment';
import { API_URL } from '../../../components/utils/config';
import { refreshAccessToken } from '../../../components/utils/refreshToken';

const { Option } = Select;

const CreateSessionModal = ({ visible, onCancel, patientId, fetchData }) => {
  const [form] = Form.useForm();

  const [statusOptions, setStatusOptions] = useState({});

  const fetchStatusOptions = async () => {
    try {
      const statusList = [
        'arrives_list',
        'availability_list',
        'category_list',
        'conditions_list',
        'conjunctiva_list',
        'education_list',
        'family_list',
        'heart_list',
        'intoxication_list',
        'meningeal_list',
        'nutrition_list',
        'palimpsests_list',
        'pupils_list',
        'situation_list',
        'skin_list',
        'tolerance_list',
        'traces_list',
        'views_list',
        'wheezing_list',
      ];

      const options = {};

      for (const statusType of statusList) {
        const response = await axios.get(`${API_URL}/api/v1/status/${statusType}/`);
        console.log(response.data);
        options[statusType] = response.data;
      }

      setStatusOptions(options);
    } catch (error) {
      console.error('Error fetching status options:', error);
    }
  };

  useEffect(() => {
    fetchStatusOptions();
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.anamnesis.receiving_something_time = moment(
        values.anamnesis.receiving_something_time,
      ).format('YYYY-MM-DD');
      values.anamnesis.category = [values.anamnesis.category];
      values.somatic.state_conjunctiva = 1;
      values.anamnesis.type_tolerance = [values.anamnesis.type_tolerance];
      values.anamnesis.type_intoxication = [values.anamnesis.type_intoxication];

      await refreshAccessToken();
      await axios.post(`${API_URL}/api/v1/records/${patientId}/record/`, values, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      message.success('Сессия успешно создана');
      form.resetFields();
      fetchData();
      onCancel();
    } catch (error) {
      console.error('Error creating session:', error);
      message.error('Ошибка при создании сессии');
    }
  };

  return (
    <Modal
      title="Добавить сессию"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form}>
        {/* Ваши Form.Item элементы здесь */}
        <Form.Item
          name={['arrives']}
          label="Прибытие"
          rules={[{ required: true, message: 'Пожалуйста, укажите прибытие' }]}
        >
          <Select placeholder="Выберите прибытие">
            {statusOptions['arrives_list'] &&
              statusOptions['arrives_list'].map((option, i) => (
                <Option key={i} value={option.id}>
                  {Object.values(option)[0]}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={['price']}
          label="Цена"
          rules={[{ required: true, message: 'Пожалуйста, укажите цену' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name={['conditions']}
          label="Условия"
          rules={[{ required: true, message: 'Пожалуйста, укажите условия' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['escorts']}
          label="Сопровождение"
          rules={[{ required: true, message: 'Пожалуйста, укажите сопровождение' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['complaints']}
          label="Жалобы"
          rules={[{ required: true, message: 'Пожалуйста, укажите жалобы' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['date_of_admission']}
          label="Дата поступления"
          rules={[{ required: true, message: 'Пожалуйста, укажите дату поступления' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name={['date_of_discharge']}
          label="Дата выписки"
          rules={[{ required: true, message: 'Пожалуйста, укажите дату выписки' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name={['departament']}
          label="Отделение"
          rules={[{ required: true, message: 'Пожалуйста, укажите отделение' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name={['number_of_days']}
          label="Количество дней"
          rules={[{ required: true, message: 'Пожалуйста, укажите количество дней' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name={['blood_type']}
          label="Группа крови"
          rules={[{ required: true, message: 'Пожалуйста, укажите группу крови' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['anamnesis', 'receiving_something']} label="Прием чего-то">
          <Input />
        </Form.Item>
        <Form.Item name={['anamnesis', 'receiving_something_time']} label="Время приема чего-то">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name={['anamnesis', 'somatic_disorders']} label="Соматические расстройства">
          <Input />
        </Form.Item>
        <Form.Item name={['anamnesis', 'mental_disorders']} label="Психические расстройства">
          <Input />
        </Form.Item>
        <Form.Item name={['anamnesis', 'daily_tolerance']} label="Суточная переносимость">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name={['anamnesis', 'binge_drinking']} label="Похмелье">
          <Input />
        </Form.Item>
        <Form.Item name={['anamnesis', 'light_gaps']} label="Световые промежутки">
          <Input />
        </Form.Item>
        <Form.Item
          name={['anamnesis', 'duration_last_binge']}
          label="Продолжительность последнего похмелья"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['anamnesis', 'duration_last_remission']}
          label="Продолжительность последней ремиссии"
        >
          <Input />
        </Form.Item>
        <Form.Item name={['anamnesis', 'last_treatment']} label="Последнее лечение">
          <Input />
        </Form.Item>
        <Form.Item name={['anamnesis', 'last_alcohol_intake']} label="Последний прием алкоголя">
          <Input />
        </Form.Item>
        <Form.Item name={['anamnesis', 'dose']} label="Дозировка">
          <Input />
        </Form.Item>
        <Form.Item name={['anamnesis', 'addition']} label="Дополнение">
          <Input />
        </Form.Item>
        <Form.Item name={['anamnesis', 'category']} label="Категория">
          <Select placeholder="Выберите категорию">
            {statusOptions['category_list'] &&
              statusOptions['category_list'].map((option, index) => (
                <Option key={index} value={option.id}>
                  {Object.values(option)[0]}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name={['anamnesis', 'type_tolerance']} label="Тип толерантности">
          <Select placeholder="Выберите тип толерантности">
            {statusOptions['tolerance_list'] &&
              statusOptions['tolerance_list'].map((option, index) => (
                <Option key={index} value={option.id}>
                  {Object.values(option)[0]}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name={['anamnesis', 'type_intoxication']} label="Тип отравления">
          <Select placeholder="Выберите тип отравления">
            {statusOptions['intoxication_list'] &&
              statusOptions['intoxication_list'].map((option, index) => (
                <Option key={index} value={option.id}>
                  {Object.values(option)[0]}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name={['anamnesis', 'type_palimpsests']} label="Тип палимпсестов">
          <Select placeholder="Выберите тип палимпсестов">
            {statusOptions['palimpsests_list'] &&
              statusOptions['palimpsests_list'].map((option, index) => (
                <Option key={index} value={option.id}>
                  {Object.values(option)[0]}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name={['somatic', 'condition']} label="Состояние">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'category']} label="Категория">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'skin_type']} label="Тип кожи">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'availability']} label="Доступность">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'traces']} label="Следы">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'state_conjunctiva']} label="Состояние конъюнктивы">
          <Select placeholder="Выберите состояние конъюнктивы">
            {statusOptions['conjunctiva_list'] &&
              statusOptions['conjunctiva_list'].map((option, index) => (
                <Option key={index} value={option.id}>
                  {Object.values(option)[0]}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name={['somatic', 'breath']} label="Дыхание">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'wheezing']} label="Свист">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'bh']} label="BH">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'saturation']} label="Сатурация">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'heart_tones']} label="Сердечные тоны">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'ad']} label="АД">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'pulse_frequency']} label="Частота пульса">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name={['somatic', 'filling']} label="Полнота">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'tongue']} label="Язык">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'stomach']} label="Живот">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'liver']} label="Печень">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'vomiting']} label="Рвота">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'stool']} label="Стул">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'diuresis']} label="Диурез">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'edema']} label="Отеки">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'glucose']} label="Глюкоза">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'apparatus']} label="Приборы">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'vascular_system']} label="Сосудистая система">
          <Input />
        </Form.Item>
        <Form.Item name={['somatic', 'supplements']} label="Добавки">
          <Input />
        </Form.Item>
        <Form.Item name={['neurological', 'pupils']} label="Зрачки">
          <Select placeholder="Выберите состояние зрачков">
            {statusOptions['pupils_list'] &&
              statusOptions['pupils_list'].map((option, index) => (
                <Option key={index} value={option.id}>
                  {Object.values(option)[0]}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name={['neurological', 'photo_reaction']} label="Фотореакция">
          <Input />
        </Form.Item>
        <Form.Item name={['neurological', 'meningeal_signs']} label="Менингеальные признаки">
          <Select placeholder="Выберите менингеальные признаки">
            {statusOptions['meningeal_list'] &&
              statusOptions['meningeal_list'].map((option, index) => (
                <Option key={index} value={option.id}>
                  {Object.values(option)[0]}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name={['neurological', 'seizures']} label="Судороги">
          <Input />
        </Form.Item>
        <Form.Item name={['neurological', 'dysarthria']} label="Дизартрия">
          <Input />
        </Form.Item>
        <Form.Item name={['mental', 'view']} label="Вид">
          <Select placeholder="Выберите вид">
            {statusOptions['views_list'] &&
              statusOptions['views_list'].map((option, index) => (
                <Option key={index} value={option.id}>
                  {Object.values(option)[0]}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={['mental', 'smell_of_alcohol']}
          label="Запах алкоголя"
          valuePropName="checked"
        >
          <Input type="checkbox" />
        </Form.Item>
        <Form.Item name={['mental', 'behavior']} label="Поведение">
          <Input />
        </Form.Item>
        <Form.Item name={['mental', 'consciousness']} label="Сознание">
          <Input />
        </Form.Item>
        <Form.Item name={['mental', 'orientation']} label="Ориентированность">
          <Input />
        </Form.Item>
        <Form.Item name={['mental', 'perception_disorders']} label="Расстройства восприятия">
          <Input />
        </Form.Item>
        <Form.Item name={['mental', 'emotional_background']} label="Эмоциональный фон">
          <Input />
        </Form.Item>
        <Form.Item name={['mental', 'night_sleep']} label="Ночной сон">
          <Input />
        </Form.Item>
        <Form.Item name={['mental', 'suicide_attempt']} label="Попытка суицида">
          <Input />
        </Form.Item>
        <Form.Item name={['mental', 'causes_of_alcohol']} label="Причины употребления алкоголя">
          <Input />
        </Form.Item>
        <Form.Item name={['mental', 'purpose_of_hospitalization']} label="Цель госпитализации">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSessionModal;
