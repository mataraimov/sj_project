import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import HeaderComponent from '../Header/Header'; // Импортируем созданный компонент
import SiderBarComponent from '../Sidebar/Sidebar'; // Импортируем созданный компонент

const { Content } = Layout;

const LayoutWrapper = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout>
            <SiderBarComponent collapsed={collapsed} />
            <Layout>
                <HeaderComponent collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                <Content
                    style={{
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutWrapper;
