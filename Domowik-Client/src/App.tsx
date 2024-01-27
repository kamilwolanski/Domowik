import { Routes, Route, Navigate } from 'react-router-dom';
import Books from './Pages/Books';
import Book from './Pages/Book';
import RegularLayout from './Components/RegularLayout';
import PrivateLayout from './Components/PrivateLayout';
import Login from './Pages/Login/Login';
import PrivateRoute from './Routing/PrivateRoute';
import Logout from './Pages/Logout';
import Register from './Pages/Register/Register';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<RegularLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/family" element={<h1>family</h1>} />
            <Route path="/auth/logout" element={<Logout />} />
            <Route path="/books">
              <Route index element={<Books />} />
              <Route path=":id" element={<Book />} />
            </Route>
          </Route>
        </Route>
        <Route path="/" element={<Navigate replace to="/family" />} />
        <Route path="*" element={<h1>Not Found Page</h1>} />
      </Routes>
    </>
  );
};

export default App;
