import React, { useState, useEffect } from 'react';
import { Space, Table, Modal, Input, Form } from 'antd';

import axios from 'axios';
import { Link } from 'react-router-dom';

const DeveloperList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm] = Form.useForm();
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/devs_list/', { headers });
      const filteredData = response.data.filter((user) => user.id !== 1);
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/user_update/${id}/`, updatedData, {
        headers,
      });
      await fetchData();
      setEditingId(null);
    } catch (error) {
      console.error('Error updating user:', error);
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
              <Link to={`/developer/${record.id}`}>Details</Link>
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
      content: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDelete(record.id),
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/user_delete/${id}/`, { headers });
      await fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Table columns={columns} dataSource={data} loading={loading} />

      <Modal
        visible={editingId !== null}
        title="Edit User"
        okText="Save"
        cancelText="Cancel"
        onCancel={() => setEditingId(null)}
        onOk={() => editForm.submit()}
      >
        <Form
          form={editForm}
          onFinish={(values) => handleUpdate(editingId, values)}
          initialValues={data.find((user) => user.id === editingId)}
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DeveloperList;
