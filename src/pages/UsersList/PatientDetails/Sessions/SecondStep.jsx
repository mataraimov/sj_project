import React, { useState } from 'react';
import { Form, DatePicker, Input, InputNumber, Select, Button } from 'antd';
const { Option } = Select;

const SecondStep = ({ form, statusOptions, nextStep, prevStep }) => {
  const [controlType, setControlType] = useState('');
  const [lossOfControl, setLossOfControl] = useState('');

  const onFinish = (values) => {
    const control = `${controlType} - ${lossOfControl}`;
    const updatedValues = {
      ...values,
      anamnesis: {
        ...values.anamnesis,
        control,
      },
    };

    nextStep(updatedValues);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 9 }}
      wrapperCol={{ span: 18 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      <h2>Анамнез жизни</h2>
      <Form.Item
        name={['anamnesis', 'receiving_something']}
        label="Последний приём алкоголя"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о последнем приёме алкоголя' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'receiving_something_time']}
        label="Последнее время приёма"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о времени последнего приёма' },
        ]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'somatic_disorders']}
        label="Соматические расстройства"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите информацию о соматических расстройствах',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'mental_disorders']}
        label="Психические расстройства"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о психических расстройствах' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'daily_tolerance']}
        label="Суточная переносимость"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о суточной переносимости' },
        ]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'binge_drinking']}
        label="Похмелье"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о похмелье' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'light_gaps']}
        label="Светлые промежутки"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о световых промежутках' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'duration_last_binge']}
        label="Продолжительность последнего запоя"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите информацию о продолжительности последнего похмелья',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'duration_last_remission']}
        label="Продолжительность последней ремиссии"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите информацию о продолжительности последней ремиссии',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'last_treatment']}
        label="Последнее лечение"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о последнем лечении' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'last_alcohol_intake']}
        label="Последний прием алкоголя"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о последнем приеме алкоголя' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'dose']}
        label="Дозировка"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о дозировке' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'addition']}
        label="Дополнение"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о дополнении' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'type_tolerance']}
        label="Тип толерантности"
        rules={[{ required: true, message: 'Пожалуйста, выберите тип толерантности' }]}
      >
        <Select placeholder="Выберите тип толерантности">
          <Option value="Стабильный">Стабильный</Option>
          <Option value="Увеличивается">Увеличивается</Option>
          <Option value="Уменьшается">Уменьшается</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'type_palimpsests']}
        label="Тип палимпсестов"
        rules={[{ required: true, message: 'Пожалуйста, выберите тип палимпсестов' }]}
      >
        <Select placeholder="Выберите тип палимпсестов">
          <Option value="Есть">Есть</Option>
          <Option value="Нет">Нет</Option>
          <Option value="Тотальная амнезия есть">Тотальная амнезия есть</Option>
          <Option value="Тотальная амнезия нет">Тотальная амнезия нет</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'type_intoxication']}
        label="Тип опьянения"
        rules={[{ required: true, message: 'Пожалуйста, выберите тип опьянения' }]}
      >
        <Select placeholder="Выберите тип опьянения">
          <Option value="Эксплозивный">Эксплозивный</Option>
          <Option value="Дисфорический">Дисфорический</Option>
          <Option value="Истерический">Истерический</Option>
          <Option value="Импульсивный">Импульсивный</Option>
          <Option value="Депрессивный">Депрессивный</Option>
          <Option value="Маниакальный">Маниакальный</Option>
          <Option value="Сомнолентный">Сомнолентный</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Тип контроля"
        name={['anamnesis', 'controlType']}
        rules={[{ required: true, message: 'Пожалуйста, выберите тип контроля' }]}
      >
        <Select placeholder="Выберите тип контроля" onChange={(value) => setControlType(value)}>
          <Option value="Количественный контроль">Количественный контроль</Option>
          <Option value="Ситуационный контроль">Ситуационный контроль</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Утрата контроля"
        name={['anamnesis', 'lossOfControl']}
        rules={[{ required: true, message: 'Пожалуйста, выберите утрату контроля' }]}
      >
        <Select
          placeholder="Выберите утрату контроля"
          onChange={(value) => setLossOfControl(value)}
        >
          <Option value="Утрачен контроль">Утрачен контроль</Option>
          <Option value="Контроль не утрачен">Контроль не утрачен</Option>
        </Select>
      </Form.Item>

      <Button key="back" onClick={prevStep} style={{ width: '140px' }}>
        Назад
      </Button>
      <Button type="primary" htmlType="submit" style={{ width: '140px' }}>
        Продолжить
      </Button>
    </Form>
  );
};

export default SecondStep;
