import React, { useState, useEffect } from 'react';
import { Space, Table } from 'antd';

import axios from 'axios';
import { API_URL } from '../../../components/utils/config';
import { refreshAccessToken } from '../../../components/utils/refreshToken';

const DeveloperList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await refreshAccessToken();
      const response = await axios.get(`${API_URL}/api/v1/staffs/`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return <Table columns={columns} dataSource={data} loading={loading} rowKey="phone" />;
};

export default DeveloperList;
