import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const isAuth = localStorage.getItem('token');
  const location = useLocation();

  console.log('isAuth', isAuth);

  return (
    <>
      {isAuth ? (
        <Outlet />
      ) : (
        <Navigate to="/auth/login" state={{ from: location }} />
      )}
    </>
  );
};

export default PrivateRoute;
