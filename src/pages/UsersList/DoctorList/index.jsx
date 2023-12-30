import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, Select } from "antd";

import axios from "axios";
import { API_URL } from "../../../components/utils/config";
import { refreshAccessToken } from "../../../components/utils/refreshToken";

const { Option } = Select;

const Doctors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deletingDoctorId, setDeletingDoctorId] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await refreshAccessToken();
      const response = await axios.get(`${API_URL}/api/v1/staffs/`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const updateData = async (id, updatedData) => {
    try {
      await refreshAccessToken();
      await axios.patch(`${API_URL}/api/v1/staffs/${id}/`, updatedData, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchData();
      setEditModalVisible(false);
    } catch (error) {
      console.error("Ошибка обновления данных:", error);
    }
  };

  const showDeleteModal = (id) => {
    setDeletingDoctorId(id);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await refreshAccessToken();
      await axios.delete(`${API_URL}/api/v1/staffs/${deletingDoctorId}/`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setDeleteModalVisible(false);
      fetchData();
    } catch (error) {
      console.error("Ошибка удаления данных:", error);
    }
  };

  const closeModal = () => {
    setDeletingDoctorId(null);
    setDeleteModalVisible(false);
    setEditModalVisible(false);
    setEditingDoctor(null);
    form.resetFields();
  };

  const handleEdit = async () => {
    try {
      await refreshAccessToken();
      await axios.patch(
        `${API_URL}/api/v1/staffs/${editingDoctor.id}/`,
        editingDoctor,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setEditModalVisible(false);
      fetchData();
    } catch (error) {
      console.error("Ошибка обновления данных:", error);
    }
  };

  const handleEditInputChange = (value, field) => {
    setEditingDoctor({
      ...editingDoctor,
      [field]: value,
    });
  };

  const showEditModal = (record) => {
    setEditingDoctor({ ...record });
    form.setFieldsValue({
      phone: record.phone,
      name: record.name,
      password: record.password,
      role: record.role,
    });
    setEditModalVisible(true);
  };

  const onFinish = (values) => {
    setEditingDoctor({
      ...editingDoctor,
      ...values,
    });
    handleUpdate();
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        updateData(editingDoctor.id, values);
      })
      .catch((errorInfo) => {
        console.log("Проверка не удалась:", errorInfo);
      });
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Фамилия",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Номер телефона",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Действия",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => showEditModal(record)}>
            Редактировать
          </Button>
          <Button type="danger" onClick={() => showDeleteModal(record.id)}>
            Удалить
          </Button>
        </span>
      ),
    },
  ];

  const d = {
    form: "custom-form-class",
    form_span: "custom-span-class",
    input: "custom-input-class",
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="phone"
      />
      <Modal
        title="Подтверждение удаления"
        visible={deleteModalVisible}
        onCancel={closeModal}
        onOk={handleDelete}
      >
        <p>Вы уверены, что хотите удалить этого сотрудника?</p>
      </Modal>
      <Modal
        title="Изменить сотрудника"
        visible={editModalVisible}
        onCancel={closeModal}
        onOk={handleUpdate}
      >
        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          className={d.form}
          initialValues={editingDoctor}
        >
          <div className={d.form_input}>
            <span className={d.form_span}>Номер телефона:</span>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
              className={d.input}
            >
              <Input
                onChange={(e) => handleEditInputChange(e.target.value, "phone")}
              />
            </Form.Item>
          </div>
          <div className={d.form_input}>
            <span className={d.form_span}>Имя:</span>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
              className={d.input}
            >
              <Input
                onChange={(e) => handleEditInputChange(e.target.value, "name")}
              />
            </Form.Item>
          </div>

          <div className={d.form_input}>
            <span className={d.form_span}>Роль:</span>
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please select a role!",
                },
              ]}
              className={d.input}
            >
              <Select
                placeholder="Select a role"
                onChange={(value) => handleEditInputChange(value, "role")}
              >
                <Option value="1">Админ</Option>
                <Option value="2">Доктор</Option>
                <Option value="3">Психолог</Option>
                <Option value="4">Мед-сестра</Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Doctors;
