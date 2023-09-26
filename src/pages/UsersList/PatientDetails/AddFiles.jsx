import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Upload, message } from 'antd';
import { UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../components/utils/config';
import { Modal } from 'antd';
import { refreshAccessToken } from '../../../components/utils/refreshToken';
const { confirm } = Modal;

const Files = () => {
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);

  const fetchFilesData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/files/${id}/all_photo/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setFileList(response.data);
    } catch (error) {
      console.error('Error fetching files data:', error);
    }
  };

  useEffect(() => {
    fetchFilesData();
  }, []);

  const showMessage = (type, text) => {
    Modal[type]({
      content: text,
    });
  };

  const handleRemove = async (file) => {
    try {
      const response = await axios.delete(`${API_URL}/api/v1/files/${file.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.status === 200) {
        setFileList((prevList) => prevList.filter((item) => item.id !== file.id));
        showMessage('success', `${file.name} успешно удален`);
      } else {
        showMessage('error', 'Произошла ошибка при удалении файла');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      showMessage('error', 'Произошла ошибка при удалении файла');
    }
  };

  const columns = [
    {
      title: 'Имя файла',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Изменить
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (file) => {
    confirm({
      title: 'Вы уверены, что хотите удалить этот файл?',
      onOk() {
        handleRemove(file);
      },
      onCancel() {},
    });
  };

  const handleEdit = (file) => {
    // Реализуйте здесь логику редактирования файла
    console.log(`Редактирование файла: ${file.name}`);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    console.log(1);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_URL}/api/v1/files/${id}/file/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      if (response.data.success) {
        console.log(response.data);
        onSuccess();
      } else {
        onError(new Error('Upload failed'));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      onError(error);
    }
  };
  const handleUpload = async (file) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await refreshAccessToken();
      const response = await axios.post(`${API_URL}/api/v1/files/${id}/file/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        message.success(`${file.name} успешно загружен`);
        await fetchFilesData(); // Обновляем список файлов после загрузки нового
      } else {
        message.error(`Произошла ошибка при загрузке файла ${file.name}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error(`Произошла ошибка при загрузке файла ${file.name}`);
    }
  };
  const beforeUpload = (file) => {
    handleUpload(file);
    return false; // Отменяем автоматическую загрузку Ant Design
  };
  return (
    <div>
      <Space direction="vertical" style={{ marginBottom: '16px' }}>
        <Upload
          customRequest={customRequest}
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleUpload} // Добавляем обработчик изменения состояния загрузки
        >
          {' '}
          <Button icon={<UploadOutlined />}>Загрузить файл</Button>
        </Upload>
      </Space>
      <Table dataSource={fileList} columns={columns} rowKey="id" />
    </div>
  );
};

export default Files;
