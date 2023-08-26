import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Table } from 'antd';
import axios from 'axios';

const InvestorDetails = () => {
  const { id } = useParams();
  const [investorData, setInvestorData] = useState({});
  const [investmentData, setInvestmentData] = useState([]);

  useEffect(() => {
    fetchInvestorData();
  }, []);

  const fetchInvestorData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/investor_details/${id}`);
      setInvestorData(response.data.investor);
      setInvestmentData(response.data.investmentData);
    } catch (error) {
      console.error('Error fetching investor data:', error);
    }
  };

  const columns = [
    { title: 'Invested Amount', dataIndex: 'investedAmount', key: 'investedAmount' },
    { title: 'Received Amount', dataIndex: 'receivedAmount', key: 'receivedAmount' },
    { title: 'Investment Date', dataIndex: 'investmentDate', key: 'investmentDate' },
    { title: 'Profit Percentage', dataIndex: 'profitPercentage', key: 'profitPercentage' },
    // ...
  ];

  return (
    <div>
      <Descriptions title="Investor Details">
        <Descriptions.Item label="Name">{investorData.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{investorData.email}</Descriptions.Item>
        {/* Additional investor details */}
      </Descriptions>
      <Table columns={columns} dataSource={investmentData} />
    </div>
  );
};

export default InvestorDetails;
