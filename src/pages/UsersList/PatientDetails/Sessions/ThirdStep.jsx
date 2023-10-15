import React from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
const { Option } = Select;
const ThirdStep = ({ form, statusOptions, nextStep, prevStep }) => {
  const onFinish = (values) => {
    // Передаем значения обратно в родительский компонент
    nextStep(values);
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <h2>Соматическое состояние</h2>
      <Form.Item name={['somatic', 'condition']} label="Состояние">
        <Select placeholder="состояние">
          {statusOptions['conditions_list'] &&
            statusOptions['conditions_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'category']} label="Категория">
        <Select placeholder="состояние">
          {statusOptions['category_list'] &&
            statusOptions['category_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'skin_type']} label="Тип кожи">
        <Select placeholder="Тип кожи">
          {statusOptions['skin_list'] &&
            statusOptions['skin_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'availability']} label="Доступность">
        <Select placeholder="Доступность">
          {statusOptions['availability_list'] &&
            statusOptions['availability_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'traces']} label="Следы">
        <Select placeholder="Следы">
          {statusOptions['traces_list'] &&
            statusOptions['traces_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'state_conjunctiva']} label="Состояние конъюнктивы">
        <Select placeholder="Выберите состояние конъюнктивы">
          {statusOptions['conjunctiva_list'] &&
            statusOptions['conjunctiva_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'breath']} label="Дыхание">
        <Input />
      </Form.Item>
      <Form.Item name={['somatic', 'wheezing']} label="Свист">
        <Select placeholder="Свист">
          {statusOptions['wheezing_list'] &&
            statusOptions['wheezing_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'bh']} label="BH">
        <Input />
      </Form.Item>
      <Form.Item name={['somatic', 'saturation']} label="Сатурация">
        <Input />
      </Form.Item>
      <Form.Item name={['somatic', 'heart_tones']} label="Сердечные тоны">
        <Select placeholder="Сердечные тоны">
          {statusOptions['heart_list'] &&
            statusOptions['heart_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'ad']} label="АД">
        <Input />
      </Form.Item>
      <Form.Item name={['somatic', 'pulse_frequency']} label="Частота пульса">
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item name={['somatic', 'filling']} label="Полнота">
        <Select placeholder="Полнота">
          {statusOptions['nutrition_list'] &&
            statusOptions['nutrition_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
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
      <Button type="primary" htmlType="submit">
        Next
      </Button>
    </Form>
  );
};

export default ThirdStep;
