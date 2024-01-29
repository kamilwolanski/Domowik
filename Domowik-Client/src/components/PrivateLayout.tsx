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
import { useQuery } from 'react-query';
import { getUser } from '../Api/api';

const { Header, Sider, Content, Footer } = Layout;

const PrivateLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { isLoading: userDataLoading, data: userData } = useQuery(
    'user',
    getUser,
  );

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    disabled?: boolean,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      disabled,
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
      userData?.data.familyId ? (
        <NavLink to="/finances">
          <PieChartOutlined />
        </NavLink>
      ) : (
        <PieChartOutlined />
      ),
      userData?.data.familyId ? false : true,
    ),
    getItem(
      'Lista zakupów',
      '/shopping-list',
      userData?.data.familyId ? (
        <NavLink to="/shopping-list">
          <CiShoppingBasket size={17} color="white" />
        </NavLink>
      ) : (
        <CiShoppingBasket size={17} color="white" />
      ),

      userData?.data.familyId ? false : true,
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
        {!userDataLoading && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={items}
          />
        )}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
          }}
        >
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
          <h4 className="ms-5 mt-2">
            {userData?.data.firstName} {userData?.data.lastName}
          </h4>
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
