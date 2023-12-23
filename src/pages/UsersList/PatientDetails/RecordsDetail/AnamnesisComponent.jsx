import React, { useState } from 'react';
import { Descriptions, Tag, Divider, Button, Modal, Form, Input } from 'antd';
import { refreshAccessToken } from '../../../../components/utils/refreshToken';
import axios from 'axios';
import { API_URL } from '../../../../components/utils/config';

const AnamnesisComponent = ({ anamnesisData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(anamnesisData);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updateData = async () => {
    try {
      await refreshAccessToken();
      await axios.patch(`${API_URL}/api/v1/records/${anamnesisData.id}/`, formData, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
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
        <Descriptions.Item label="Добавление">{anamnesisData.addition}</Descriptions.Item>
        <Descriptions.Item label="Потребление алкоголя">
          {anamnesisData.binge_drinking}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Категория">
          {anamnesisData.category.map((item) => (
            <Tag key={item.id}>{item.title}</Tag>
          ))}
        </Descriptions.Item> */}
        <Descriptions.Item label="Ежедневная переносимость">
          {anamnesisData.daily_tolerance}
        </Descriptions.Item>
        <Descriptions.Item label="Доза">{anamnesisData.dose}</Descriptions.Item>
        <Descriptions.Item label="Длительность последнего запоя">
          {anamnesisData.duration_last_binge}
        </Descriptions.Item>
        <Descriptions.Item label="Длительность последнего обострения">
          {anamnesisData.duration_last_remission}
        </Descriptions.Item>
        <Descriptions.Item label="Последний приём алкоголя">
          {anamnesisData.last_alcohol_intake}
        </Descriptions.Item>
        <Descriptions.Item label="Последнее лечение">
          {anamnesisData.last_treatment}
        </Descriptions.Item>
        <Descriptions.Item label="Легкие зазоры">{anamnesisData.light_gaps}</Descriptions.Item>
        <Descriptions.Item label="Ментальные расстройства">
          {anamnesisData.mental_disorders}
        </Descriptions.Item>
        <Descriptions.Item label="Принимает что-то">
          {anamnesisData.receiving_something}
        </Descriptions.Item>
        <Descriptions.Item label="Время приёма">
          {anamnesisData.receiving_something_time}
        </Descriptions.Item>
        <Descriptions.Item label="Соматические расстройства">
          {anamnesisData.somatic_disorders}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Тип интоксикации">
          {anamnesisData.type_intoxication.map((item) => (
            <Tag key={item.id}>{item.title}</Tag>
          ))}
        </Descriptions.Item> */}
        {/* <Descriptions.Item label="Тип палимпсестов">
          {anamnesisData.type_palimpsests.map((item) => (
            <Tag key={item.id}>{item.title}</Tag>
          ))}
        </Descriptions.Item> */}
        {/* <Descriptions.Item label="Тип переносимости">
          {anamnesisData.type_tolerance.map((item) => (
            <Tag key={item.id}>{item.title}</Tag>
          ))}
        </Descriptions.Item> */}
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
          <Form.Item label="Добавление">
            <Input
              value={formData.addition}
              onChange={(e) => handleInputChange('addition', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Потребление алкоголя">
            <Input
              value={formData.binge_drinking}
              onChange={(e) => handleInputChange('binge_drinking', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Категория">
            {/* <Input
              value={formData.category.map((item) => item.title).join(", ")}
              onChange={(e) =>
                handleInputChange("category", e.target.value.split(", "))
              }
            /> */}
          </Form.Item>
          <Form.Item label="Ежедневная переносимость">
            <Input
              value={formData.daily_tolerance}
              onChange={(e) => handleInputChange('daily_tolerance', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Доза">
            <Input
              value={formData.dose}
              onChange={(e) => handleInputChange('dose', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Длительность последнего запоя">
            <Input
              value={formData.duration_last_binge}
              onChange={(e) => handleInputChange('duration_last_binge', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Длительность последнего обострения">
            <Input
              value={formData.duration_last_remission}
              onChange={(e) => handleInputChange('duration_last_remission', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Последний приём алкоголя">
            <Input
              value={formData.last_alcohol_intake}
              onChange={(e) => handleInputChange('last_alcohol_intake', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Последнее лечение">
            <Input
              value={formData.last_treatment}
              onChange={(e) => handleInputChange('last_treatment', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Легкие зазоры">
            <Input
              value={formData.light_gaps}
              onChange={(e) => handleInputChange('light_gaps', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Ментальные расстройства">
            <Input
              value={formData.mental_disorders}
              onChange={(e) => handleInputChange('mental_disorders', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Принимает что-то">
            <Input
              value={formData.receiving_something}
              onChange={(e) => handleInputChange('receiving_something', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Время приёма">
            <Input
              value={formData.receiving_something_time}
              onChange={(e) => handleInputChange('receiving_something_time', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Соматические расстройства">
            <Input
              value={formData.somatic_disorders}
              onChange={(e) => handleInputChange('somatic_disorders', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Тип интоксикации">
            <Input
              value={formData.type_intoxication}
              onChange={(e) => handleInputChange('type_intoxication', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Тип палимпсестов">
            <Input
              value={formData.type_palimpsests}
              onChange={(e) => handleInputChange('type_palimpsests', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Тип переносимости">
            <Input
              value={formData.type_tolerance}
              onChange={(e) => handleInputChange('type_tolerance', e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AnamnesisComponent;
