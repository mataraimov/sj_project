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
        console.error('Error fetching epicrisis details:', error);
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
        <p>Loading...</p>
      ) : (
        <>
          <Descriptions column={1}>
            <Descriptions.Item label="Start Treatment">
              {moment(epicrisisDetails.start_treatment).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="End Treatment">
              {moment(epicrisisDetails.end_treatment).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="Main Diagnosis">
              <Typography.Text>{epicrisisDetails.main_diagnosis}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Concomitant">
              <Typography.Text>{epicrisisDetails.concomitant}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Complications">
              <Typography.Text>{epicrisisDetails.complications}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Laboratory Tests">
              <Typography.Text>{epicrisisDetails.laboratory_tests}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Instrumental Studies">
              <Typography.Text>{epicrisisDetails.instrumental_studies}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="ECG">
              <Typography.Text>{epicrisisDetails.ecg}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="X Ray">
              <Typography.Text>{epicrisisDetails.x_ray}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Specialist Consultations">
              <Typography.Text>{epicrisisDetails.specialist_consultations}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Treatment">
              <Typography.Text>{epicrisisDetails.treatment}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Treatment Results">
              <Typography.Text>{epicrisisDetails.treatment_results}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item label="Recommendations">
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
      console.error('Error fetching epicrisis data:', error);
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
    // Check if the user has the 'Admin' role
    if (role !== 'Admin') {
      message.error('You do not have permission to delete.');
      return;
    }

    // If 'Admin', show the confirmation modal
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this epicrisis?',
      okText: 'Да',
      cancelText: 'Нет',
      onOk: async () => {
        // Check if the user has the 'Admin' role
        if (role !== 'Admin') {
          message.error('You do not have permission to delete.');
          return;
        }

        // If 'Admin', proceed with deletion
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
            message.success('Epicrisis successfully deleted');
            fetchData();
          }
        } catch (error) {
          console.error('Error deleting epicrisis:', error);
          message.error('Error deleting epicrisis');
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
        <Column title="Начало лечения" dataIndex="start_treatment" key="start_treatment" />
        <Column title="Конец лечения" dataIndex="end_treatment" key="end_treatment" />
        <Column title="Сопутствующий" dataIndex="concomitant" key="concomitant" />
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
