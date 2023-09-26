import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
import { Descriptions, Button, Modal, Form, Input, Select, Table } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../components/utils/config';
import CreateSessionModal from './CreateSession';
import { useAuth } from '../../../components/utils/context';
const { confirm } = Modal;
const { Option } = Select;

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recordsData, setRecordsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [session, setSessionVisible] = useState(false);
  const [form] = Form.useForm();
  const [educationOptions, setEducationOptions] = useState([]);
  const [familyOptions, setFamilyOptions] = useState([]);
  const location = useLocation();
  const [patientData, setPatientData] = useState(location.state?.patientData || {});
  const { authData } = useAuth();
  const { role } = authData;
  const handleAddFilesClick = () => {
    navigate(`/add-files/${id}`); // Adjust the path as per your application's routing
  };

  const handleDiariesClick = () => {
    navigate(`/diaries/${id}`); // Adjust the path as per your application's routing
  };

  const handlePsychologistNotesClick = () => {
    navigate(`/psychologist-notes/${id}`); // Adjust the path as per your application's routing
  };
  const fetchEducationOptions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/status/education_list/`);

      setEducationOptions(response.data);
    } catch (error) {
      console.error('Error fetching education options:', error);
    }
  };
  const fetchFamilyOptions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/status/family_list/`);

      setFamilyOptions(response.data);
    } catch (error) {
      console.error('Error fetching family options:', error);
    }
  };

  useEffect(() => {
    fetchEducationOptions();
    fetchFamilyOptions();
  }, [modalVisible]);
  useEffect(() => {
    fetchRecordsData();
    // moment.locale('ru');
  }, []);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };
  const columns = [
    {
      title: 'Дата начала',
      dataIndex: 'date_start',
      key: 'date_start',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Дата окончания',
      dataIndex: 'date_end',
      key: 'date_end',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Условия',
      dataIndex: 'conditions',
      key: 'conditions',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => showDetails(record)}>
            Детали
          </Button>
          <Button type="danger" onClick={() => showConfirm(record)}>
            Удалить
          </Button>
        </span>
      ),
    },
  ];
  const showDetails = (record) => {
    navigate(`/records/${id}`, { state: { recordData: record } });
  };

  const showConfirm = (record) => {
    confirm({
      title: 'Вы уверены, что хотите удалить эту сессию?',
      onOk() {
        // Обработка действия "Удалить" для конкретной сессии
      },
    });
  };

  const fetchRecordsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/records/${id}/`, {
        headers,
      });
      console.log(response.data);
      setRecordsData(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      axios
        .patch(
          `${API_URL}/api/v1/patients/${id}/`,
          {
            ...values,
            date_of_birth: moment(values.date_of_birth).format('YYYY-MM-DD'),
          },
          { headers },
        )
        .then((response) => {
          setPatientData(response.data);
          setModalVisible(false);
          form.resetFields();
        })
        .catch((error) => {
          console.log({
            ...values,
            date_of_birth: moment(values.date_of_birth).format('YYYY-MM-DD'),
          });
          console.error('Error updating patient data:', error);
        });
    });
  };

  const showModal = () => {
    setModalVisible(true);
  };
  const showSessionModal = () => {
    setSessionVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSessionVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Descriptions title="Детали пациента">
        <Descriptions.Item label="Имя">{patientData?.name}</Descriptions.Item>
        <Descriptions.Item label="Фамилия">{patientData?.surname}</Descriptions.Item>
        <Descriptions.Item label="Отчество">{patientData?.patronymic}</Descriptions.Item>
        <Descriptions.Item label="Дата рождения">
          {moment(patientData?.date_of_birth).format('YYYY-MM-DD')}
        </Descriptions.Item>
        <Descriptions.Item label="Образование">
          {patientData?.anamnesis_life?.education}
        </Descriptions.Item>
        <Descriptions.Item label="Семейное положение">
          {patientData?.anamnesis_life?.martial_status}
        </Descriptions.Item>
        <Descriptions.Item label="Место работы">
          {patientData?.anamnesis_life?.place_work}
        </Descriptions.Item>
        <Descriptions.Item label="Судимости">
          {patientData?.anamnesis_life?.criminal_record}
        </Descriptions.Item>
        <Descriptions.Item label="Прошлые заболевания">
          {patientData?.anamnesis_life?.previous_illnesses}
        </Descriptions.Item>
        <Descriptions.Item label="Принимаемые медикаменты">
          {patientData?.anamnesis_life?.medications}
        </Descriptions.Item>
        <Descriptions.Item label="Аллергический анамнез">
          {patientData?.anamnesis_life?.allergic_history}
        </Descriptions.Item>
        {/* Добавьте другие поля для отображения информации о пациенте */}
      </Descriptions>
      <Button
        type="primary"
        icon={<EditOutlined />}
        style={{ marginBottom: 16, float: 'left' }}
        onClick={showModal}
      >
        Редактировать
      </Button>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16, float: 'right' }}
        onClick={showSessionModal}
      >
        Добавить сессию
      </Button>
      {role === 'Доктор' && (
        <>
          <Button onClick={handleAddFilesClick} style={{ marginLeft: 16 }} type="primary">
            Добавить файлы
          </Button>
          <Button onClick={handleDiariesClick} style={{ marginLeft: 16 }} type="primary">
            Дневники
          </Button>
        </>
      )}
      {role === 'Психолог' && (
        <Button onClick={handlePsychologistNotesClick} style={{ marginLeft: 16 }} type="primary">
          Заметки психолога
        </Button>
      )}

      <Table columns={columns} dataSource={recordsData} rowKey={(record, index) => index} />
      {session && (
        <CreateSessionModal
          visible={session} // Передаем видимость модалки
          onCancel={handleCancel} // Передаем функцию закрытия модалки
          patientId={id} // Передаем ID пациента
          fetchData={fetchRecordsData} // Передаем функцию для обновления данных
        />
      )}
      {/* Добавьте другие компоненты для отображения данных о посещениях пациента */}
      {modalVisible && (
        <Modal
          title="Редактировать информацию о пациенте"
          visible={modalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} initialValues={patientData}>
            <Form.Item name="name" label="Имя">
              <Input />
            </Form.Item>
            <Form.Item name="surname" label="Фамилия">
              <Input />
            </Form.Item>
            <Form.Item name="patronymic" label="Отчество">
              <Input />
            </Form.Item>
            {/* <Form.Item name="date_of_birth" label="Дата рождения">
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item> */}
            <Form.Item name={['anamnesis_life', 'education']} label="Образование">
              <Select>
                {educationOptions.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name={['anamnesis_life', 'martial_status']} label="Семейное положение">
              <Select>
                {familyOptions.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={['anamnesis_life', 'place_work']} label="Место работы">
              <Input />
            </Form.Item>
            <Form.Item name={['anamnesis_life', 'criminal_record']} label="Судимости">
              <Input />
            </Form.Item>
            <Form.Item name={['anamnesis_life', 'previous_illnesses']} label="Прошлые заболевания">
              <Input />
            </Form.Item>
            <Form.Item name={['anamnesis_life', 'medications']} label="Принимаемые медикаменты">
              <Input />
            </Form.Item>
            <Form.Item name={['anamnesis_life', 'allergic_history']} label="Аллергический анамнез">
              <Input />
            </Form.Item>
            {/* Добавьте другие поля для редактирования информации о пациенте */}
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default PatientDetails;
