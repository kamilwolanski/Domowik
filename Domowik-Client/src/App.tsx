import { Routes, Route, Navigate } from 'react-router-dom';
import Finances from './Pages/Finances';
import RegularLayout from './Components/RegularLayout';
import PrivateLayout from './Components/PrivateLayout';
import Login from './Pages/Login/Login';
import PrivateRoute from './Routing/PrivateRoute';
import Logout from './Pages/Logout';
import Register from './Pages/Register/Register';
import RegistrationSuccess from './Pages/Register/RegistrationSuccess';
import Family from './Pages/Family';
import ShoppingLists from './Pages/ShoppingLists';
import ShoppingList from './Pages/ShoppingLists/ShoppingList';
import Calendar from './Pages/Calendar';
import Invitation from './Pages/Invitation';
import InvitationConfirm from './Pages/Invitation/InvitationConfirm';
import NotFound from './Components/Errors/NotFound';
import Notes from './pages/Notes';

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
          <Route path="/invitation" element={<Invitation />} />
          <Route path="/invitation/confirm" element={<InvitationConfirm />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/family" element={<Family />} />
            <Route path="/shopping-lists" element={<ShoppingLists />} />
            <Route path="/shopping-lists/:id" element={<ShoppingList />} />
            <Route path="/auth/logout" element={<Logout />} />
            <Route path="/finances" element={<Finances />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/notes" element={<Notes />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate replace to="/family" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
