import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
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
} from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const DeveloperDetails = () => {
  const { id } = useParams();
  const [developerData, setDeveloperData] = useState({});
  const [paymentData, setPaymentData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDeveloperData();
  }, []);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  };

  const fetchDeveloperData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/dev/dev_detail/${id}/`, {
        headers,
      });
      setDeveloperData(response.data[0]);

      if (response.data[0].dev) {
        await fetchPaymentData(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching developer data:', error);
    }
  };

  const fetchPaymentData = async (developerId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/dev/dev_salaries/${developerId}/`,
      );
      setPaymentData(response.data);
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  const editPayment = (id) => {
    const editedPayment = paymentData.find((item) => item.id === id);
    if (editedPayment) {
      const { work_start, work_end, salary_amount } = editedPayment;

      form.setFieldsValue({
        work_start: moment(work_start, 'YYYY-MM-DD'),
        work_end: moment(work_end, 'YYYY-MM-DD'),
        salary_amount: salary_amount,
      });

      setEditingId(id);
      showModal();
    } else {
      console.error(`Payment with id ${id} not found.`);
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        work_start: moment(values.work_start).format('YYYY-MM-DD'),
        work_end: moment(values.work_end).format('YYYY-MM-DD'),
      };

      if (editingId) {
        const updatedPaymentData = paymentData.map((item) =>
          item.id === editingId ? { ...item, ...formattedValues } : item,
        );
        setPaymentData(updatedPaymentData);
      } else {
        const newPayment = { ...formattedValues, id: paymentData.length + 1 };
        setPaymentData([...paymentData, newPayment]);
      }
      setModalVisible(false);
      form.resetFields();
      setEditingId(null);
    });
  };

  const handleAddPayment = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        work_start: moment(values.work_start).format('YYYY-MM-DD'),
        work_end: moment(values.work_end).format('YYYY-MM-DD'),
      };
      axios
        .post(
          'http://127.0.0.1:8000/api/dev/salary_create/',
          {
            dev: developerData.id,
            ...formattedValues,
          },
          { headers: headers },
        )
        .then((response) => {
          const newPayment = { ...response.data, id: paymentData.length + 1 };
          setPaymentData([...paymentData, newPayment]);
          setModalVisible(false);
          form.resetFields();
        })
        .catch((error) => {
          console.error('Error adding payment:', error);
        });
    });
  };

  const showDeleteConfirm = (record) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this payment?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDelete(record.id),
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/dev/salary_delete/${id}/`, {
        headers,
      })
      .then(() => {
        const updatedPaymentData = paymentData.filter((item) => item.id !== id);
        setPaymentData(updatedPaymentData);
      })
      .catch((error) => {
        console.error('Error deleting payment:', error);
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

  const columns = [
    {
      title: 'Start Date',
      dataIndex: 'work_start',
      key: 'work_start',
      render: (text) => moment(text, 'YYYY-MM-DD').format('LL'),
    },
    {
      title: 'End Date',
      dataIndex: 'work_end',
      key: 'work_end',
      render: (text) => moment(text, 'YYYY-MM-DD').format('LL'),
    },
    {
      title: 'Summa',
      dataIndex: 'salary_amount',
      key: 'salary_amount',
    },
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
              <DeleteOutlined style={{ color: 'black' }} />
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Descriptions title="Developer Details">
        <Descriptions.Item label="Role">{developerData?.dev_role}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {developerData?.dev_phone_number}
        </Descriptions.Item>
        <Descriptions.Item label="Level">{developerData?.dev_level}</Descriptions.Item>
        <Descriptions.Item label="Start">
          {moment(developerData?.dev_work_start).format('YYYY-MM-DD')}
        </Descriptions.Item>
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
        onOk={editingId ? handleOk : handleAddPayment}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name="work_start" label="Start Date">
            <DatePicker />
          </Form.Item>
          <Form.Item name="work_end" label="End Date">
            <DatePicker />
          </Form.Item>
          <Form.Item name="salary_amount" label="Summa">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeveloperDetails;
