import { useEffect, useState } from 'react';
import { Button, Descriptions, Divider, Form, Input, Modal } from 'antd';
import { refreshAccessToken } from '../../../../components/utils/refreshToken';
import axios from 'axios';
import { API_URL } from '../../../../components/utils/config';

const fieldDescriptions = {
  behavior: 'Поведение',
  emotional_background: 'Эмоциональный фон',
  causes_of_alcohol: 'Причины употребления алкоголя',
  consciousness: 'Сознание',
  night_sleep: 'Ночной сон',
  orientation: 'Ориентированность',
  perception_disorders: 'Расстройства восприятия',
  purpose_of_hospitalization: 'Цель госпитализации',
  smell_of_alcohol: 'Запах алкоголя',
  suicide_attempt: 'Попытка суицида',
  view: 'Вид',
};

const MentalComponent = ({ mentalData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(mentalData);
  const [updatedMentalData, setUpdatedMentalData] = useState(null);

  useEffect(() => {
    setFormData(mentalData);
    setUpdatedMentalData(mentalData);
  }, [mentalData]); // Добавил зависимость для правильной работы useEffect

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
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setUpdatedMentalData(formData);
      handleCancel();
    } catch (error) {
      console.error('Ошибка при обновлении данных', error);
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
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '1200px',
          alignItems: 'center',
        }}
      >
        <Divider orientation="left">Психический статус</Divider>
        <Button onClick={showModal}>Редактировать</Button>
      </div>
      <Descriptions bordered>
        {Object.entries(updatedMentalData || {}).map(
          ([key, value]) =>
            key !== 'id' && (
              <Descriptions.Item key={key} label={fieldDescriptions[key]}>
                {value}
              </Descriptions.Item>
            ),
        )}
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
              key !== 'id' && (
                <Form.Item key={key} label={fieldDescriptions[key]}>
                  <Input
                    value={formData[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                </Form.Item>
              ),
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default MentalComponent;
