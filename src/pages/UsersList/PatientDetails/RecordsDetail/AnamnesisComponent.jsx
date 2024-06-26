import { useEffect, useState } from 'react';
import { Descriptions, Divider, Button, Modal, Form, Input } from 'antd';
import { refreshAccessToken } from '../../../../components/utils/refreshToken';
import axios from 'axios';
import { API_URL } from '../../../../components/utils/config';

const fieldDescriptions = {
  addition: 'Добавление',
  binge_drinking: 'Потребление алкоголя',
  category: 'Контроль',
  daily_tolerance: 'Ежедневная переносимость',
  dose: 'Доза',
  duration_last_binge: 'Длительность последнего запоя',
  duration_last_remission: 'Длительность последнего обострения',
  last_alcohol_intake: 'Последний приём алкоголя',
  last_treatment: 'Последнее лечение',
  light_gaps: 'Легкие зазоры',
  mental_disorders: 'Ментальные расстройства',
  receiving_something: 'Последний приём алкоголя',
  somatic_disorders: 'Соматические расстройства',
  type_intoxication: 'Интоксикация',
  type_palimpsests: 'Палимпсесты',
  type_tolerance: 'Переносимость',
};

const AnamnesisComponent = ({ anamnesisData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(anamnesisData);
  const [updatedAnamnesisData, setUpdatedAnamnesisData] = useState(null);

  useEffect(() => {
    setFormData(anamnesisData);
    setUpdatedAnamnesisData(anamnesisData);
  }, [anamnesisData]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateData = async () => {
    try {
      await refreshAccessToken();

      await axios.patch(`${API_URL}/api/v1/records/${formData.id}/anamnesis/`, formData, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setUpdatedAnamnesisData(formData);

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
        <Divider orientation="left">Анамнез</Divider>
        <Button onClick={showModal}>Редактировать</Button>
      </div>
      <Descriptions bordered>
        {Object.entries(updatedAnamnesisData || {}).map(
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
                  <Input value={value} onChange={(e) => handleInputChange(key, e.target.value)} />
                </Form.Item>
              ),
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AnamnesisComponent;
