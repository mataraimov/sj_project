import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Button, message } from 'antd';
import { refreshAccessToken } from '../../../../components/utils/refreshToken';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';
import FifthStep from './FifthStep';
import { API_URL } from '../../../../components/utils/config';
import SixStep from './SixStep';

const CreateSessionModal = ({ visible, onCancel, patientId, fetchData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [statusOptions, setStatusOptions] = useState([]);
  const [form] = Form.useForm();
  const [values, setValues] = useState({});
  const handleOk = async () => {
    try {
      const finalValues = {
        ...values,
        anamnesis: {
          ...values.anamnesis,
        },
      };

      await refreshAccessToken();
      console.log(finalValues);
      await axios.post(`${API_URL}/api/v1/records/${patientId}/record/`, finalValues, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      message.success('Сессия успешно создана');
      form.resetFields();
      fetchData();
      onCancel();
    } catch (error) {
      console.error('Ошибка создания сессии', error);
      message.error('Ошибка при создании сессии');
    }
  };
  const nextStep = (stepValues) => {
    setValues({
      ...values,
      ...stepValues,
    });
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    <FirstStep nextStep={nextStep} form={form} statusOptions={statusOptions} />,
    <SecondStep
      nextStep={nextStep}
      prevStep={prevStep}
      form={form}
      statusOptions={statusOptions}
    />,
    <ThirdStep nextStep={nextStep} prevStep={prevStep} form={form} statusOptions={statusOptions} />,
    <FourthStep
      nextStep={nextStep}
      prevStep={prevStep}
      form={form}
      statusOptions={statusOptions}
    />,
    <FifthStep
      handleOk={handleOk}
      nextStep={nextStep}
      prevStep={prevStep}
      form={form}
      statusOptions={statusOptions}
    />,
    <SixStep
      handleOk={handleOk}
      nextStep={nextStep}
      prevStep={prevStep}
      form={form}
      statusOptions={statusOptions}
    />,
  ];

  const fetchStatusOptions = async () => {
    try {
      const statusList = [
        'arrives_list',
        'availability_list',
        'conditions_list',
        'conjunctiva_list',
        'education_list',
        'family_list',
        'heart_list',
        'filling_list',
        'pupils_list',
        'situation_list',
        'skin_list',
        'views_list',
        'nutrition_list',
        'wheezing_list',
      ];

      const options = {};

      for (const statusType of statusList) {
        const response = await axios.get(`${API_URL}/api/v1/status/${statusType}/`);
        options[statusType] = response.data;
      }
      setStatusOptions(options);
    } catch (error) {
      console.error('Ошибка при получении параметров статуса:', error);
    }
  };

  useEffect(() => {
    fetchStatusOptions();
  }, []);

  return (
    <Modal
      width={900}
      title="Добавить сессию"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={prevStep}>
          Назад
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Сохранить
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
      ]}
    >
      {steps[currentStep - 1]}
    </Modal>
  );
};

export default CreateSessionModal;
