import { useLocation } from 'react-router-dom';
import { Descriptions, Tag, Divider } from 'antd';
import moment from 'moment';
const RecordsDetail = () => {
  const location = useLocation();
  const { recordData } = location.state;
  const { patientData } = location.state;
  return (
    <div>
      <h1>Детали записи</h1>
      <Divider />

      {/* Основная информация */}
      <Descriptions title="Основная информация" bordered>
        <Descriptions.Item label="Дата начала">
          {moment(recordData.date_start).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Дата окончания">
          {moment(recordData.date_end).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Цена">{recordData.price} руб.</Descriptions.Item>
        <Descriptions.Item label="Условия">{recordData.conditions}</Descriptions.Item>
        {/* Добавляем остальные поля */}
        <Descriptions.Item label="Категория">
          {recordData.anamnesis?.category.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Тип толерантности">
          {recordData.anamnesis?.type_tolerance.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Тип интоксикации">
          {recordData.anamnesis?.type_intoxication.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Тип палимпсестов">
          {recordData.anamnesis?.type_palimpsests.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </Descriptions.Item>
        {/* Добавляем остальные поля */}
      </Descriptions>

      <Divider />

      {/* Информация о пациенте */}
      <Descriptions title="Информация о пациенте" bordered>
        <Descriptions.Item label="Имя">{patientData?.name}</Descriptions.Item>
        <Descriptions.Item label="Фамилия">{patientData?.surname}</Descriptions.Item>
        <Descriptions.Item label="Отчество">{patientData?.patronymic}</Descriptions.Item>
        <Descriptions.Item label="Дата рождения">
          {moment(patientData?.date_of_birth).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Образование">
          {patientData.anamnesis?.education}
        </Descriptions.Item>
        <Descriptions.Item label="Семейное положение">
          {patientData.anamnesis?.martial_status}
        </Descriptions.Item>
        <Descriptions.Item label="Место работы">
          {patientData.anamnesis?.place_work}
        </Descriptions.Item>
        <Descriptions.Item label="Судимости">
          {patientData.anamnesis?.criminal_record}
        </Descriptions.Item>
        <Descriptions.Item label="Прошлые заболевания">
          {patientData.anamnesis?.previous_illnesses}
        </Descriptions.Item>
        <Descriptions.Item label="Принимаемые медикаменты">
          {patientData.anamnesis?.medications}
        </Descriptions.Item>
        <Descriptions.Item label="Аллергический анамнез">
          {patientData.anamnesis?.allergic_history}
        </Descriptions.Item>
        {/* Добавляем остальные поля */}
      </Descriptions>

      <Divider />

      {/* Информация о состоянии пациента */}
      <Descriptions title="Информация о состоянии пациента" bordered>
        <Descriptions.Item label="Отделение">{recordData.departament}</Descriptions.Item>
        <Descriptions.Item label="Группа крови">{recordData.blood_type}</Descriptions.Item>
        <Descriptions.Item label="Состояние">{recordData.conditions}</Descriptions.Item>
        <Descriptions.Item label="Категория">
          {recordData.anamnesis?.category[0].title}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Тип кожи">{recordData.anamnesis?.skin_type}</Descriptions.Item> */}
        {/* <Descriptions.Item label="Доступность">
          {recordData.anamnesis?.availability}
        </Descriptions.Item> */}
        {/* <Descriptions.Item label="Следы">{recordData.anamnesis?.traces}</Descriptions.Item> */}
        <Descriptions.Item label="Сост. конъюнктивы">
          {recordData.anamnesis?.state_conjunctiva === 1 ? (
            <Tag color="green">Хорошее</Tag>
          ) : (
            <Tag color="red">Плохое</Tag>
          )}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Дыхание">{recordData.anamnesis?.breath}</Descriptions.Item> */}
        {/* Добавляем остальные поля */}
      </Descriptions>
    </div>
  );
};

export default RecordsDetail;
