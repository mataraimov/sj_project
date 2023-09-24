import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, theme } from 'antd';

const { Header } = Layout;

const HeaderComponent = ({ collapsed, toggleCollapsed, userRole }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };
  const items = [
    {
      label: <a href="https://www.antgroup.com">Профиль</a>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <a onClick={handleLogout}>Выйти</a>,
      key: '1',
      danger: true,
    },
  ];
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        borderBottom: '0.5px solid black',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Dropdown menu={{ items }} trigger={['click']}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            marginRight: '15px',
            cursor: 'pointer',
          }}
        >
          {
            <>
              <span>{userRole}</span>
              <Avatar size="large" icon={<UserOutlined />} />
            </>
          }
        </div>
      </Dropdown>
    </Header>
  );
};

export default HeaderComponent;
