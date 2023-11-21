import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import { API_URL } from '../../../components/utils/config';
import { refreshAccessToken } from '../../../components/utils/refreshToken';
import { useParams } from 'react-router-dom';

const { confirm } = Modal;

const PsychologistNotes = () => {
  const [form] = Form.useForm();
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { id } = useParams();

  const fetchNotes = async () => {
    try {
      await refreshAccessToken();
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      const response = await axios.get(`${API_URL}/api/v1/psychology/${id}/lists`, { headers });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching psychologist notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const showDeleteConfirm = (note) => {
    confirm({
      title: 'Вы уверены, что хотите удалить эту заметку?',
      onOk() {
        handleDelete(note);
      },
      onCancel() {},
    });
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    form.setFieldsValue({
      content: note.content,
    });
    setModalVisible(true);
  };

  const handleDelete = async (note) => {
    try {
      await refreshAccessToken();
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      const response = await axios.delete(`${API_URL}/api/v1/psychology/${note.id}/`, {
        headers,
      });

      if (response.status === 204) {
        setNotes((prevList) => prevList.filter((item) => item.id !== note.id));
        message.success(`Заметка успешно удалена`);
      } else {
        message.error('Произошла ошибка при удалении заметки');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      message.error('Произошла ошибка при удалении заметки');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await refreshAccessToken();
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };

      let response;

      if (editingNote) {
        const url = `${API_URL}/api/v1/psychology/${editingNote.id}/`;
        response = await axios.patch(url, values, { headers });
      } else {
        const url = `${API_URL}/api/v1/psychology/${id}/psychology/`;
        response = await axios.post(url, values, { headers });
      }

      if (response.status === 200 || response.status === 201 || response.status === 202) {
        const updatedNotes = editingNote
          ? notes.map((item) => (item.id === editingNote.id ? { ...item, ...values } : item))
          : [...notes, response.data];

        setNotes(updatedNotes);
        message.success(
          editingNote ? 'Заметка успешно отредактирована' : 'Заметка успешно добавлена',
        );
        setModalVisible(false);
        form.resetFields();
      } else {
        throw new Error('Error while adding/editing note');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Произошла ошибка при сохранении заметки');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Добавить заметку
      </Button>
      <Table
        dataSource={notes}
        columns={[
          {
            title: 'Содержание',
            dataIndex: 'content',
            key: 'content',
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
        rowKey={(record, index) => index}
      />
      <Modal
        title={editingNote ? 'Редактировать заметку' : 'Добавить заметку'}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setModalVisible(false);
          setEditingNote(null);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="content"
            label="Содержание"
            rules={[
              {
                required: true,
                message: 'Введите содержание заметки',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          {/* Добавьте другие поля, если они есть */}
        </Form>
      </Modal>
    </div>
  );
};

export default PsychologistNotes;
