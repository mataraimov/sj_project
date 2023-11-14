import React from 'react';
import { Card, Descriptions } from 'antd';

const Profile = () => {
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');
  const surname = localStorage.getItem('surname');
  const phone = localStorage.getItem('phone');

  return (
    <div>
      <Card title="Мой профиль">
        <Descriptions>
          <Descriptions.Item label="Роль">{role}</Descriptions.Item>
          <Descriptions.Item label="Имя">{name}</Descriptions.Item>
          <Descriptions.Item label="Фамилия">{surname}</Descriptions.Item>
          <Descriptions.Item label="Телефон">{phone}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Profile;
