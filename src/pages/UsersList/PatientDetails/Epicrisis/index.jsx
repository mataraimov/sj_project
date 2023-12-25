import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Button, message, Table, Descriptions, Typography } from 'antd';
import moment from 'moment';
import { API_URL } from '../../../../components/utils/config';
import { refreshAccessToken } from '../../../../components/utils/refreshToken';
import CreateEpicrisisModal from './CreateEpicris';
import { useParams } from 'react-router-dom';
import { EditEpicrisisModal } from './EditEpicrisis';
import { useAuth } from '../../../../components/utils/context';
const { Column } = Table;

const EpicrisisDetails = ({ epicrisisId, onCancel }) => {
  const [epicrisisDetails, setEpicrisisDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEditClick = () => {
    setEditModalVisible(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await refreshAccessToken();
        const headers = {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        };

        const response = await axios.get(`${API_URL}/api/v1/epicrisis/${epicrisisId}/`, {
          headers,
        });
        setEpicrisisDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении деталей эпикриза:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [epicrisisId, editModalVisible]);

  return (
    <Modal
      title="Детали эпикриза"
      visible
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Закрыть
        </Button>,
      ]}
    >
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <Descriptions column={1}>
            <Descriptions.Item label="Дата начала лечения">
              {moment(epicrisisDetails.start_treatment).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="Дата окончания лечения">
              {moment(epicrisisDetails.end_treatment).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="Основной диагноз">
              <Typography.Text>{epicrisisDetails.main_diagnosis}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Сопутствующее">
              <Typography.Text>{epicrisisDetails.concomitant}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Осложнения">
              <Typography.Text>{epicrisisDetails.complications}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Лабораторные исследования">
              <Typography.Text>{epicrisisDetails.laboratory_tests}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Инструментальные исследования">
              <Typography.Text>{epicrisisDetails.instrumental_studies}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="ЭКГ">
              <Typography.Text>{epicrisisDetails.ecg}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Рентген">
              <Typography.Text>{epicrisisDetails.x_ray}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Консультации специалистов">
              <Typography.Text>{epicrisisDetails.specialist_consultations}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Лечение">
              <Typography.Text>{epicrisisDetails.treatment}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Результаты лечения">
              <Typography.Text>{epicrisisDetails.treatment_results}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Рекомендации">
              <Typography.Text>{epicrisisDetails.recommendations}</Typography.Text>
            </Descriptions.Item>
          </Descriptions>
          <Button type="primary" onClick={handleEditClick}>
            Редактировать
          </Button>

          <EditEpicrisisModal
            visible={editModalVisible}
            onCancel={() => setEditModalVisible(false)}
            epicrisisDetails={epicrisisDetails}
          />
        </>
      )}
    </Modal>
  );
};

const Epicrisis = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [epicrisisData, setEpicrisisData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [epicrisisIdForDetails, setEpicrisisIdForDetails] = useState(null);
  const [epicris, setEpicrisVisible] = useState(false);
  const { authData } = useAuth();
  const { role } = authData;
  const handleCancel = () => {
    setModalVisible(false);
    setEpicrisVisible(false);
    form.resetFields();
  };

  const fetchData = async () => {
    try {
      await refreshAccessToken();
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };

      const response = await axios.get(`${API_URL}/api/v1/epicrisis/${id}/lists/`, {
        headers,
      });

      setEpicrisisData(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных эпикриза:', error);
    }
  };

  const showEpicrisModal = () => {
    setEpicrisVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDetailsClick = (epicrisisId) => {
    setEpicrisisIdForDetails(epicrisisId);
  };

  const handleDeleteClick = async (epicrisisId) => {
    // Проверяем, есть ли у пользователя роль 'Администратор'
    if (role !== 'Admin') {
      message.error('У вас нет прав на удаление.');
      return;
    }

    // Если у пользователя роль 'Администратор', показываем модальное окно подтверждения
    Modal.confirm({
      title: 'Подтверждение удаления',
      content: 'Вы уверены, что хотите удалить этот эпикриз?',
      okText: 'Да',
      cancelText: 'Нет',
      onOk: async () => {
        // Проверяем, есть ли у пользователя роль 'Администратор'
        if (role !== 'Admin') {
          message.error('У вас нет прав на удаление.');
          return;
        }

        // Если у пользователя роль 'Администратор', продолжаем удаление
        try {
          await refreshAccessToken();
          const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          };

          const response = await axios.delete(`${API_URL}/api/v1/epicrisis/${epicrisisId}/`, {
            headers,
          });
          if (response.status === 204) {
            message.success('Эпикриз успешно удален');
            fetchData();
          }
        } catch (error) {
          console.error('Ошибка при удалении эпикриза:', error);
          message.error('Ошибка при удалении эпикриза');
        }
      },
    });
  };

  return (
    <>
      <Button type="primary" onClick={() => showEpicrisModal()}>
        Добавить эпикриз
      </Button>
      <Table dataSource={epicrisisData} rowKey="id">
        <Column title="Дата начала лечения" dataIndex="start_treatment" key="start_treatment" />
        <Column title="Дата окончания лечения" dataIndex="end_treatment" key="end_treatment" />
        <Column title="Сопутствующее" dataIndex="concomitant" key="concomitant" />
        <Column
          title="Действия"
          key="actions"
          render={(text, record) => (
            <span>
              <Button type="primary" onClick={() => handleDetailsClick(record.id)}>
                Детали
              </Button>
              <Button type="danger" onClick={() => handleDeleteClick(record.id)}>
                Удалить
              </Button>
            </span>
          )}
        />
      </Table>
      {epicris && (
        <CreateEpicrisisModal
          visible={epicris}
          onCancel={handleCancel}
          patientId={id}
          fetchData={fetchData}
        />
      )}
      {epicrisisIdForDetails && (
        <EpicrisisDetails
          epicrisisId={epicrisisIdForDetails}
          onCancel={() => setEpicrisisIdForDetails(null)}
        />
      )}
    </>
  );
};

export default Epicrisis;
