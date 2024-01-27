import { Link } from 'react-router-dom';
import logo from '../Assets/domowik.png';

const Nav = () => {
  return (
    <nav className="nav d-flex justify-content-center">
      <Link to="/">
        <div className="logo d-flex align-items-center">
          <img src={logo} alt="logo" />
          <span>Domowik</span>
        </div>
      </Link>
    </nav>
  );
};

export default Nav;
