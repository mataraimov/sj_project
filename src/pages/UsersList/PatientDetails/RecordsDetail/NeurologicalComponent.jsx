// NeurologicalComponent.jsx
import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Divider, Form, Input, Modal } from 'antd';
import { refreshAccessToken } from '../../../../components/utils/refreshToken';
import axios from 'axios';
import { API_URL } from '../../../../components/utils/config';

const filedDescription = {
  dysarthria: 'Дизартрия',
  meningeal_signs: 'Признаки менингеального раздражения',
  photo_reaction: 'Реакция на свет',
  pupils: 'Движения глазных яблок',
  seizures: 'Судороги',
};

const NeurologicalComponent = ({ neurologicalData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(neurologicalData);
  const [updatedNeurologicalData, setUpdatedNeurologicalData] = useState(null);

  useEffect(() => {
    setFormData(neurologicalData);
    setUpdatedNeurologicalData(neurologicalData);
  }, [neurologicalData]);

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
      setUpdatedNeurologicalData(formData);
      handleCancel();
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
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
        <Divider orientation="left">Неврологический статус</Divider>
        <Button onClick={showModal}>Редактировать</Button>
      </div>
      <Descriptions bordered>
        {Object.entries(updatedNeurologicalData || {}).map(
          ([key, value]) =>
            key !== 'id' && (
              <Descriptions.Item key={key} label={filedDescription[key]}>
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
                <Form.Item key={key} label={filedDescription[key]}>
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

export default NeurologicalComponent;
