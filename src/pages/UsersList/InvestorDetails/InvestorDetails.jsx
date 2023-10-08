import React, { useState, useEffect } from 'react';
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
  Tag,
  Tooltip,
  Switch,
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const InvestorDetails = () => {
  const { id } = useParams();

  const [investmentData, setInvestmentData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };

  const fetchInvestorData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/inv/detail_attachments/${id}/`, {
        headers,
      });

      setInvestmentData(
        response.data.data.map((item) => ({
          ...item,
          totalInvestments: response.data.total_investments,
          totalPaid: response.data.total_paid,
        })),
      );
      setTotalInvestments(response.data.total_investments);
      setTotalPaid(response.data.total_paid);
    } catch (error) {
      console.error('Error fetching investor data:', error);
    }
  };

  useEffect(() => {
    fetchInvestorData();
  }, []);

  const columns = [
    {
      title: 'Invested Amount',
      dataIndex: 'attachments',
      key: 'attachments',
    },
    {
      title: 'Investment Date',
      dataIndex: 'date_start',
      key: 'date_start',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Payment Date',
      dataIndex: 'date_end',
      key: 'date_end',
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Profit Percentage',
      dataIndex: 'profit_procent',
      key: 'profit_procent',
    },
    {
      title: 'Total Amount',
      dataIndex: 'amount_result',
      key: 'amount_result',
    },
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
    const editedInvestment = investmentData.find((item) => item.id === id);
    form.setFieldsValue({
      investedAmount: editedInvestment.attachments,
      investmentDate: moment(editedInvestment.date_start),
      paymentDate: moment(editedInvestment.date_end),
      profitPercentage: editedInvestment.profit_procent,
      totalAmount: editedInvestment.amount_result,
      status: editedInvestment.status,
    });
    setEditingId(id);
    showModal();
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const requestData = {
          inv: id,
          attachments: values.investedAmount,
          date_start: values.investmentDate.format('YYYY-MM-DD'),
          date_end: values.paymentDate.format('YYYY-MM-DD'),
          profit_procent: values.profitPercentage,
          status: values.status,
        };

        if (editingId) {
          await axios.put(
            `http://127.0.0.1:8000/api/inv/update_attachments/${editingId}/`,
            requestData,
            { headers },
          );
        } else {
          await axios.post('http://127.0.0.1:8000/api/inv/add_attachment/', requestData, {
            headers,
          });
        }

        setModalVisible(false);
        form.resetFields();
        setEditingId(null);
        fetchInvestorData(); // Refresh data after update
      } catch (error) {
        console.error('Error:', error);
      }
    });
  };

  const showDeleteConfirm = async (record) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this investment?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/inv/delete_attachments/${record.id}/`, {
            headers,
          });
          fetchInvestorData(); // Refresh data after delete
        } catch (error) {
          console.error('Error deleting investment:', error);
        }
      },
    });
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
        <Descriptions.Item label="Total Investments">{totalInvestments}</Descriptions.Item>
        <Descriptions.Item label="Total Paid">{totalPaid}</Descriptions.Item>
      </Descriptions>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16, float: 'right' }}
        onClick={() => {
          setEditingId(null);
          showModal();
        }}
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
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InvestorDetails;
