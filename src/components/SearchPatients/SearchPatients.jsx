import { Input } from "antd";
import React, { createContext, useState } from "react";

const SearchPatients = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск пациентов..."
        style={{ width: "400px", padding: "5px 12px" }}
      />
    </>
  );
};

export default SearchPatients;
