import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import a from './Admin.module.css';

const Admin = () => {
  return (
    <div className={a.admin}>
      <Link to="/admin/create-patient">
        <Button>Создать пациента</Button>
      </Link>
      <Link to="/admin/create-doctor">
        <Button>Создать сотрудника</Button>
      </Link>
    </div>
  );
};

export default Admin;
