import React, { useState } from "react";
import { Button, Descriptions, Divider, Form, Modal, Input, Select } from "antd";
import { refreshAccessToken } from "../../../../components/utils/refreshToken";
import { API_URL } from "../../../../components/utils/config";
import axios from "axios";

const { Option } = Select;

const GeneralState = ({ recordData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(recordData);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateData = async () => {
    try {
      await refreshAccessToken();
      await axios.patch(`${API_URL}/api/v1/records/${recordData.id}/`, formData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
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
        <Divider orientation="left">Общее состояние</Divider>
        <Button onClick={showModal}>Редактировать</Button>
      </div>
      <Descriptions bordered>
        <Descriptions.Item label="Дата поступления">{recordData.date_of_admission}</Descriptions.Item>
        <Descriptions.Item label="Прибывает">{recordData.arrives}</Descriptions.Item>
        <Descriptions.Item label="Тип крови">{recordData.blood_type}</Descriptions.Item>
        <Descriptions.Item label="Общее состояние">{recordData.conditions}</Descriptions.Item>
        <Descriptions.Item label="Жалобы">{recordData.complaints}</Descriptions.Item>
        <Descriptions.Item label="Отдел">{recordData.departament}</Descriptions.Item>
        <Descriptions.Item label="Сопровождение">{recordData.escorts}</Descriptions.Item>
        <Descriptions.Item label="Количество дней">{recordData.number_of_days}</Descriptions.Item>
        <Descriptions.Item label="Цена">{recordData.price}</Descriptions.Item>
        <Descriptions.Item label="Дата выписки">{recordData.date_of_discharge}</Descriptions.Item>
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
          <Form.Item label="Дата поступления">
            <Input value={formData.date_of_admission} onChange={(e) => handleInputChange("date_of_admission", e.target.value)} />
          </Form.Item>
          <Form.Item label="Прибывает">
            <Input value={formData.arrives} onChange={(e) => handleInputChange("arrives", e.target.value)} />
          </Form.Item>
          <Form.Item label="Тип крови">
            <Input value={formData.blood_type} onChange={(e) => handleInputChange("blood_type", e.target.value)} />
          </Form.Item>
          <Form.Item label="Общее состояние">
            <Input value={formData.conditions} onChange={(e) => handleInputChange("conditions", e.target.value)} />
          </Form.Item>
          <Form.Item label="Жалобы">
            <Input value={formData.complaints} onChange={(e) => handleInputChange("complaints", e.target.value)} />
          </Form.Item>
          <Form.Item label="Отдел">
            <Input value={formData.departament} onChange={(e) => handleInputChange("departament", e.target.value)} />
          </Form.Item>
          <Form.Item label="Сопровождение">
            <Input value={formData.escorts} onChange={(e) => handleInputChange("escorts", e.target.value)} />
          </Form.Item>
          <Form.Item label="Количество дней">
            <Input value={formData.number_of_days} onChange={(e) => handleInputChange("number_of_days", e.target.value)} />
          </Form.Item>
          <Form.Item label="Цена">
            <Input value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} />
          </Form.Item>
          <Form.Item label="Дата выписки">
            <Input value={formData.date_of_discharge} onChange={(e) => handleInputChange("date_of_discharge", e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GeneralState;
