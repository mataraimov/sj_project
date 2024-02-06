import React, { useEffect, useState } from 'react';
import { Descriptions, Divider, Button, Modal, Form, Input, DatePicker } from 'antd';
import { refreshAccessToken } from '../../../../components/utils/refreshToken';
import axios from 'axios';
import { API_URL } from '../../../../components/utils/config';
import moment from 'moment';

const fieldDescriptions = {
  date_of_admission: 'Дата поступления',
  price: 'Цена',
};

const GeneralState = ({ recordData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    date_of_discharge: moment(recordData.date_of_discharge).format('YYYY-MM-DD'),
    price: recordData.price,
  });
  const [updatedData, setUpdatedData] = useState(null);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateData = async () => {
    try {
      await refreshAccessToken();

      const response = await axios.patch(
        `${API_URL}/api/v1/records/${recordData.id}/`,
        {
          date_of_discharge: formData.date_of_discharge,
          price: formData.price,
        },
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setUpdatedData(response.data);
      handleCancel();
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date_of_discharge: moment(date).format('YYYY-MM-DD'),
    }));
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
        }}>
        <Divider orientation="left">Общее состояние</Divider>
        <Button onClick={showModal}>Редактировать</Button>
      </div>
      <Descriptions bordered>
        <Descriptions.Item label="Дата поступления">
          {moment(updatedData?.date_of_admission || recordData.date_of_admission).format(
            'YYYY-MM-DD',
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Прибывает">{recordData.arrives}</Descriptions.Item>
        <Descriptions.Item label="Тип крови">{recordData.blood_type}</Descriptions.Item>
        <Descriptions.Item label="Общее состояние">{recordData.conditions}</Descriptions.Item>
        <Descriptions.Item label="Жалобы">{recordData.complaints}</Descriptions.Item>
        <Descriptions.Item label="Отдел">{recordData.departament}</Descriptions.Item>
        <Descriptions.Item label="Сопровождение">{recordData.escorts}</Descriptions.Item>
        <Descriptions.Item label="Количество дней">{recordData.number_of_days}</Descriptions.Item>
        <Descriptions.Item label="Цена">{updatedData?.price || recordData.price}</Descriptions.Item>
        <Descriptions.Item label="Дата выписки">
          {moment(updatedData?.date_of_discharge || recordData.date_of_discharge).format(
            'YYYY-MM-DD',
          )}
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
        ]}>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 23 }}>
          <Form.Item
            name={['date_of_discharge']}
            label="Дата выписки"
            rules={[{ required: true, message: 'Пожалуйста, укажите дату выписки' }]}>
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={(current) => {
                return current && current < moment().startOf('day');
              }}
              onChange={(date, dateString) => handleDateChange(dateString)}
            />
          </Form.Item>
          <Form.Item label={fieldDescriptions.price}>
            <Input
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GeneralState;
