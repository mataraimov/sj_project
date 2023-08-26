import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {
  Descriptions,
  Table,
  Button,
  Modal,
  Form,
  DatePicker,
  InputNumber,
  Space,
  Tooltip,
  Switch,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const DeveloperDetails = () => {
  const { id } = useParams();
  const [developerData, setDeveloperData] = useState({});
  const [paymentData, setPaymentData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const columns = [
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate', render: (text) => moment(text).format('YYYY-MM-DD') },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate', render: (text) => moment(text).format('YYYY-MM-DD') },
    { title: 'Summa', dataIndex: 'summa', key: 'summa' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <a onClick={() => editPayment(record.id)}>
              <EditOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Delete">
            <a onClick={() => showDeleteConfirm(record)}>
              <DeleteOutlined  style={{ color: 'black' }} />
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const editPayment = (id) => {
    setEditingId(id);
    form.setFieldsValue(paymentData.find((item) => item.id === id));
    showModal();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingId) {
        const updatedInvestmentData = paymentData.map((item) =>
          item.id === editingId ? { ...item, ...values } : item,
        );
        setPaymentData(updatedInvestmentData);
      } else {
        const newInvestment = { ...values, id: paymentData.length + 1 };
        setPaymentData([...paymentData, newInvestment]);
      }
      setModalVisible(false);
      form.resetFields();
      setEditingId(null);
    });
  };

  const showDeleteConfirm = (record) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this investment?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDelete(record.id),
    });
  };

  const handleDelete = (id) => {
    const updatedPaymentData = paymentData.filter((item) => item.id !== id);
    setPaymentData(updatedPaymentData);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setEditingId(null);
  };

  return (
    <div>
      <Descriptions title="Developer Details">
        <Descriptions.Item label="Name">Kairat</Descriptions.Item>
        <Descriptions.Item label="Email">kairat.keihatsu@gmail.com</Descriptions.Item>
        <Descriptions.Item label="Level">Front-end</Descriptions.Item>
        <Descriptions.Item label="Start">2023-01-15</Descriptions.Item>
      </Descriptions>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16, float: 'right' }}
        onClick={showModal}
      >
        Add payment
      </Button>
      <Table columns={columns} dataSource={paymentData} />
      <Modal
        title={editingId ? 'Edit Payment' : 'Add Payment'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name="startDate" label="Start Date">
            <DatePicker />
          </Form.Item>
          <Form.Item name="endDate" label="End Date">
            <DatePicker />
          </Form.Item>
          <Form.Item name="summa" label="Summa">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeveloperDetails;
