import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Divider, Form, Modal, Input, Select } from 'antd';
import { refreshAccessToken } from '../../../../components/utils/refreshToken';
import { API_URL } from '../../../../components/utils/config';
import axios from 'axios';
import FormItem from 'antd/es/form/FormItem';
import moment from 'moment';

const { Option } = Select;

const fieldDescriptions = {
  date_of_admission: 'Дата поступления',
  arrives: 'Прибывает',
  blood_type: 'Тип крови',
  conditions: 'Общее состояние',
  complaints: 'Жалобы',
  departament: 'Отдел',
  escorts: 'Сопровождение',
  number_of_days: 'Количество дней',
  price: 'Цена',
  date_of_discharge: 'Дата выписки',
};

const GeneralState = ({ recordData }) => {
  return (
    <div>
      <div>
        <Divider orientation="left">Общее состояние</Divider>
      </div>
      <Descriptions bordered>
        <Descriptions.Item label="Дата поступления">
          {moment(recordData.date_of_admission).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Прибывает">{recordData.arrives}</Descriptions.Item>
        <Descriptions.Item label="Тип крови">{recordData.blood_type}</Descriptions.Item>
        <Descriptions.Item label="Общее состояние">{recordData.conditions}</Descriptions.Item>
        <Descriptions.Item label="Жалобы">{recordData.complaints}</Descriptions.Item>
        <Descriptions.Item label="Отдел">{recordData.departament}</Descriptions.Item>
        <Descriptions.Item label="Сопровождение">{recordData.escorts}</Descriptions.Item>
        <Descriptions.Item label="Количество дней">{recordData.number_of_days}</Descriptions.Item>
        <Descriptions.Item label="Цена">{recordData.price}</Descriptions.Item>
        <Descriptions.Item label="Дата выписки">{
          moment(recordData.date_of_discharge).format('YYYY-MM-DD')
        }</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default GeneralState;
