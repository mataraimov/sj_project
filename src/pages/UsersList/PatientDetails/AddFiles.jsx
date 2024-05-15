import { useState, useEffect } from 'react';
import { Table, Space, Button, Upload, message, Modal } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../components/utils/config';
import { refreshAccessToken } from '../../../components/utils/refreshToken';

const { confirm } = Modal;

const Files = () => {
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreview = (url) => {
    setPreviewImage(url);
    setPreviewVisible(true);
  };
  const fetchFilesData = async () => {
    try {
      await refreshAccessToken();

      const response = await axios.get(`${API_URL}/api/v1/files/${id}/all_photo/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setFileList(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных файлов:', error);
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

      if (response.status === 204) {
        setFileList((prevList) => prevList.filter((item) => item.id !== file.id));

        showMessage('success', `Файл успешно удален`);
      } else {
        showMessage('error', 'Произошла ошибка при удалении файла');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      showMessage('error', 'Произошла ошибка при удалении файла');
    }
  };

  const handleEdit = (file) => {
    const onChange = async (info) => {
      if (info.file.status === 'done') {
        const newFile = info.file.response.data.url; // Assuming the response contains the new file URL
        try {
          await axios.patch(
            `${API_URL}/api/v1/files/${file.id}/patch`,
            { file: newFile },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            },
          );

          fetchFilesData();
          showMessage('success', `Файл успешно изменен`);
        } catch (error) {
          console.error('Error editing file:', error);
          showMessage('error', 'Произошла ошибка при изменении файла');
        }
      } else if (info.file.status === 'error') {
        console.log(info);
        showMessage('error', 'Произошла ошибка при загрузке файла');
      }
    };

    return (
      <Upload name="file" showUploadList={false} onChange={onChange}>
        <Button icon={<UploadOutlined />}>Изменить файл</Button>
      </Upload>
    );
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
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

      if (response.status === 200 || response.status === 201) {
        message.success(`${file.name} успешно загружен`);
        await fetchFilesData(); // Update the file list after a successful upload
      } else {
        showMessage('error', `Произошла ошибка при загрузке файла ${file.name}`);
      }
      onSuccess();
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error(`Произошла ошибка при загрузке файла ${file.name}`);
      onError();
    }
  };

  const beforeUpload = (file) => {
    customRequest({ file, onSuccess: () => {}, onError: () => {} });
    return false; // Отменяем автоматическую загрузку Ant Design
  };

  const columns = [
    {
      title: 'Имя файла',
      dataIndex: 'file',
      key: 'file',
      render: (file) => (
        <img
          src={`http://${file}`}
          alt="file"
          style={{ width: '150px', cursor: 'pointer' }}
          onClick={() => handlePreview(`http://${file}`)}
        />
      ),
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <Space>
          {handleEdit(record)}
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

  return (
    <div>
      <Space direction="vertical" style={{ marginBottom: '16px' }}>
        <Upload customRequest={customRequest} showUploadList={false} beforeUpload={beforeUpload}>
          <Button icon={<UploadOutlined />}>Загрузить файл</Button>
        </Upload>
      </Space>
      <Table dataSource={fileList} columns={columns} rowKey="id" />
      <Modal
        visible={previewVisible}
        footer={null}
        centered
        style={{ minWidth: '50vw' }}
        onCancel={() => setPreviewVisible(false)}
      >
        <img
          alt="Увеличенное изображение"
          style={{ width: '100%', minWidth: '45vw', height: 'auto', objectFit: 'contain' }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default Files;
