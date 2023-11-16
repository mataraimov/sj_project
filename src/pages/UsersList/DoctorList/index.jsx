import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";

import axios from "axios";
import { API_URL } from "../../../components/utils/config";
import { refreshAccessToken } from "../../../components/utils/refreshToken";

const Doctors = () => {
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
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateData = async (id, updatedData) => {
    try {
      console.log(updateData);
      console.log(id);
      await refreshAccessToken();
      await axios.put(`${API_URL}/api/v1/staffs/${id}/`, updatedData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      await refreshAccessToken();
      console.log(id);
      await axios.delete(`${API_URL}/api/v1/staffs/${id}/`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => updateData(record)}>
            Редактировать
          </Button>
          <Button type="danger" onClick={() => deleteData(record)}>
            Удалить
          </Button>
        </span>
      ),
    },

  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="phone"
    />
  );
};

export default Doctors;
