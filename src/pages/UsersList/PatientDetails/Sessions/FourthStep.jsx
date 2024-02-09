import React from 'react';
import { Form, Select, Input, Button } from 'antd';

const { Option } = Select;

const FourthStep = ({ form, statusOptions, nextStep, prevStep }) => {
  const onFinish = (values) => {
    // Передаем значения обратно в родительский компонент
    nextStep(values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 23 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      <h2>Неврологический статус</h2>
      <Form.Item
        name={['neurological', 'pupils']}
        label="Зрачки"
        rules={[{ required: true, message: 'Пожалуйста, выберите состояние зрачков' }]}
      >
        <Select placeholder="Выберите состояние зрачков">
          {statusOptions['pupils_list'] &&
            statusOptions['pupils_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['neurological', 'photo_reaction']}
        label="Фотореакция"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о фотореакции' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['neurological', 'meningeal_signs']}
        label="Менингеальные признаки"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['neurological', 'seizures']}
        label="Судороги"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о судорогах' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['neurological', 'dysarthria']}
        label="Дизартрия"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о дизартрии' }]}
      >
        <Input />
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

export default FourthStep;
