import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { API_URL } from '../../../components/utils/config';

const AddFiles = () => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = (info) => {
    let fileList = [...info.fileList];

    // Filter out successfully uploaded files
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.success === true;
      }
      return true;
    });

    setFileList(fileList);

    // Display a message after uploading
    if (info.file.status === 'done') {
      message.success(`${info.file.name} успешно загружен`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} загрузка не удалась.`);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_URL}/api/v1/upload/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
      } else {
        onError(new Error('Upload failed'));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      onError(error);
    }
  };

  return (
    <div>
      <Upload
        customRequest={customRequest}
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleUpload}
        fileList={fileList}
      >
        <Button icon={<UploadOutlined />}>Загрузить файлы</Button>
      </Upload>
    </div>
  );
};

export default AddFiles;
