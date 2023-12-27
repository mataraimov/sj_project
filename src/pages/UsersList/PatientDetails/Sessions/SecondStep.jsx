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
      <Form.Item name={['anamnesis', 'receiving_something_time']} label="Последнее время приёма">
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
        label="Продолжительность последнего похмелья">
        <Input />
      </Form.Item>
      <Form.Item
        name={['anamnesis', 'duration_last_remission']}
        label="Продолжительность последней ремиссии">
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
      <Form.Item name={['anamnesis', 'type_tolerance']} label="Тип толерантности">
        <Select placeholder="Выберите тип толерантности">
          <Option value="Стабильный">Стабильный</Option>
          <Option value="Увеличивается">Увеличивается</Option>
          <Option value="Уменьшается">Уменьшается</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['anamnesis', 'type_palimpsests']} label="Тип палимпсестов">
        <Select placeholder="Выберите тип палимпсестов">
          <Option value="Есть">Есть</Option>
          <Option value="Нет">Нет</Option>
          <Option value="Тотальная амнезия есть">Тотальная амнезия есть</Option>
          <Option value="Тотальная амнезия нет">Тотальная амнезия нет</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['anamnesis', 'type_intoxication']} label="Тип отравления">
        <Select placeholder="Выберите тип отравления">
          <Option value="Эксплозивный">Эксплозивный</Option>
          <Option value="Дисфорический">Дисфорический</Option>
          <Option value="Истерический">Истерический</Option>
          <Option value="Импульсивный">Импульсивный</Option>
          <Option value="Депрессивный">Депрессивный</Option>
          <Option value="Маниакальный">Маниакальный</Option>
          <Option value="Сомнолентный">Сомнолентный</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['anamnesis', 'category']} label="Категории">
        <Select placeholder="Выберите категорию">
          <Option value="Количественный контроль">Количественный контроль</Option>
          <Option value="Ситуационный контроль">Ситуационный контроль</Option>
          <Option value="Утрачен контроль">Утрачен контроль</Option>
          <Option value="Контроль не утрачен">Контроль не утрачен</Option>
        </Select>
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

export default SecondStep;
