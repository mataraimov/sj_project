import React from 'react';

const SixStep = ({ form, statusOptions, nextStep, prevStep }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h2>Форма заполнена, нажмите сохранить чтобы закончить работу.</h2>
      <img style={{width: '200px', padding:'50px'}} src="https://cdn-icons-png.flaticon.com/512/4225/4225683.png" alt="" />
    </div>
  );
};

export default SixStep;
