import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Table } from "antd";
import axios from "axios";

const DeveloperDetails = () => {
  const { id } = useParams();
  const [developerData, setDeveloperData] = useState({});
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetchDeveloperData();
  }, []);

  const fetchDeveloperData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/users/developer_details/${id}`
      );
      setDeveloperData(response.data.developer);
      setProjectData(response.data.projectData);
    } catch (error) {
      console.error("Error fetching developer data:", error);
    }
  };

  const columns = [
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
  ];

  return (
    <div>
      <Descriptions title="Developer Details">
        <Descriptions.Item label="Name">{developerData.name}</Descriptions.Item>
        <Descriptions.Item label="Email">
          {developerData.email}
        </Descriptions.Item>
        <Descriptions.Item label="Level">
          {developerData.level}
        </Descriptions.Item>
        {/* Additional developer details */}
      </Descriptions>
      <Table columns={columns} dataSource={projectData} />
    </div>
  );
};

export default DeveloperDetails;
