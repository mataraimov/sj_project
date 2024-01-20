import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
import { Descriptions, Button, Modal, Form, Input, Select, Table } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../components/utils/config';
// import CreateSessionModal from './CreateSession';
import { useAuth } from '../../../components/utils/context';
import { refreshAccessToken } from '../../../components/utils/refreshToken';
import CreateSessionModal from './Sessions/CreateSession';
import CreateEpicrisisModal from './Epicrisis';
const { confirm } = Modal;
const { Option } = Select;

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recordsData, setRecordsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [session, setSessionVisible] = useState(false);
  const [epicris, setEpicrisVisible] = useState(false);
  const [form] = Form.useForm();
  const [educationOptions, setEducationOptions] = useState([]);
  const [familyOptions, setFamilyOptions] = useState([]);
  const location = useLocation();
  const [patientData, setPatientData] = useState(location.state?.patientData || {});
  const { authData } = useAuth();
  const { role } = authData;
  const handleAddFilesClick = () => {
    navigate(`/add-files/${id}`);
  };

  const handleDiariesClick = () => {
    navigate(`/diaries/${id}`);
  };
  const handleEpicrisisClick = () => {
    navigate(`/epicrisis/${id}`);
  };

  const handlePsychologistNotesClick = () => {
    navigate(`/psychologist-notes/${id}`);
  };
  const fetchEducationOptions = async () => {
    try {
      await refreshAccessToken();
      const response = await axios.get(`${API_URL}/api/v1/status/education_list/`);
      setEducationOptions(response.data);
    } catch (error) {
      console.error('Error fetching education options:', error);
    }
  };
  const fetchFamilyOptions = async () => {
    try {
      await refreshAccessToken();
      const response = await axios.get(`${API_URL}/api/v1/status/family_list/`);
      setFamilyOptions(response.data);
    } catch (error) {
      console.error('Error fetching family options:', error);
    }
  };
  const fetchPatientData = async () => {
    try {
      await refreshAccessToken();
      const response = await axios.get(`${API_URL}/api/v1/patients/${id}/`, {
        headers,
      });
      setPatientData(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };
  useEffect(() => {
    fetchRecordsData();
  }, [id]);

  useEffect(() => {
    fetchEducationOptions();
    fetchFamilyOptions();
  }, [modalVisible]);

  useEffect(() => {
    fetchPatientData();
  }, [id]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };
  const columns = [
    {
      title: 'Дата начала',
      dataIndex: ' date_of_admission',
      key: 'date_start',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Дата окончания',
      dataIndex: 'date_of_discharge',
      key: 'date_end',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Состояние',
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
          {role === 'Admin' && (
            <Button style={{ color: 'red' }} type="danger" onClick={() => showConfirm(record)}>
              Удалить
            </Button>
          )}
        </span>
      ),
    },
  ];
  const showDetails = (record) => {
    navigate(`/records/${id}`, {
      state: { recordData: record, patientData: patientData },
    });
  };

  const showConfirm = (record) => {
    Modal.confirm({
      title: 'Подтверждение удаления',
      content: 'Вы уверены что хотите удалить пациента?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk: () => handleDelete(record.id),
    });
  };
  const handleDelete = async (sessionId) => {
    try {
      await refreshAccessToken();
      const headers = await {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      await axios.delete(`${API_URL}/api/v1/records/${sessionId}/`, {
        headers,
      });
      await fetchRecordsData(); // Assuming this function is defined and fetches the records data
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const fetchRecordsData = async () => {
    try {
      await refreshAccessToken();
      const response = await axios.get(`${API_URL}/api/v1/records/${id}/`, {
        headers,
      });
      setRecordsData(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
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
          fetchPatientData();
          console.log(response.data);
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
  const showEpicrisModal = () => {
    setEpicrisVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSessionVisible(false);
    setEpicrisVisible(false);
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
          {patientData?.anamnesis?.education}
        </Descriptions.Item>
        <Descriptions.Item label="Семейное положение">
          {patientData?.anamnesis?.martial_status}
        </Descriptions.Item>
        <Descriptions.Item label="Место работы">
          {patientData?.anamnesis?.place_work}
        </Descriptions.Item>
        <Descriptions.Item label="Судимости">
          {patientData?.anamnesis?.criminal_record}
        </Descriptions.Item>
        <Descriptions.Item label="Прошлые заболевания">
          {patientData?.anamnesis?.previous_illnesses}
        </Descriptions.Item>
        <Descriptions.Item label="Принимаемые медикаменты">
          {patientData?.anamnesis?.medications}
        </Descriptions.Item>
        <Descriptions.Item label="Аллергический анамнез">
          {patientData?.anamnesis?.allergic_history}
        </Descriptions.Item>
      </Descriptions>

      {role !== 'Психолог' && (
        <>
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
        </>
      )}

      {role !== 'Психолог' && (
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: 16, float: 'right', marginRight: 16 }}
            onClick={handleEpicrisisClick}
          >
            Эпикриз
          </Button>
        </>
      )}
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
        <>
          <Button onClick={handleAddFilesClick} style={{ marginLeft: 16 }} type="primary">
            Добавить файлы
          </Button>
          <Button onClick={handlePsychologistNotesClick} style={{ marginLeft: 16 }} type="primary">
            Заметки психолога
          </Button>
        </>
      )}

      <Table columns={columns} dataSource={recordsData} rowKey={(record, index) => index} />
      {session && (
        <CreateSessionModal
          visible={session}
          onCancel={handleCancel}
          patientId={id}
          fetchData={fetchRecordsData}
        />
      )}

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
                  <Option key={option.id} value={option.title}>
                    {option.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name={['anamnesis_life', 'martial_status']} label="Семейное положение">
              <Select>
                {familyOptions.map((option) => (
                  <Option key={option.id} value={option.title}>
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
