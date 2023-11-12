import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Button, message, Input, DatePicker } from 'antd';
import moment from 'moment';

import { API_URL } from '../../../../components/utils/config';
import { refreshAccessToken } from '../../../../components/utils/refreshToken';

const CreateEpicrisisModal = ({ visible, onCancel, patientId, fetchData }) => {
  const [form] = Form.useForm();
  const [values, setValues] = useState({});

  const handleOk = async () => {
    try {
      const formValues = form.getFieldsValue();

      const finalValues = {
        ...formValues,
        start_treatment: moment(values.start_treatment).format('YYYY-MM-DD'),
        end_treatment: moment(values.end_treatment).format('YYYY-MM-DD'),
      };
      await refreshAccessToken();
      console.log(finalValues);
      console.log(values);
      await axios.post(`${API_URL}/api/v1/epicrisis/${patientId}/post/`, finalValues, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      message.success('Epicrisis successfully created');
      form.resetFields();
      fetchData();
      onCancel();
    } catch (error) {
      console.error('Error creating epicrisis:', error);
      message.error('Error creating epicrisis');
    }
  };

  return (
    <Modal
      title="Create Epicrisis"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={(formValues) => {
          setValues(formValues);
        }}
      >
        <Form.Item
          name="start_treatment"
          label="Start Treatment"
          rules={[{ required: true, message: 'Please select start treatment date' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="end_treatment"
          label="End Treatment"
          rules={[{ required: true, message: 'Please select end treatment date' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="main_diagnosis"
          label="Main Diagnosis"
          rules={[
            { required: true, message: 'Please enter main diagnosis' },
            { max: 255, message: 'Main diagnosis must be at most 255 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="concomitant"
          label="Concomitant"
          rules={[
            { required: true, message: 'Please enter concomitant' },
            { max: 125, message: 'Concomitant must be at most 125 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="complications"
          label="Complications"
          rules={[
            { required: true, message: 'Please enter complications' },
            { max: 255, message: 'Complications must be at most 255 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="laboratory_tests"
          label="Laboratory Tests"
          rules={[
            { required: true, message: 'Please enter laboratory tests' },
            { max: 255, message: 'Laboratory tests must be at most 255 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="instrumental_studies"
          label="Instrumental Studies"
          rules={[
            { required: true, message: 'Please enter instrumental studies' },
            { max: 255, message: 'Instrumental studies must be at most 255 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ecg"
          label="ECG"
          rules={[
            { required: true, message: 'Please enter ECG' },
            { max: 255, message: 'ECG must be at most 255 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="x_ray"
          label="X Ray"
          rules={[
            { required: true, message: 'Please enter X Ray' },
            { max: 125, message: 'X Ray must be at most 125 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="specialist_consultations"
          label="Specialist Consultations"
          rules={[
            { required: true, message: 'Please enter specialist consultations' },
            { max: 255, message: 'Specialist consultations must be at most 255 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="treatment"
          label="Treatment"
          rules={[
            { required: true, message: 'Please enter treatment' },
            { max: 255, message: 'Treatment must be at most 255 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="treatment_results"
          label="Treatment Results"
          rules={[
            { required: true, message: 'Please enter treatment results' },
            { max: 255, message: 'Treatment results must be at most 255 characters' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="recommendations"
          label="Recommendations"
          rules={[{ max: 255, message: 'Recommendations must be at most 255 characters' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEpicrisisModal;
