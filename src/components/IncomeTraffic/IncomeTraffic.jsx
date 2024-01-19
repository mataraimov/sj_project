import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { API_URL } from '../utils/config';
import axios from 'axios';
import { refreshAccessToken } from '../utils/refreshToken';
import moment from 'moment';

const IncomeTraffic = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await refreshAccessToken();
      const response = await axios.get(`${API_URL}/api/v1/income/`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const incomeData = Object.entries(response.data).map(([month, income]) => ({
        month,
        income,
      }));
      setData(incomeData);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const uniqueMonths = [...new Set(data.map(item => moment(item.month).format("MMMM YYYY")))];

  const formattedData = uniqueMonths.map(month => {
    const incomeForMonth = data.find(item => moment(item.month).format("MMMM YYYY") === month);
    return {
      name: month,
      зп: incomeForMonth ? incomeForMonth.income : 0,
    };
  });     
  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart
        width={500}
        height={200}
        data={formattedData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line connectNulls type="monotone" dataKey="зп" stroke="#8884d8" fill="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IncomeTraffic;
