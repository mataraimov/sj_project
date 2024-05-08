import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
const { Option } = Select;

const ThirdStep = ({ form, statusOptions, nextStep, prevStep }) => {
  const [customAvailability, setCustomAvailability] = useState('');

  const onFinish = (values) => {
    // Преобразование массива в строку
    const availability = values.somatic.availability.join(', ');

    // Передаем значения обратно в родительский компонент
    nextStep({ ...values, somatic: { ...values.somatic, availability } });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 23 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
    >
      <h2>Соматический статус</h2>
      <Form.Item
        name={['somatic', 'condition']}
        label="Состояние"
        rules={[{ required: true, message: 'Пожалуйста, выберите состояние' }]}
      >
        <Select placeholder="состояние">
          {statusOptions['situation_list'] &&
            statusOptions['situation_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'category']}
        label="Телосложения"
        rules={[{ required: true, message: 'Пожалуйста, выберите телосложения' }]}
      >
        <Select placeholder="Телосложения">
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
        label="Кожные покровы"
        rules={[{ required: true, message: 'Пожалуйста, выберите кожные покровы' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'availability']}
        label="Телесное повреждение "
        rules={[{ required: true, message: 'Пожалуйста, выберите доступность' }]}
      >
        <Select
          placeholder="Доступность"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          mode="tags" // Включение режима тегов
          onChange={(value) => setCustomAvailability(value)} // Обработчик изменения выбранного значения
        >
          <Option key="Удовлетворительное">Удовлетворительное</Option>
          <Option key="Слабое">Слабое</Option>
          <Option key="Сильное">Сильное</Option>
          <Option key="Ритмичное">Ритмичное</Option>
          <Option key="Аритмичное">Аритмичное</Option>
          <Option key="Нитевидное">Нитевидное</Option>
          <Option key="Дефицит есть">Дефицит есть</Option>
          <Option key="Дефицита нет">Дефицита нет</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'traces']}
        label="Следы от инъекции"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о следах от инъекции' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'state_conjunctiva']}
        label="Состояние конъюнктивы"
        rules={[{ required: true, message: 'Пожалуйста, выберите состояние конъюнктивы' }]}
      >
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
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о дыхании' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'wheezing']}
        label="Хрипы"
        rules={[{ required: true, message: 'Пожалуйста, опишите хрипы' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'bh']}
        label="ЧД"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о ЧД' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'saturation']}
        label="Сатурация"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о сатурации' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'heart_tones']}
        label="Сердечные тоны"
        rules={[{ required: true, message: 'Пожалуйста, выберите сердечные тоны' }]}
      >
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
        rules={[{ required: true, message: 'Пожалуйста, введите информацию об АД' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'pulse_frequency']}
        label="Частота пульса"
        rules={[{ required: true, message: 'Пожалуйста, укажите частоту пульса' }]}
      >
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        name={['somatic', 'filling']}
        label="Наполнение пульса"
        rules={[{ required: true, message: 'Пожалуйста, выберите полноту' }]}
      >
        <Select placeholder="Наполнение пульса">
          {statusOptions['filling_list'] &&
            statusOptions['filling_list'].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={['somatic', 'tongue']}
        label="Язык"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о языке' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'stomach']}
        label="Живот"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о животе' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'liver']}
        label="Печень"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о печени' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'vomiting']}
        label="Рвота"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о рвоте' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'stool']}
        label="Стул"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о стуле' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'diuresis']}
        label="Диурез"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о диурезе' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'edema']}
        label="Отеки"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию об отеках' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'glucose']}
        label="Глюкоза"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о глюкозе' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'apparatus']}
        label="Костно-суставной аппарат"
        rules={[
          { required: true, message: 'Пожалуйста, введите информацию о Костно-суставной аппарат' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'vascular_system']}
        label="Сосудистая система"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о сосудистой системе' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['somatic', 'supplements']}
        label="Дополнения"
        rules={[{ required: true, message: 'Пожалуйста, введите информацию о Дополнениях' }]}
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

export default ThirdStep;
