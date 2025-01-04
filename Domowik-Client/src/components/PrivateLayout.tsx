import { NavLink, Outlet } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import React, { useCallback, useEffect, useState } from 'react';
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
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { getUser } from '../Api';

const { Header, Sider, Content, Footer } = Layout;

const PrivateLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { isLoading: userDataLoading, data: userData } = useQuery(
    'user',
    getUser,
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenuOnClick = useCallback(() => {
    if (isMobile && !collapsed) {
      setCollapsed(true);
    }
  }, [isMobile, collapsed]);

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
      'Listy zakupów',
      '/shopping-lists',
      userData?.data.familyId ? (
        <NavLink to="/shopping-lists">
          <CiShoppingBasket size={17} color="white" />
        </NavLink>
      ) : (
        <CiShoppingBasket size={17} color="white" />
      ),

      userData?.data.familyId ? false : true,
    ),
    getItem(
      'Kalendarz',
      '/calendar',
      userData?.data.familyId ? (
        <NavLink to="/calendar">
          <FaRegCalendarAlt size={15} color="white" />
        </NavLink>
      ) : (
        <FaRegCalendarAlt size={15} color="white" />
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
      <Sider trigger={null} collapsible collapsed={collapsed}
        style={{
          position: 'fixed',
          top: 64,
          left: 0,
          bottom: 0,
          overflowY: 'auto',
          height: '100vh',
          zIndex: 10,
        }}
      >
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
            position: 'sticky',
            top: 0,
            padding: 0,
            zIndex: 10,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
            filter: isMobile && !collapsed ? 'blur(8px) grayscale(100%)' : 'none',
          }}
          onClick={closeMenuOnClick}
        >
          <Outlet />
        </Content>
        <Footer style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 10,
          backgroundColor: '#000',
          padding: '10px 20px',
          textAlign: 'center',
          boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          Copyright ©{new Date().getFullYear()} Created by JKM
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
