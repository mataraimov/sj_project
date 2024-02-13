import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Divider, Form, Input, Modal } from 'antd';
import { refreshAccessToken } from '../../../../components/utils/refreshToken';
import axios from 'axios';
import { API_URL } from '../../../../components/utils/config';

const fieldDescriptions = {
  ad: 'Артериальное давление',
  apparatus: 'Аппарат',
  availability: 'Наличие шрамов',
  bh: 'ЧД',
  breath: 'Дыхание',
  category: 'Контроль',
  condition: 'Состояние',
  diuresis: 'Диурез',
  edema: 'Отёки',
  filling: 'Заполнение',
  glucose: 'Глюкоза',
  heart_tones: 'Сердечные тоны',
  id: 'ID',
  liver: 'Печень',
  pulse_frequency: 'Частота пульса',
  saturation: 'Сатурация',
  skin_type: 'Цвет кожи',
  state_conjunctiva: 'Состояние конъюнктивы',
  stomach: 'Живот',
  stool: 'Стул',
  supplements: 'Приём добавок',
  tongue: 'Язык',
  traces: 'Следы от инъекции',
  vascular_system: 'Сосудистая система',
  vomiting: 'Рвота',
  wheezing: 'Хрипы',
};

const SomaticComponent = ({ somaticData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(somaticData);
  const [updatedSomaticData, setUpdatedSomaticData] = useState(null);

  useEffect(() => {
    setFormData(somaticData);
    setUpdatedSomaticData(somaticData);
  }, [somaticData]);

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
      setUpdatedSomaticData(formData);
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
        <Divider orientation="left">Соматический статус</Divider>
        <Button onClick={showModal}>Редактировать</Button>
      </div>
      <Descriptions bordered>
        {Object.entries(updatedSomaticData || {}).map(
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

export default SomaticComponent;
