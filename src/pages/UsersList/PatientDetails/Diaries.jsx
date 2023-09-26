import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Form, Input, Table, message } from 'antd';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../components/utils/config';
import { refreshAccessToken } from '../../../components/utils/refreshToken';

const { TextArea } = Input;

const Diaries = () => {
  const { id } = useParams();

  const [diariesData, setDiariesData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [fullContent, setFullContent] = useState('');
  const [showFullContentModal, setShowFullContentModal] = useState(false);

  const toggleShowFullContentModal = (text) => {
    setFullContent(text);
    setShowFullContentModal(!showFullContentModal);
  };

  const showDeleteConfirm = (diaryId) => {
    Modal.confirm({
      title: 'Удаление дневника',
      content: 'Вы уверены, что хотите удалить этот дневник?',
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk() {
        handleDeleteDiary(diaryId);
      },
    });
  };

  const fetchDiariesData = async () => {
    try {
      await refreshAccessToken();
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      const response = await axios.get(`${API_URL}/api/v1/diaries/${id}/lists/`, { headers });
      console.log(response.data);
      setDiariesData(response.data);
    } catch (error) {
      console.error('Error fetching diaries data:', error);
    }
  };

  useEffect(() => {
    fetchDiariesData();
  }, []);

  const handleAddDiaryEntry = () => {
    form.validateFields().then(async (values) => {
      try {
        await refreshAccessToken();
        const headers = {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        };

        await axios.post(`${API_URL}/api/v1/diaries/${id}/diary_entry/`, values, { headers });

        message.success('Запись в дневнике успешно добавлена');
        setModalVisible(false);
        form.resetFields();
        fetchDiariesData();
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage =
            error.response.data.detail || 'Произошла ошибка при добавлении записи в дневник';
          message.error(errorMessage);
        } else {
          message.error('Произошла ошибка при добавлении записи в дневник');
        }
        console.error('Error adding diary entry:', error);
      }
    });
  };

  const handleDeleteDiary = async (diaryId) => {
    try {
      await refreshAccessToken();
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
      console.log(diaryId);
      const response = await axios.delete(`${API_URL}/api/v1/diaries/${diaryId}/`, { headers });
      if (response.status === 200) {
        message.success('Дневник успешно удален');
        // Обновляем данные
        const updatedDiaries = diariesData.filter((diary) => diary.id !== diaryId);
        setDiariesData(updatedDiaries);
      }
    } catch (error) {
      console.error('Error deleting diary:', error);
      message.error('Произошла ошибка при удалении дневника');
    }
  };

  const columns = [
    {
      title: 'Содержание',
      dataIndex: 'content',
      key: 'content',
      width: '70%',
      ellipsis: true,
      render: (text, record) => (
        <div>
          {text.length > 100 ? (
            <div>
              {text.slice(0, 100)}
              <Button type="link" onClick={() => toggleShowFullContentModal(text)}>
                Показать полностью
              </Button>
            </div>
          ) : (
            <div>{text}</div>
          )}
        </div>
      ),
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="danger" onClick={() => showDeleteConfirm(record.id)}>
            Удалить
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Card title="Дневники">
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Добавить запись в дневник
      </Button>
      <Table dataSource={diariesData} columns={columns} rowKey="id" />
      <Modal
        title="Добавить запись в дневник"
        visible={modalVisible}
        onOk={handleAddDiaryEntry}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item
            name="content"
            label="Содержание"
            rules={[{ required: true, message: 'Введите содержание' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Полное содержание"
        visible={showFullContentModal}
        onCancel={() => toggleShowFullContentModal('')}
        footer={[
          <Button key="close" onClick={() => toggleShowFullContentModal('')}>
            Закрыть
          </Button>,
        ]}
      >
        <div style={{ maxHeight: '300px', overflow: 'auto' }}>{fullContent}</div>
      </Modal>
    </Card>
  );
};

export default Diaries;
