// MentalComponent.jsx
import React from 'react';
import { Descriptions, Divider } from 'antd';

const MentalComponent = ({ mentalData }) => {
  return (
    <div>
      <Divider orientation="left">Психическое состояние</Divider>
      <Descriptions bordered>
        <Descriptions.Item label="Поведение">{mentalData.behavior}</Descriptions.Item>
        <Descriptions.Item label="Эмоциональный фон">
          {mentalData.emotional_background}
        </Descriptions.Item>
        <Descriptions.Item label="Причины употребления алкоголя">
          {mentalData.causes_of_alcohol}
        </Descriptions.Item>
        <Descriptions.Item label="Сознание">{mentalData.consciousness}</Descriptions.Item>
        <Descriptions.Item label="Ночной сон">{mentalData.night_sleep}</Descriptions.Item>
        <Descriptions.Item label="Ориентированность">{mentalData.orientation}</Descriptions.Item>
        <Descriptions.Item label="Расстройства восприятия">
          {mentalData.perception_disorders}
        </Descriptions.Item>
        <Descriptions.Item label="Цель госпитализации">
          {mentalData.purpose_of_hospitalization}
        </Descriptions.Item>
        <Descriptions.Item label="Запах алкоголя">
          {mentalData.smell_of_alcohol ? 'Да' : 'Нет'}
        </Descriptions.Item>
        <Descriptions.Item label="Попытка суицида">{mentalData.suicide_attempt}</Descriptions.Item>
        <Descriptions.Item label="Вид">{mentalData.view}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default MentalComponent;
