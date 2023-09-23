import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';
import { API_URL } from '../../components/utils/config';
import { refreshAccessToken } from '../../components/utils/refreshToken';
import moment from 'moment';

const Projects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await refreshAccessToken();
      const response = await axios.get(`${API_URL}/api/v1/monthly-income/`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log(response.data);
      setData(Object.entries(response.data).map(([month, income]) => ({ month, income })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    {
      title: 'Месяц',
      dataIndex: 'month',
      key: 'month',
      render: (month) => <span>{moment(month).format('MMMM YYYY')}</span>,
    },

    {
      title: 'Доход',
      dataIndex: 'income',
      key: 'income',
      render: (income) => <span>{income} сом</span>,
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="month" />;
};

export default Projects;
