import { Input, AutoComplete } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../utils/config";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";

const SearchPatients = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = debounce((value) => {
    axios
      .get(`${API_URL}/api/v1/income/lists`, {
        params: {
          search: value,
        },
      })
      .then((response) => {
        const filteredResults = response.data.filter((user) => {
          return (
            user &&
            user.name &&
            user.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(filteredResults);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
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
        <span onClick={() => showDetails(user)}>
          <a
            style={{ color: "#1890ff" }}
            onClick={() => showDetails(user)}
          >
            {user.name}
          </a>
        </span>
      </>
    ),
  }));

  return (
    <AutoComplete
      value={search}
      options={options}
      style={{ width: "400px", padding: "5px 12px" }}
      onSelect={(value) => setSearch(value)}
      onSearch={handleChange}
      placeholder="Поиск пациентов..."
    />
  );
};

export default SearchPatients;
