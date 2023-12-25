import React from "react";
import { Form, Select, Input, Button, Checkbox } from "antd";

const { Option } = Select;

const FifthStep = ({ form, statusOptions, nextStep, prevStep, handleOk }) => {
  const onFinishAndSubmit = async () => {
    try {
      await form.validateFields();
      const values = await form.getFieldsValue();
      nextStep(values);
      // handleOk();
    } catch (errorInfo) {
      console.log("Ошибка при сохранении:", errorInfo);
    }
  };

  return (
    <Form form={form} onFinish={onFinishAndSubmit}>
      <h2>Ментальное состояние</h2>
      <Form.Item name={["mental", "view"]} label="Вид">
        <Select placeholder="Выберите вид">
          {statusOptions["views_list"] &&
            statusOptions["views_list"].map((option, index) => (
              <Option key={index} value={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={["mental", "smell_of_alcohol"]}
        label="Запах алкоголя"
        valuePropName="checked"
        initialValue={false} // Установите начальное значение чекбокса
      >
        <Checkbox />
      </Form.Item>
      <Form.Item name={["mental", "behavior"]} label="Поведение">
        <Input />
      </Form.Item>
      <Form.Item name={["mental", "consciousness"]} label="Сознание">
        <Input />
      </Form.Item>
      <Form.Item name={["mental", "orientation"]} label="Ориентированность">
        <Input />
      </Form.Item>
      <Form.Item
        name={["mental", "perception_disorders"]}
        label="Расстройства восприятия"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["mental", "emotional_background"]}
        label="Эмоциональный фон"
      >
        <Input />
      </Form.Item>
      <Form.Item name={["mental", "night_sleep"]} label="Ночной сон">
        <Input />
      </Form.Item>
      <Form.Item name={["mental", "suicide_attempt"]} label="Попытка суицида">
        <Input />
      </Form.Item>
      <Form.Item
        name={["mental", "causes_of_alcohol"]}
        label="Причины употребления алкоголя"
      >
        <Input />
      </Form.Item>
      <Form.Item name={["mental", "purpose_of_hospitalization"]} label="зации">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
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
