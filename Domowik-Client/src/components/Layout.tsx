import { Link, Outlet } from 'react-router-dom';
import { Container } from 'reactstrap';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">Books</Link>
          </li>
        </ul>
      </nav>
      <main className="py-5">
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer>
        <h3>footer</h3>
      </footer>
    </>
  );
};

export default Layout;
