import { NavLink, Outlet } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import Logo from './Logo';
import type { MenuProps } from 'antd';
import { CiShoppingBasket } from 'react-icons/ci';

const { Header, Sider, Content, Footer } = Layout;

const PrivateLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      'Rodzina',
      '/family',
      <NavLink to="/family">
        <HomeOutlined />
      </NavLink>,
    ),
    getItem(
      'Finanse',
      '/finances',
      <NavLink to="/finances">
        <PieChartOutlined />
      </NavLink>,
    ),
    getItem(
      'Lista zakupów',
      '/shopping-list',
      <NavLink to="/shopping-list">
        <CiShoppingBasket size={17} color="white" />
      </NavLink>,
    ),
    getItem(
      'Wyloguj się',
      '/auth/logout',
      <div className="logout-btn">
        <NavLink to="/auth/logout">
          <CiLogout color="white" strokeWidth={0.5} size={18} />
        </NavLink>
      </div>,
    ),
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Logo />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Copyright ©{new Date().getFullYear()} Created by JKM
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
