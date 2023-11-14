// SomaticComponent.jsx
import React from 'react';
import { Descriptions, Divider } from 'antd';

const SomaticComponent = ({ somaticData }) => {
  return (
    <div>
      <Divider orientation="left">Общее состояние</Divider>
      <Descriptions bordered>
        <Descriptions.Item label="Состояние">{somaticData.condition}</Descriptions.Item>
        <Descriptions.Item label="Сердечные тоны">{somaticData.heart_tones}</Descriptions.Item>
        <Descriptions.Item label="Артериальное давление">{somaticData.ad}</Descriptions.Item>
        <Descriptions.Item label="Наличие шрамов">{somaticData.availability}</Descriptions.Item>
        <Descriptions.Item label="Общее состояние">{somaticData.condition}</Descriptions.Item>
        <Descriptions.Item label="Диурез">{somaticData.diuresis}</Descriptions.Item>
        <Descriptions.Item label="Отёки">{somaticData.edema}</Descriptions.Item>
        <Descriptions.Item label="Заполнение">{somaticData.filling}</Descriptions.Item>
        <Descriptions.Item label="Глюкоза">{somaticData.glucose}</Descriptions.Item>
        <Descriptions.Item label="Сердечные тоны">{somaticData.heart_tones}</Descriptions.Item>
        <Descriptions.Item label="Печень">{somaticData.liver}</Descriptions.Item>
        <Descriptions.Item label="Частота пульса">{somaticData.pulse_frequency}</Descriptions.Item>
        <Descriptions.Item label="Сатурация">{somaticData.saturation}</Descriptions.Item>
        <Descriptions.Item label="Цвет кожи">{somaticData.skin_type}</Descriptions.Item>
        <Descriptions.Item label="Состояние конъюнктивы">
          {somaticData.state_conjunctiva}
        </Descriptions.Item>
        <Descriptions.Item label="Живот">{somaticData.stomach}</Descriptions.Item>
        <Descriptions.Item label="Стул">{somaticData.stool}</Descriptions.Item>
        <Descriptions.Item label="Приём добавок">{somaticData.supplements}</Descriptions.Item>
        <Descriptions.Item label="Язык">{somaticData.tongue}</Descriptions.Item>
        <Descriptions.Item label="Шрамы">{somaticData.traces}</Descriptions.Item>
        <Descriptions.Item label="Сосудистая система">
          {somaticData.vascular_system}
        </Descriptions.Item>
        <Descriptions.Item label="Рвота">{somaticData.vomiting}</Descriptions.Item>
        <Descriptions.Item label="Хрипы">{somaticData.wheezing}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default SomaticComponent;
