// AnamnesisComponent.jsx
import React from 'react';
import { Descriptions, Tag, Divider } from 'antd';

const AnamnesisComponent = ({ anamnesisData }) => {
  return (
    <div>
      <Divider orientation="left">Анамнез</Divider>
      <Descriptions bordered>
        <Descriptions.Item label="Добавление">{anamnesisData.addition}</Descriptions.Item>
        <Descriptions.Item label="Потребление алкоголя">
          {anamnesisData.binge_drinking}
        </Descriptions.Item>
        <Descriptions.Item label="Категория">
          {anamnesisData.category.map((item) => (
            <Tag key={item.id}>{item.title}</Tag>
          ))}
        </Descriptions.Item>
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
        <Descriptions.Item label="Тип интоксикации">
          {anamnesisData.type_intoxication.map((item) => (
            <Tag key={item.id}>{item.title}</Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Тип палимпсестов">
          {anamnesisData.type_palimpsests.map((item) => (
            <Tag key={item.id}>{item.title}</Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Тип переносимости">
          {anamnesisData.type_tolerance.map((item) => (
            <Tag key={item.id}>{item.title}</Tag>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default AnamnesisComponent;
