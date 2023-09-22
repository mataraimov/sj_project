import React, { useState, useEffect } from 'react';
import { Space, Table, Modal, Form, Input } from 'antd';
import axios from 'axios';
import { refreshAccessToken } from '../../../components/utils/refreshToken';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../components/utils/config';

const PatientList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await refreshAccessToken();
      const headers = await {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      const response = await axios.get(`${API_URL}/api/v1/patients/`, { headers });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/v1/patients/${id}/`, updatedData);
      await fetchData();
      setEditingId(null);
    } catch (error) {
      console.error('Error updating patient:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/api/v1/patients/${id}/`);
      await fetchData();
    } catch (error) {
      console.error('Error deleting patient:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Patronymic',
      dataIndex: 'patronymic',
      key: 'patronymic',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <img src={avatar} alt="Avatar" style={{ width: '50px' }} />,
    },
    {
      title: 'In Hospital',
      dataIndex: 'in_hospital',
      key: 'in_hospital',
      render: (inHospital) => (inHospital ? 'Yes' : 'No'),
    },
    {
      title: 'Action',
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
              <Link to={`/patient/${record.id}`}>Details</Link>
              <a onClick={() => showDeleteConfirm(record)}>Delete</a>
            </>
          )}
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (record) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this patient?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDelete(record.id),
    });
  };

  const editForm = Form.useForm();

  return (
    <>
      <Table columns={columns} dataSource={data} loading={loading} />

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
