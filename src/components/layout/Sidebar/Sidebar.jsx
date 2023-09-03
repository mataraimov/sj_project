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

  const items = [getItem('Home', '1', '/', <HomeOutlined />)];

  if (is_admin == 'false') {
    items.push(
      getItem('Админ', 'sub1', '', <UserOutlined />, [
        getItem('Дашборд', '2', '/admin'),
        getItem('Пациенты', '3', '/investor-list'),
        getItem('Разработчики', '4', '/developer-list'),
        getItem('Проекты', '5', '/projects'),
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
