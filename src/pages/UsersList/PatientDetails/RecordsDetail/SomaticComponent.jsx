import React, { useState } from "react";
import { Button, Descriptions, Divider, Form, Input, Modal } from "antd";
import { refreshAccessToken } from "../../../../components/utils/refreshToken";
import axios from "axios";
import { API_URL } from "../../../../components/utils/config";

const SomaticComponent = ({ somaticData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(somaticData);

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
        `${API_URL}/api/v1/records/${somaticData.id}/`,
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
        <Divider orientation="left">Соматическое состояние</Divider>
        <Button onClick={showModal}>Редактировать</Button>
      </div>
      <Descriptions bordered>
        <Descriptions.Item label="Состояние">
          {somaticData.condition}
        </Descriptions.Item>
        <Descriptions.Item label="Сердечные тоны">
          {somaticData.heart_tones}
        </Descriptions.Item>
        <Descriptions.Item label="Артериальное давление">
          {somaticData.ad}
        </Descriptions.Item>
        <Descriptions.Item label="Наличие шрамов">
          {somaticData.availability}
        </Descriptions.Item>
        <Descriptions.Item label="Общее состояние">
          {somaticData.condition}
        </Descriptions.Item>
        <Descriptions.Item label="Диурез">
          {somaticData.diuresis}
        </Descriptions.Item>
        <Descriptions.Item label="Отёки">{somaticData.edema}</Descriptions.Item>
        <Descriptions.Item label="Заполнение">
          {somaticData.filling}
        </Descriptions.Item>
        <Descriptions.Item label="Глюкоза">
          {somaticData.glucose}
        </Descriptions.Item>
        <Descriptions.Item label="Сердечные тоны">
          {somaticData.heart_tones}
        </Descriptions.Item>
        <Descriptions.Item label="Печень">
          {somaticData.liver}
        </Descriptions.Item>
        <Descriptions.Item label="Частота пульса">
          {somaticData.pulse_frequency}
        </Descriptions.Item>
        <Descriptions.Item label="Сатурация">
          {somaticData.saturation}
        </Descriptions.Item>
        <Descriptions.Item label="Цвет кожи">
          {somaticData.skin_type}
        </Descriptions.Item>
        <Descriptions.Item label="Состояние конъюнктивы">
          {somaticData.state_conjunctiva}
        </Descriptions.Item>
        <Descriptions.Item label="Живот">
          {somaticData.stomach}
        </Descriptions.Item>
        <Descriptions.Item label="Стул">{somaticData.stool}</Descriptions.Item>
        <Descriptions.Item label="Приём добавок">
          {somaticData.supplements}
        </Descriptions.Item>
        <Descriptions.Item label="Язык">{somaticData.tongue}</Descriptions.Item>
        <Descriptions.Item label="Шрамы">
          {somaticData.traces}
        </Descriptions.Item>
        <Descriptions.Item label="Сосудистая система">
          {somaticData.vascular_system}
        </Descriptions.Item>
        <Descriptions.Item label="Рвота">
          {somaticData.vomiting}
        </Descriptions.Item>
        <Descriptions.Item label="Хрипы">
          {somaticData.wheezing}
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
          <Form.Item label="Состояние">
            <Input
              value={formData.condition}
              onChange={(e) => handleInputChange("condition", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Сердечные тоны">
            <Input
              value={formData.heart_tones}
              onChange={(e) => handleInputChange("heart_tones", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Артериальное давление">
            <Input
              value={formData.ad}
              onChange={(e) => handleInputChange("ad", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Наличие шрамов">
            <Input
              value={formData.availability}
              onChange={(e) =>
                handleInputChange("availability", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Общее состояние">
            <Input
              value={formData.condition}
              onChange={(e) => handleInputChange("condition", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Диурез">
            <Input
              value={formData.diuresis}
              onChange={(e) => handleInputChange("diuresis", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Отёки">
            <Input
              value={formData.edema}
              onChange={(e) => handleInputChange("edema", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Заполнение">
            <Input
              value={formData.filling}
              onChange={(e) => handleInputChange("filling", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Глюкоза">
            <Input
              value={formData.glucose}
              onChange={(e) => handleInputChange("glucose", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Сердечные тоны">
            <Input
              value={formData.heart_tones}
              onChange={(e) => handleInputChange("heart_tones", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Печень">
            <Input
              value={formData.liver}
              onChange={(e) => handleInputChange("liver", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Частота пульса">
            <Input
              value={formData.pulse_frequency}
              onChange={(e) =>
                handleInputChange("pulse_frequency", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Сатурация">
            <Input
              value={formData.saturation}
              onChange={(e) => handleInputChange("saturation", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Цвет кожи">
            <Input
              value={formData.skin_type}
              onChange={(e) => handleInputChange("skin_type", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Состояние конъюнктивы">
            <Input
              value={formData.state_conjunctiva}
              onChange={(e) =>
                handleInputChange("state_conjunctiva", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Живот">
            <Input
              value={formData.stomach}
              onChange={(e) => handleInputChange("stomach", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Стул">
            <Input
              value={formData.stool}
              onChange={(e) => handleInputChange("stool", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Приём добавок">
            <Input
              value={formData.supplements}
              onChange={(e) => handleInputChange("supplements", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Язык">
            <Input
              value={formData.tongue}
              onChange={(e) => handleInputChange("tongue", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Шрамы">
            <Input
              value={formData.traces}
              onChange={(e) => handleInputChange("traces", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Сосудистая система">
            <Input
              value={formData.vascular_system}
              onChange={(e) =>
                handleInputChange("vascular_system", e.target.value)
              }
            />
          </Form.Item>
          <Form.Item label="Рвота">
            <Input
              value={formData.vomiting}
              onChange={(e) => handleInputChange("vomiting", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Хрипы">
            <Input
              value={formData.wheezing}
              onChange={(e) => handleInputChange("wheezing", e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SomaticComponent;
