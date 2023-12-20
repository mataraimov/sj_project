import React from 'react';
import { Form, Select, Input, Button } from 'antd';

const { Option } = Select;

const FourthStep = ({ form, statusOptions, nextStep, prevStep }) => {
  const onFinish = (values) => {
    // Передаем значения обратно в родительский компонент
    nextStep(values);
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <h2>Неврологическое состояние</h2>
      <Form.Item name={['neurological', 'pupils']} label="Зрачки">
        <Select placeholder="Выберите состояние зрачков">
          <Option value="normal">Нормальное</Option>
          <Option value="dilated">Расширенные</Option>
          <Option value="constricted">Суженные</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['neurological', 'photo_reaction']} label="Фотореакция">
        <Input />
      </Form.Item>
      <Form.Item name={['neurological', 'meningeal_signs']} label="Менингеальные признаки">
        <Select placeholder="Выберите менингеальные признаки">
          <Option value="absent">Отсутствуют</Option>
          <Option value="present">Присутствуют</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['neurological', 'seizures']} label="Судороги">
        <Input />
      </Form.Item>
      <Form.Item name={['neurological', 'dysarthria']} label="Дизартрия">
        <Input />
      </Form.Item>

      <Button key="back" onClick={prevStep}>
        Назад
      </Button>
      <Button type="primary" htmlType="submit">
        Продолжить
      </Button>
    </Form>
  );
};

export default FourthStep;
