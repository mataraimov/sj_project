import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import { API_URL } from '../../../components/utils/config';
import { refreshAccessToken } from '../../../components/utils/refreshToken';
import { useParams } from 'react-router-dom';

const { confirm } = Modal;

const PsychologistNotes = () => {
  const [form] = Form.useForm();
  const [psychologists, setPsychologists] = useState([]);
  const [editingPsychologist, setEditingPsychologist] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useParams();
  const fetchPsychologists = async () => {
    try {
      await refreshAccessToken();
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      const response = await axios.get(`${API_URL}/api/v1/psychology/${id}/`, { headers });
      setPsychologists(response.data);
    } catch (error) {
      console.error('Error fetching psychologists:', error);
    }
  };

  useEffect(() => {
    fetchPsychologists();
  }, []);

  const showDeleteConfirm = (psychologist) => {
    confirm({
      title: 'Вы уверены, что хотите удалить этого психолога?',
      onOk() {
        handleDelete(psychologist);
      },
      onCancel() {},
    });
  };

  const handleEdit = (psychologist) => {
    setEditingPsychologist(psychologist);
    form.setFieldsValue({
      name: psychologist.name,
      email: psychologist.email,
      // Добавьте другие поля, если они есть
    });
    setModalVisible(true);
  };

  const handleDelete = async (psychologist) => {
    try {
      await refreshAccessToken();
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      const response = await axios.delete(`${API_URL}/api/v1/psychology/${psychologist.id}/`, {
        headers,
      });

      if (response.status === 204) {
        setPsychologists((prevList) => prevList.filter((item) => item.id !== psychologist.id));
        message.success(`Психолог ${psychologist.name} успешно удален`);
      } else {
        message.error('Произошла ошибка при удалении психолога');
      }
    } catch (error) {
      console.error('Error deleting psychologist:', error);
      message.error('Произошла ошибка при удалении психолога');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      await refreshAccessToken();
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };

      if (editingPsychologist) {
        // Редактирование психолога
        const response = await axios.patch(
          `${API_URL}/api/v1/psychology/${editingPsychologist.id}/`,
          values,
          { headers },
        );

        if (response.status === 200) {
          setPsychologists((prevList) =>
            prevList.map((item) =>
              item.id === editingPsychologist.id ? { ...item, ...values } : item,
            ),
          );
          message.success(`Психолог ${values.name} успешно отредактирован`);
          setModalVisible(false);
        } else {
          message.error('Произошла ошибка при редактировании психолога');
        }
      } else {
        // Добавление нового психолога
        const response = await axios.post(`${API_URL}/api/v1/psychology/`, values, { headers });

        if (response.status === 201) {
          setPsychologists((prevList) => [...prevList, response.data]);
          message.success(`Психолог ${values.name} успешно добавлен`);
          setModalVisible(false);
        } else {
          message.error('Произошла ошибка при добавлении психолога');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Добавить заметку
      </Button>
      <Table
        dataSource={psychologists}
        columns={[
          {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'Действия',
            key: 'action',
            render: (text, record) => (
              <Space>
                <Button onClick={() => handleEdit(record)}>Редактировать</Button>
                <Button onClick={() => showDeleteConfirm(record)}>Удалить</Button>
              </Space>
            ),
          },
        ]}
        rowKey="id"
      />
      <Modal
        title={editingPsychologist ? 'Редактировать заметку' : 'Добавить заметку'}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setModalVisible(false);
          setEditingPsychologist(null);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Имя"
            rules={[
              {
                required: true,
                message: 'Введите имя психолога',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Введите корректный email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Добавьте другие поля, если они есть */}
        </Form>
      </Modal>
    </div>
  );
};

export default PsychologistNotes;
