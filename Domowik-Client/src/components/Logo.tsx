import { NavLink } from 'react-router-dom';
import logo from '../Assets/logo.png';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <NavLink to="/family">
        <img src={logo} alt="logo" />
      </NavLink>
    </div>
  );
};

export default Logo;
