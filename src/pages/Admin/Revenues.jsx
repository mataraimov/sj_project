import { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { API_URL } from '../../components/utils/config';
import { refreshAccessToken } from '../../components/utils/refreshToken';
import moment from 'moment';
import IncomeTraffic from '../../components/IncomeTraffic/IncomeTraffic';
import { useNavigate } from 'react-router-dom';

const Revenues = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await refreshAccessToken();
      const response = await axios.get(`${API_URL}/api/v1/income/lists`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };
  const navigate = useNavigate();
  const showDetails = (record) => {
    navigate(`/patient/${record.id}`, { state: { patientData: record } });
  };
  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Доход',
      dataIndex: 'total_profit',
      key: 'total_profit',
    },

    {
      title: 'Последнее обновление',
      dataIndex: 'patient_info',
      key: 'patient_info',
      render: (patientInfo) => (
        <span>
          {moment(patientInfo[patientInfo.length - 1]?.date_of_admission).format('DD/MM/YYYY')}
        </span>
      ),
    },
    {
      render: (text, record) => (
        <span>
          <a style={{ color: '#1890ff' }} onClick={() => showDetails(record)}>
            Детали
          </a>
        </span>
      ),
    },
  ];
  const styles = {
    tableContainer: {
      marginTop: '60px',
    },
  };
  return (
    <>
      <IncomeTraffic />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record, index) => index}
        style={styles.tableContainer}
      />
    </>
  );
};

export default Revenues;
