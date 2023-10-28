// NeurologicalComponent.jsx
import React from 'react';
import { Descriptions, Divider } from 'antd';

const NeurologicalComponent = ({ neurologicalData }) => {
  return (
    <div>
      <Divider orientation="left">Неврологическое состояние</Divider>
      <Descriptions bordered>
        <Descriptions.Item label="Дизартрия">{neurologicalData.dysarthria}</Descriptions.Item>
        <Descriptions.Item label="Признаки менингеального раздражения">
          {neurologicalData.meningeal_signs}
        </Descriptions.Item>
        <Descriptions.Item label="Реакция на свет">
          {neurologicalData.photo_reaction}
        </Descriptions.Item>
        <Descriptions.Item label="Движения глазных яблок">
          {neurologicalData.pupils}
        </Descriptions.Item>
        <Descriptions.Item label="Судороги">{neurologicalData.seizures}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default NeurologicalComponent;
