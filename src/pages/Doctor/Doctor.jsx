import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import a from './Doctor.module.css';

const Doctor = () => {
  return (
    <div className={a.admin}>
      <Link to="/admin/create-patient">
        <Button>Создать пациента</Button>
      </Link>
    </div>
  );
};

export default Doctor;
