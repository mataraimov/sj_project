import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUpload = ({ onUpload }) => {
  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Здесь нужно выполнить запрос на загрузку файла
      // Например, onUpload(formData);

      // Далее, если запрос успешный, вызываем onSuccess()
      onSuccess();
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      onError(error);
    }
  };

  const beforeUpload = (file) => {
    customRequest({ file, onSuccess: () => {}, onError: () => {} });
    return false; // Отменяем автоматическую загрузку Ant Design
  };

  return (
    <Upload
      customRequest={customRequest}
      showUploadList={false}
      beforeUpload={beforeUpload}
      // Опционально, добавьте обработчик изменения состояния загрузки
      onChange={(info) => {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }}>
      <Button icon={<UploadOutlined />}>Загрузить файл</Button>
    </Upload>
  );
};

export default FileUpload;
