import React from 'react';
import { Form, Select, Input, Button } from 'antd';

const { Option } = Select;

const FifthStep = ({ form, statusOptions, nextStep, prevStep }) => {
  const onFinish = (values) => {
    // Передаем значения обратно в родительский компонент
    nextStep(values);
  };
  const onFinishAndSubmit = (values) => {
    // Передаем значения для сохранения на последнем шаге
    nextStep(values);
    // Дополнительный код для сохранения на последнем шаге
    // Вызовите функцию для сохранения данных на сервере здесь
    // ...
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <h2>Ментальное состояние</h2>
      <Form.Item name={['mental', 'view']} label="Вид">
        <Select placeholder="Выберите вид">
          {statusOptions['views_list'] &&
            statusOptions['views_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
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
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={onFinishAndSubmit}>
          Сохранить
        </Button>
        <Button type="default" onClick={prevStep}>
          Назад
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FifthStep;