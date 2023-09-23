import React, { useEffect, useState } from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { refreshAccessToken } from './../../utils/refreshToken';
import { API_URL } from '../../utils/config';
const { Sider } = Layout;

function getItem(label, key, path, icon, children) {
  return {
    key,
    icon,
    children,
    label: path ? <Link to={path}>{label}</Link> : label,
  };
}

const SiderBarComponent = ({ collapsed }) => {
  const [userRole, setUserRole] = useState(null);

  const items = [getItem('Home', '1', '/', <HomeOutlined />)];
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        await refreshAccessToken();
        const response = await axios.get(`${API_URL}/api/v1/me/`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        console.log(response.data.role);
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  if (userRole === 'Admin') {
    // Если пользователь - админ
    items.push(
      getItem('Админ', 'sub1', '', <UserOutlined />, [
        getItem('Дашборд', '2', '/admin'),
        getItem('Пациенты', '3', '/investor-list'),
        getItem('Докторы', '4', '/developer-list'),
        getItem('Доходы', '5', '/projects'),
      ]),
    );
  } else {
    items.push(
      getItem(`${userRole}`, 'sub1', '', <UserOutlined />, [
        getItem('Дашборд', '2', '/doctor'),
        getItem('Пациенты', '3', '/investor-list'),
      ]),
    );
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: '100vh' }}>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  );
};

export default SiderBarComponent;
