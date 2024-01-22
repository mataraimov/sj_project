import { Input, AutoComplete } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../utils/config';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../utils/refreshToken';

const SearchPatients = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const fetchData = debounce(async (value) => {
    try {
      await refreshAccessToken(); 

      const response = await axios.get(`${API_URL}/api/v1/income/lists`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        params: {
          search: value,
        },
      });
      const filteredResults = response.data.filter((user) => {
        return user && user.name && user.name.toLowerCase().includes(value.toLowerCase());
      });
      setResults(filteredResults);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }, 600);

  const navigate = useNavigate();

  const showDetails = (record) => {
    navigate(`/patient/${record.id}`, { state: { patientData: record } });
  };

  const handleChange = (value) => {
    setSearch(value);
    fetchData(value);
  };

  const options = results.map((user) => ({
    value: user.name,
    label: (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          onClick={() => showDetails(user)}>
          <a style={{ color: '#000' }} onClick={() => showDetails(user)}>
            {user.name}
          </a>

          <a style={{ color: '#1890ff' }} onClick={() => showDetails(user)}>
            Детали
          </a>
        </div>
      </>
    ),
  }));

  return (
    <AutoComplete
      value={search}
      options={options}
      style={{ width: '400px', padding: '5px 12px' }}
      onSelect={(value) => setSearch(value)}
      onSearch={handleChange}
      placeholder="Поиск пациентов..."
    />
  );
};

export default SearchPatients;
