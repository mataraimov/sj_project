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
      const response = await axios.get(`${API_URL}/api/v1/psychology/${id}/`, { headers });
      console.log(response.data);
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
      // Добавьте другие поля, если они есть
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
      const response = await axios.delete(`${API_URL}/api/v1/psychology/${id}/lists/${note.id}/`, {
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
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };

      if (editingNote) {
        // Редактирование заметки
        const response = await axios.patch(
          `${API_URL}/api/v1/psychology/${id}/lists/${editingNote.id}/`,
          values,
          { headers },
        );

        if (response.status === 200) {
          setNotes((prevList) =>
            prevList.map((item) => (item.id === editingNote.id ? { ...item, ...values } : item)),
          );
          message.success(`Заметка успешно отредактирована`);
          setModalVisible(false);
        } else {
          message.error('Произошла ошибка при редактировании заметки');
        }
      } else {
        const response = await axios.post(
          `${API_URL}/api/v1/psychology/${id}/psychology/`,
          values,
          {
            headers,
          },
        );
        console.log(response.data);
        if (response.status === 201) {
          setNotes((prevList) => [...prevList, response.data]);
          message.success(`Заметка успешно добавлена`);
          setModalVisible(false);
        } else {
          message.error('Произошла ошибка при добавлении заметки');
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
