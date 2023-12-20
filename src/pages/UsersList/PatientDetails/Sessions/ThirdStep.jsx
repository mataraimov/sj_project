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
        <Select placeholder="Состояние">
          <Option value="normal">Нормальное</Option>
          <Option value="acute_pain">Острая боль</Option>
          <Option value="chronic_pain">Хроническая боль</Option>
          <Option value="inflammation">Воспаление</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'category']} label="Категория">
        <Select placeholder="Категория">
          <Option value="mild">Легкое</Option>
          <Option value="moderate">Средней тяжести</Option>
          <Option value="severe">Тяжелое</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'skin_type']} label="Тип кожи">
        <Select placeholder="Тип кожи">
          <Option value="dry">Сухая</Option>
          <Option value="oily">Жирная</Option>
          <Option value="normal">Нормальная</Option>
          <Option value="combination">Комбинированная</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'availability']} label="Доступность">
        <Select placeholder="Доступность">
          <Option value="available">Доступно</Option>
          <Option value="not_available">Не доступно</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'traces']} label="Следы">
        <Select placeholder="Следы">
          <Option value="present">Присутствуют</Option>
          <Option value="not_present">Не присутствуют</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'state_conjunctiva']} label="Состояние конъюнктивы">
        <Select placeholder="Выберите состояние конъюнктивы">
          <Option value="healthy">Здоровое</Option>
          <Option value="inflamed">Воспаленное</Option>
          <Option value="irritated">Раздраженное</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['somatic', 'breath']} label="Дыхание">
        <Input />
      </Form.Item>
      <Form.Item name={['somatic', 'wheezing']} label="Свист">
        <Select placeholder="Свист">
          <Option value="present">Присутствует</Option>
          <Option value="absent">Отсутствует</Option>
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
          <Option value="regular">Регулярные</Option>
          <Option value="irregular">Нерегулярные</Option>
          <Option value="murmur">Шумные</Option>
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
          <Option value="good">Хорошая</Option>
          <Option value="average">Средняя</Option>
          <Option value="poor">Плохая</Option>
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
      <Button key="back" onClick={prevStep}>
        Назад
      </Button>
      ,
      <Button type="primary" htmlType="submit">
        Продолжить
      </Button>
    </Form>
  );
};

export default ThirdStep;
