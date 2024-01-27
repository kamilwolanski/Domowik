import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
