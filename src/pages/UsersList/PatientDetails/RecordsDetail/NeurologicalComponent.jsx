// NeurologicalComponent.jsx
import React, { useState } from "react";
import { Button, Descriptions, Divider, Form, Input, Modal } from "antd";
import { refreshAccessToken } from "../../../../components/utils/refreshToken";
import axios from "axios";
import { API_URL } from "../../../../components/utils/config";

const NeurologicalComponent = ({ neurologicalData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(neurologicalData);

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
        `${API_URL}/api/v1/records/${neurologicalData.id}/`,
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
      console.error("Ошибка при обновлении данных:", error);
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
        <Divider orientation="left">Неврологическое состояние</Divider>
        <Button onClick={showModal}>Редактировать</Button>
      </div>
      <Descriptions bordered>
        <Descriptions.Item label="Дизартрия">
          {neurologicalData.dysarthria}
        </Descriptions.Item>
        <Descriptions.Item label="Признаки менингеального раздражения">
          {neurologicalData.meningeal_signs}
        </Descriptions.Item>
        <Descriptions.Item label="Реакция на свет">
          {neurologicalData.photo_reaction}
        </Descriptions.Item>
        <Descriptions.Item label="Движения глазных яблок">
          {neurologicalData.pupils}
        </Descriptions.Item>
        <Descriptions.Item label="Судороги">
          {neurologicalData.seizures}
        </Descriptions.Item>
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
          <Form.Item label="Дизартрия">
            <Input
              value={formData.dysarthria}
              onChange={(e) => handleInputChange("dysarthria", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Признаки менингеального раздражения">
            <Input
              value={formData.meningeal_signs}
              onChange={(e) =>
                handleInputChange("meningeal_signs", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Реакция на свет">
            <Input
              value={formData.photo_reaction}
              onChange={(e) =>
                handleInputChange("photo_reaction", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Движения глазных яблок">
            <Input
              value={formData.pupils}
              onChange={(e) => handleInputChange("pupils", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Судороги">
            <Input
              value={formData.seizures}
              onChange={(e) => handleInputChange("seizures", e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NeurologicalComponent;
