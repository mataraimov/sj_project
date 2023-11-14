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

const SiderBarComponent = ({ collapsed, userRole }) => {
  const items = [getItem('Home', '1', '/', <HomeOutlined />)];

  if (userRole === 'Admin') {
    items.push(
      getItem('Админ', 'sub1', '', <UserOutlined />, [
        getItem('Дашборд', '2', '/admin'),
        getItem('Пациенты', '3', '/patient-list'),
        getItem('Докторы', '4', '/doctor-list'),
        getItem('Доходы', '5', '/revenues'),
      ]),
    );
  } else {
    items.push(
      getItem(`${userRole}`, 'sub1', '', <UserOutlined />, [
        getItem('Пациенты', '3', '/patient-list'),
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
