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
const items = [
  getItem('Home', '1', '/', <HomeOutlined />),
  getItem('Admin', 'sub1', '', <UserOutlined />, [
    getItem('Admin Panel', '2', '/admin',),
    getItem('Investor-List', '3', '/investor-list'),
    getItem('Developer-List', '4', '/developer-list'),
  ]),
];

const SiderBarComponent = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: '100vh' }}>
      <img style={{width: '50px'}} src="https://www.freepnglogos.com/new-twitter-x-logo-transparent-png-4.png" alt="" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  );
};

export default SiderBarComponent;
