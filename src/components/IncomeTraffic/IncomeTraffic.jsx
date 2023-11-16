import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { API_URL } from "../utils/config";
import axios from "axios";
import { refreshAccessToken } from "../utils/refreshToken";
import moment from "moment";

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
      console.log(response.data);
      const incomeData = Object.entries(response.data).map(([month, income]) => ({
        month,
        income,
      }));
      setData(incomeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const uniqueMonths = [...new Set(data.map(item => moment(item.month).format("MMMM YYYY")))];

  const formattedData = uniqueMonths.map(month => {
    const incomeForMonth = data.find(item => moment(item.month).format("MMMM YYYY") === month);
    return {
      name: month,
      pv: incomeForMonth ? incomeForMonth.income : 0,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        data={formattedData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeTraffic;
