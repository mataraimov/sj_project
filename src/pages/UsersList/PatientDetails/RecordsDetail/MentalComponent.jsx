import React, { useState } from "react";
import { Button, Descriptions, Divider, Form, Input, Modal } from "antd";
import { refreshAccessToken } from "../../../../components/utils/refreshToken";
import axios from "axios";
import { API_URL } from "../../../../components/utils/config";

const MentalComponent = ({ mentalData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(mentalData);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateData = async () => {
    try {
      await refreshAccessToken();
      await axios.patch(
        `${API_URL}/api/v1/records/${mentalData.id}/`,
        formData,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      handleCancel();
    } catch (error) {
      console.error("Ошибка при обновлении данных", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "1200px",
          alignItems: "center",
        }}
      >
        <Divider orientation="left">Психическое состояние</Divider>
        <Button onClick={showModal}>Редактировать</Button>
      </div>
      <Descriptions bordered>
        <Descriptions.Item label="Поведение">{mentalData.behavior}</Descriptions.Item>
        <Descriptions.Item label="Эмоциональный фон">{mentalData.emotional_background}</Descriptions.Item>
        <Descriptions.Item label="Причины употребления алкоголя">{mentalData.causes_of_alcohol}</Descriptions.Item>
        <Descriptions.Item label="Сознание">{mentalData.consciousness}</Descriptions.Item>
        <Descriptions.Item label="Ночной сон">{mentalData.night_sleep}</Descriptions.Item>
        <Descriptions.Item label="Ориентированность">{mentalData.orientation}</Descriptions.Item>
        <Descriptions.Item label="Расстройства восприятия">{mentalData.perception_disorders}</Descriptions.Item>
        <Descriptions.Item label="Цель госпитализации">{mentalData.purpose_of_hospitalization}</Descriptions.Item>
        <Descriptions.Item label="Запах алкоголя">{mentalData.smell_of_alcohol ? "Да" : "Нет"}</Descriptions.Item>
        <Descriptions.Item label="Попытка суицида">{mentalData.suicide_attempt}</Descriptions.Item>
        <Descriptions.Item label="Вид">{mentalData.view}</Descriptions.Item>
      </Descriptions>
      <Modal
        title="Редактировать данные"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" onClick={updateData}>
            Обновить
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Поведение">
            <Input value={formData.behavior} onChange={(e) => handleInputChange("behavior", e.target.value)} />
          </Form.Item>
          <Form.Item label="Эмоциональный фон">
            <Input value={formData.emotional_background} onChange={(e) => handleInputChange("emotional_background", e.target.value)} />
          </Form.Item>
          <Form.Item label="Причины употребления алкоголя">
            <Input value={formData.causes_of_alcohol} onChange={(e) => handleInputChange("causes_of_alcohol", e.target.value)} />
          </Form.Item>
          <Form.Item label="Сознание">
            <Input value={formData.consciousness} onChange={(e) => handleInputChange("consciousness", e.target.value)} />
          </Form.Item>
          <Form.Item label="Ночной сон">
            <Input value={formData.night_sleep} onChange={(e) => handleInputChange("night_sleep", e.target.value)} />
          </Form.Item>
          <Form.Item label="Ориентированность">
            <Input value={formData.orientation} onChange={(e) => handleInputChange("orientation", e.target.value)} />
          </Form.Item>
          <Form.Item label="Расстройства восприятия">
            <Input value={formData.perception_disorders} onChange={(e) => handleInputChange("perception_disorders", e.target.value)} />
          </Form.Item>
          <Form.Item label="Цель госпитализации">
            <Input value={formData.purpose_of_hospitalization} onChange={(e) => handleInputChange("purpose_of_hospitalization", e.target.value)} />
          </Form.Item>
          <Form.Item label="Запах алкоголя">
            <Input value={formData.smell_of_alcohol} onChange={(e) => handleInputChange("smell_of_alcohol", e.target.value)} />
          </Form.Item>
          <Form.Item label="Попытка суицида">
            <Input value={formData.suicide_attempt} onChange={(e) => handleInputChange("suicide_attempt", e.target.value)} />
          </Form.Item>
          <Form.Item label="Вид">
            <Input value={formData.view} onChange={(e) => handleInputChange("view", e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MentalComponent;
