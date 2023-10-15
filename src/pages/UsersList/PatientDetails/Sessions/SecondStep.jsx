import React from 'react';
import { Form, DatePicker, Input, InputNumber, Select, Button } from 'antd';
const { Option } = Select;
const SecondStep = ({ form, statusOptions, nextStep, prevStep }) => {
  const onFinish = (values) => {
    // Передаем значения обратно в родительский компонент
    nextStep(values);
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <h2>Анамнез жизни</h2>
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
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={['anamnesis', 'type_tolerance']} label="Тип толерантности">
        <Select placeholder="Выберите тип толерантности">
          {statusOptions['tolerance_list'] &&
            statusOptions['tolerance_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={['anamnesis', 'type_intoxication']} label="Тип отравления">
        <Select placeholder="Выберите тип отравления">
          {statusOptions['intoxication_list'] &&
            statusOptions['intoxication_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={['anamnesis', 'type_palimpsests']} label="Тип палимпсестов">
        <Select placeholder="Выберите тип палимпсестов">
          {statusOptions['palimpsests_list'] &&
            statusOptions['palimpsests_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Next
      </Button>
    </Form>
  );
};

export default SecondStep;
