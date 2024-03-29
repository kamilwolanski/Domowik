import { Routes, Route, Navigate } from 'react-router-dom';
import Finances from './Pages/Finances/Finances';
import RegularLayout from './Components/RegularLayout';
import PrivateLayout from './Components/PrivateLayout';
import Login from './Pages/Login/Login';
import PrivateRoute from './Routing/PrivateRoute';
import Logout from './Pages/Logout';
import Register from './Pages/Register/Register';
import RegistrationSuccess from './Pages/Register/RegistrationSuccess';
import Family from './Pages/Family/Family';
import ShoppingList from './Pages/ShoppingList';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<RegularLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route
            path="/auth/register/success"
            element={<RegistrationSuccess />}
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/family" element={<Family />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/auth/logout" element={<Logout />} />
            <Route path="/finances" element={<Finances />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate replace to="/family" />} />
        <Route
          path="*"
          element={<h1>Strona o podanym adresie nie istnieje.</h1>}
        />
      </Routes>
    </>
  );
};

export default App;
