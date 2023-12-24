import React, { useEffect, useState } from "react";
import {
  Button,
  Descriptions,
  Divider,
  Form,
  Modal,
  Input,
  Select,
} from "antd";
import { refreshAccessToken } from "../../../../components/utils/refreshToken";
import { API_URL } from "../../../../components/utils/config";
import axios from "axios";
import FormItem from "antd/es/form/FormItem";

const { Option } = Select;

const fieldDescriptions = {
  date_of_admission: "Дата поступления",
  arrives: "Прибывает",
  blood_type: "Тип крови",
  conditions: "Общее состояние",
  complaints: "Жалобы",
  departament: "Отдел",
  escorts: "Сопровождение",
  number_of_days: "Количество дней",
  price: "Цена",
  date_of_discharge: "Дата выписки",
};

const GeneralState = ({ recordData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(recordData);
  const [updatedGeneralState, setupdatedGeneralState] = useState(null);

  useEffect(() => {
    setFormData(recordData);
    setupdatedGeneralState(recordData);
  }, [recordData]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateData = async () => {
    try {
      await refreshAccessToken();
      await axios.patch(`${API_URL}/api/v1/records/${formData.id}/`, formData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setupdatedGeneralState(formData);
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
        <Descriptions.Item label="Дата поступления">
          {recordData.date_of_admission}
        </Descriptions.Item>
        <Descriptions.Item label="Прибывает">
          {recordData.arrives}
        </Descriptions.Item>
        <Descriptions.Item label="Тип крови">
          {recordData.blood_type}
        </Descriptions.Item>
        <Descriptions.Item label="Общее состояние">
          {recordData.conditions}
        </Descriptions.Item>
        <Descriptions.Item label="Жалобы">
          {recordData.complaints}
        </Descriptions.Item>
        <Descriptions.Item label="Отдел">
          {recordData.departament}
        </Descriptions.Item>
        <Descriptions.Item label="Сопровождение">
          {recordData.escorts}
        </Descriptions.Item>
        <Descriptions.Item label="Количество дней">
          {recordData.number_of_days}
        </Descriptions.Item>
        <Descriptions.Item label="Цена">{recordData.price}</Descriptions.Item>
        <Descriptions.Item label="Дата выписки">
          {recordData.date_of_discharge}
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
          {Object.entries(formData).map(
            ([key, value]) =>
              key !== "id" && (
                <Form.Item key={key} label={fieldDescriptions[key]}>
                  <Input
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                </Form.Item>
              )
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default GeneralState;
