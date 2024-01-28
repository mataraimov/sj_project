import React from 'react';
import { Form, Select, Input, Button, Checkbox } from 'antd';

const { Option } = Select;

const FifthStep = ({ form, statusOptions, nextStep, prevStep, handleOk }) => {
  const onFinishAndSubmit = async () => {
    try {
      await form.validateFields();
      const values = await form.getFieldsValue();
      nextStep(values);
      // handleOk();
    } catch (errorInfo) {
      console.log('Ошибка при сохранении:', errorInfo);
    }
  };

  return (
    <Form form={form} onFinish={onFinishAndSubmit} labelCol={{ span: 7 }} wrapperCol={{ span: 23 }}  style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
      <h2>Ментальное состояние</h2>
      <Form.Item
        name={['mental', 'view']}
        label="Вид"
        rules={[{ required: true, message: 'Пожалуйста, выберите вид' }]}>
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
        initialValue={false}
        rules={[
          { required: true, message: 'Пожалуйста, укажите наличие/отсутствие запаха алкоголя' },
        ]}>
        <Checkbox />
      </Form.Item>
      <Form.Item
        name={['mental', 'behavior']}
        label="Поведение"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о поведении' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['mental', 'consciousness']}
        label="Сознание"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о состоянии сознания' },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['mental', 'orientation']}
        label="Ориентированность"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию об ориентированности' },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['mental', 'perception_disorders']}
        label="Расстройства восприятия"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о расстройствах восприятия' },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['mental', 'emotional_background']}
        label="Эмоциональный фон"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию об эмоциональном фоне' },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['mental', 'night_sleep']}
        label="Ночной сон"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о ночном сне' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['mental', 'suicide_attempt']}
        label="Попытка суицида"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о попытке суицида' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['mental', 'causes_of_alcohol']}
        label="Причины употребления алкоголя"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите информацию о причинах употребления алкоголя',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['mental', 'purpose_of_hospitalization']}
        label="Цель госпитализации"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о цели госпитализации' },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit" style={{width: '140px'}}>
          Сохранить
        </Button>
        <Button type="default" onClick={prevStep} style={{width: '140px'}}>
          Назад
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FifthStep;
