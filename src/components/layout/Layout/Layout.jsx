import { useState } from 'react';
import { Layout, theme } from 'antd';
import HeaderComponent from '../Header/Header';
import SiderBarComponent from '../Sidebar/Sidebar';
import { useAuth } from '../../utils/context';

const { Content } = Layout;

const LayoutWrapper = ({ children }) => {
  const { authData } = useAuth();
  const { role } = authData;
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <SiderBarComponent collapsed={collapsed} userRole={role} />
      <Layout>
        <HeaderComponent userRole={role} collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
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
