import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Books from './Pages/Books';
import Book from './Pages/Book';
import Layout from './Components/Layout';
import Login from './Pages/Login/Login';
import PrivateRoute from './Routing/PrivateRoute';
import Logout from './Pages/Logout';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/test" element={<h1>test</h1>} />
            <Route path="/auth/logout" element={<Logout />} />
          </Route>
          <Route path="/books">
            <Route index element={<Books />} />
            <Route path=":id" element={<Book />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>Not Found Page</h1>} />
      </Routes>
    </>
  );
};

export default App;
