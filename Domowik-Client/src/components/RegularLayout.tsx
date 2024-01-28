import { NavLink, Outlet } from 'react-router-dom';
import logo from '../Assets/logo.png';
import { Layout } from 'antd';

const { Footer } = Layout;

const RegularLayout: React.FC = () => {
  return (
    <div className="regular-layout">
      <nav className="d-flex justify-content-center">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </nav>
      <main className="py-5">
        <Outlet />
      </main>
      <Footer style={{ textAlign: 'center' }}>
        Copyright ©{new Date().getFullYear()} Created by JKM
      </Footer>
    </div>
  );
};

export default RegularLayout;
