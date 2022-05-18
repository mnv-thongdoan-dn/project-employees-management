import React, {useState} from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Chart, Employees, CreateEmployee, EditEmployee } from '../../components/Lazy';
import { Layout, Menu, Button } from 'antd';
import BreadcrumbDashboard from '../../components/Breadcrumb';
import useAuth from '../../hooks/Auth';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  AreaChartOutlined, 
  UserAddOutlined, 
  LogoutOutlined 
} from '@ant-design/icons';

const Dashboard = () => {
  const { logout } = useAuth();
  const [ collapsed, setCollapsed ] = useState(false);
  const { Header, Content, Sider, Footer } = Layout;
  const location = useLocation();

  const toggle = () => {
    setCollapsed(!collapsed);
  }

  return (
    <div className='page-dashboard'>
      <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
        >
          <Menu.Item key='/dashboard'>
            <AreaChartOutlined />
            <span>Chart </span>
            <Link to='/dashboard' />
          </Menu.Item>
          <Menu.Item key='/dashboard/employees'>
            <UserAddOutlined />
            <span>Employees </span>
            <Link to='/dashboard/employees' />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <div className='trigger' onClick={toggle}>{collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}</div>
          <Button className='btn btn-logout' onClick={() => logout()}>Logout <LogoutOutlined /></Button>
        </Header>
        <BreadcrumbDashboard/>
        <Content
          >
          <Routes>
            <Route path='/' element={<Chart/>} />
            <Route path='employees' element={<Employees/>}/>
            <Route path='employees/create' element={<CreateEmployee/>}/>
            <Route path='employees/edit' element={<EditEmployee/>}/>
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Thong Doan Design ©2022 Created by Ant UED</Footer>
      </Layout>
      </Layout>
    </div>
  )
}

export default Dashboard;
