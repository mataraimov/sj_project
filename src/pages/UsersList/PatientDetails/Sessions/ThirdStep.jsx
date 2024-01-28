import React from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
const { Option } = Select;

const ThirdStep = ({ form, statusOptions, nextStep, prevStep }) => {
  const onFinish = (values) => {
    // Передаем значения обратно в родительский компонент
    nextStep(values);
  };

  return (
    <Form form={form} onFinish={onFinish} labelCol={{ span: 7 }} wrapperCol={{ span: 23 }}  style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
      <h2>Соматическое состояние</h2>
      <Form.Item
        name={['somatic', 'condition']}
        label="Состояние"
        rules={[{ required: true, message: 'Пожалуйста, выберите состояние' }]}>
        <Select placeholder="состояние">
          {statusOptions['conditions_list'] &&
            statusOptions['conditions_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'category']}
        label="Тип категории"
        rules={[{ required: true, message: 'Пожалуйста, выберите тип категории' }]}>
        <Select placeholder="Тип категории">
          {statusOptions['nutrition_list'] &&
            statusOptions['nutrition_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'skin_type']}
        label="Тип кожи"
        rules={[{ required: true, message: 'Пожалуйста, выберите тип кожи' }]}>
        <Select placeholder="Тип кожи">
          {statusOptions['skin_list'] &&
            statusOptions['skin_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'availability']}
        label="Доступность"
        rules={[{ required: true, message: 'Пожалуйста, выберите доступность' }]}>
        <Select placeholder="Доступность">
          {statusOptions['availability_list'] &&
            statusOptions['availability_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'traces']}
        label="Следы"
        rules={[{ required: true, message: 'Пожалуйста, выберите следы' }]}>
        <Select placeholder="Следы">
          {statusOptions['traces_list'] &&
            statusOptions['traces_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'state_conjunctiva']}
        label="Состояние конъюнктивы"
        rules={[{ required: true, message: 'Пожалуйста, выберите состояние конъюнктивы' }]}>
        <Select placeholder="Выберите состояние конъюнктивы">
          {statusOptions['conjunctiva_list'] &&
            statusOptions['conjunctiva_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'breath']}
        label="Дыхание"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о дыхании' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'wheezing']}
        label="Свист"
        rules={[{ required: true, message: 'Пожалуйста, выберите свист' }]}>
        <Select placeholder="Свист">
          {statusOptions['wheezing_list'] &&
            statusOptions['wheezing_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'bh']}
        label="BH"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о BH' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'saturation']}
        label="Сатурация"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о сатурации' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'heart_tones']}
        label="Сердечные тоны"
        rules={[{ required: true, message: 'Пожалуйста, выберите сердечные тоны' }]}>
        <Select placeholder="Сердечные тоны">
          {statusOptions['heart_list'] &&
            statusOptions['heart_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'ad']}
        label="АД"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию об АД' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'pulse_frequency']}
        label="Частота пульса"
        rules={[{ required: true, message: 'Пожалуйста, укажите частоту пульса' }]}>
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        name={['somatic', 'filling']}
        label="Полнота"
        rules={[{ required: true, message: 'Пожалуйста, выберите полноту' }]}>
        <Select placeholder="Полнота">
          {statusOptions['nutrition_list'] &&
            statusOptions['nutrition_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'tongue']}
        label="Язык"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о языке' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'stomach']}
        label="Живот"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о животе' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'liver']}
        label="Печень"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о печени' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'vomiting']}
        label="Рвота"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о рвоте' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'stool']}
        label="Стул"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о стуле' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'diuresis']}
        label="Диурез"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о диурезе' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'edema']}
        label="Отеки"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию об отеках' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'glucose']}
        label="Глюкоза"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о глюкозе' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'apparatus']}
        label="Приборы"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о приборах' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'vascular_system']}
        label="Сосудистая система"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о сосудистой системе' },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'supplements']}
        label="Добавки"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о добавках' }]}>
        <Input />
      </Form.Item>
      <Button key="back" onClick={prevStep} style={{width: '140px'}}>
        Назад
      </Button>
      <Button type="primary" htmlType="submit" style={{width: '140px'}}>
        Продолжить
      </Button>
    </Form>
  );
};

export default ThirdStep;
