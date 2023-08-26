import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {
  Descriptions,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Space,
  Tag,
  Tooltip,
  Switch,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const InvestorDetails = () => {
  const { id } = useParams();
  const [investorData, setInvestorData] = useState({});
  const [investmentData, setInvestmentData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  const columns = [
    { title: 'Invested Amount', dataIndex: 'investedAmount', key: 'investedAmount' },
    { title: 'Investment Date', dataIndex: 'investmentDate', key: 'investmentDate', render: (text) => moment(text).format('YYYY-MM-DD') },
    { title: 'Payment Date', dataIndex: 'paymentDate', key: 'paymentDate', render: (text) => moment(text).format('YYYY-MM-DD') },
    { title: 'Profit Percentage', dataIndex: 'profitPercentage', key: 'profitPercentage' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={status ? 'green' : 'red'}>{status ? 'Paid' : 'Pending'}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <a onClick={() => editInvestment(record.id)}>
              <EditOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Delete">
            <a onClick={() => showDeleteConfirm(record)}>
              <DeleteOutlined style={{ color: 'black' }} />
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const editInvestment = (id) => {
    setEditingId(id);
    form.setFieldsValue(investmentData.find((item) => item.id === id));
    showModal();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingId) {
        const updatedInvestmentData = investmentData.map((item) =>
          item.id === editingId ? { ...item, ...values } : item,
        );
        setInvestmentData(updatedInvestmentData);
      } else {
        const newInvestment = { ...values, id: investmentData.length + 1 };
        setInvestmentData([...investmentData, newInvestment]);
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
    const updatedInvestmentData = investmentData.filter((item) => item.id !== id);
    setInvestmentData(updatedInvestmentData);
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
      <Descriptions title="Investor Details">
        <Descriptions.Item label="Name">{investorData.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{investorData.email}</Descriptions.Item>
      </Descriptions>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16, float: 'right' }}
        onClick={showModal}
      >
        Add Investment
      </Button>
      <Table columns={columns} dataSource={investmentData} />
      <Modal
        title={editingId ? 'Edit Investment' : 'Add Investment'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name="investedAmount" label="Invested Amount">
            <InputNumber />
          </Form.Item>
          <Form.Item name="investmentDate" label="Investment Date">
            <DatePicker />
          </Form.Item>
          <Form.Item name="paymentDate" label="Payment Date">
            <DatePicker />
          </Form.Item>
          <Form.Item name="profitPercentage" label="Profit Percentage">
            <InputNumber />
          </Form.Item>
          <Form.Item name="totalAmount" label="Total Amount">
            <InputNumber />
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InvestorDetails;
