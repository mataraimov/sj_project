import { useLocation } from 'react-router-dom';
import { Descriptions, Tag, Divider } from 'antd';
import moment from 'moment';

const RecordsDetail = () => {
  const location = useLocation();
  const { recordData } = location.state;
  return (
    <div>
      <h1>Детали записи</h1>
      <Divider />

      <Descriptions title="Основная информация" bordered>
        <Descriptions.Item label="Дата начала">
          {moment(recordData.date_start).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Дата окончания">
          {moment(recordData.date_end).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Цена">{recordData.price} руб.</Descriptions.Item>
        <Descriptions.Item label="Условия">{recordData.conditions}</Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title="Информация о пациенте" bordered>
        <Descriptions.Item label="Имя">{recordData.patient?.name}</Descriptions.Item>
        <Descriptions.Item label="Фамилия">{recordData.patient?.surname}</Descriptions.Item>
        <Descriptions.Item label="Отчество">{recordData.patient?.patronymic}</Descriptions.Item>
        <Descriptions.Item label="Дата рождения">
          {moment(recordData.patient?.date_of_birth).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Образование">
          {recordData.patient?.anamnesis?.education}
        </Descriptions.Item>
        <Descriptions.Item label="Семейное положение">
          {recordData.patient?.anamnesis?.martial_status}
        </Descriptions.Item>
        <Descriptions.Item label="Место работы">
          {recordData.patient?.anamnesis?.place_work}
        </Descriptions.Item>
        <Descriptions.Item label="Судимости">
          {recordData.patient?.anamnesis?.criminal_record}
        </Descriptions.Item>
        <Descriptions.Item label="Прошлые заболевания">
          {recordData.patient?.anamnesis?.previous_illnesses}
        </Descriptions.Item>
        <Descriptions.Item label="Принимаемые медикаменты">
          {recordData.patient?.anamnesis?.medications}
        </Descriptions.Item>
        <Descriptions.Item label="Аллергический анамнез">
          {recordData.patient?.anamnesis?.allergic_history}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title="Информация о состоянии пациента" bordered>
        <Descriptions.Item label="Отделение">{recordData.somatic?.department}</Descriptions.Item>
        <Descriptions.Item label="Группа крови">{recordData.somatic?.blood_type}</Descriptions.Item>
        <Descriptions.Item label="Состояние">{recordData.somatic?.condition}</Descriptions.Item>
        <Descriptions.Item label="Категория">{recordData.somatic?.category}</Descriptions.Item>
        <Descriptions.Item label="Тип кожи">{recordData.somatic?.skin_type}</Descriptions.Item>
        <Descriptions.Item label="Доступность">
          {recordData.somatic?.availability}
        </Descriptions.Item>
        <Descriptions.Item label="Следы">{recordData.somatic?.traces}</Descriptions.Item>
        <Descriptions.Item label="Сост. конъюнктивы">
          {recordData.somatic?.state_conjunctiva === 1 ? (
            <Tag color="green">Хорошее</Tag>
          ) : (
            <Tag color="red">Плохое</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Дыхание">{recordData.somatic?.breath}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default RecordsDetail;
