import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

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

  const is_admin = localStorage.getItem('is_admin');

  const items = [
    getItem('Home', '1', '/', <HomeOutlined />),
  ];

  if (is_admin == 'true') {
    items.push(
      getItem('Admin', 'sub1', '', <UserOutlined />, [
        getItem('Admin Panel', '2', '/admin'),
        getItem('Investor-List', '3', '/investor-list'),
        getItem('Developer-List', '4', '/developer-list'),
      ])
    );
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: '100vh' }}>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  );
};

export default SiderBarComponent;
