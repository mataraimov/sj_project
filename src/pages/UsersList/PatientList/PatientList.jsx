import { useState, useEffect, useRef } from 'react';
import { Space, Table, Modal, Form, Input, Button } from 'antd';
import axios from 'axios';
import { refreshAccessToken } from '../../../components/utils/refreshToken';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../components/utils/config';
import { PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../../../components/utils/context';
const PatientList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { role } = authData;
  const prevPaginationRef = useRef();
  const [pagination, setPagination] = useState({
    current: 1,
    // pageSize: 10,
    total: 0,
  });

  const handleTableChange = (pagination) => {
    prevPaginationRef.current = pagination;
    setPagination(pagination);
    fetchData(pagination.current);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page = 1) => {
    try {
      await refreshAccessToken();
      const headers = await {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      const response = await axios.get(`${API_URL}/api/v1/patients/`, {
        headers,
        params: {
          page,
        },
      });

      setData(response.data.results);
      setPagination({
        ...pagination,
        total: response.data.count,
        next: response.data.next,
      });

      // Восстанавливаем предыдущее значение pagination
      if (prevPaginationRef.current) {
        setPagination(prevPaginationRef.current);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      await refreshAccessToken();
      const headers = await {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      await axios.put(`${API_URL}/api/v1/patients/${id}/`, { headers }, updatedData);
      await fetchData();
      setEditingId(null);
    } catch (error) {
      console.error('Ошибка обновления пациента:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await refreshAccessToken();
      const headers = await {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      await axios.delete(`${API_URL}/api/v1/patients/${id}/`, { headers });
      await fetchData();
    } catch (error) {
      console.error('Ошибка удаления пациента:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Отчество',
      dataIndex: 'patronymic',
      key: 'patronymic',
    },
    {
      title: 'Аватар',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => (
        <img
          src={'https://sj-crm.kg/api/media/default_png.jpg'}
          alt="Avatar"
          style={{ width: '50px' }}
        />
      ),
    },
    {
      title: 'В госпитале',
      dataIndex: 'in_hospital',
      key: 'in_hospital',
      render: (inHospital) => (inHospital ? 'Да' : 'Нет'),
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {editingId === record.id ? (
            <>
              <a onClick={() => editForm.submit()}>Save</a>
              <a onClick={() => setEditingId(null)}>Cancel</a>
            </>
          ) : (
            <>
              <a style={{ color: '#1890ff' }} onClick={() => showDetails(record)}>
                Детали
              </a>
              {role === 'Admin' && (
                <a onClick={() => showDeleteConfirm(record)} style={{ color: 'red' }}>
                  Удалить
                </a>
              )}
            </>
          )}
        </Space>
      ),
    },
  ];
  const showDetails = (record) => {
    navigate(`/patient/${record.id}`, { state: { patientData: record } });
  };
  const showDeleteConfirm = (record) => {
    Modal.confirm({
      title: 'Подтверждение удаления',
      content: 'Вы уверены что хотите удалить пациента?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk: () => handleDelete(record.id),
    });
  };

  const editForm = Form.useForm();

  return (
    <>
      <Link to="/admin/create-patient">
        <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16, float: 'right' }}>
          Добавить пациента
        </Button>
      </Link>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
      />

      <Modal
        visible={editingId !== null}
        title="Edit Patient"
        okText="Save"
        cancelText="Cancel"
        onCancel={() => setEditingId(null)}
        onOk={() => editForm.submit()}
      >
        <Form
          form={editForm}
          onFinish={(values) => handleUpdate(editingId, values)}
          initialValues={data.find((patient) => patient.id === editingId)}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Surname" name="surname">
            <Input />
          </Form.Item>
          <Form.Item label="Patronymic" name="patronymic">
            <Input />
          </Form.Item>
          <Form.Item label="Avatar" name="avatar">
            <Input />
          </Form.Item>
          <Form.Item label="In Hospital" name="in_hospital" valuePropName="checked">
            <input type="checkbox" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PatientList;
