import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'antd';
import { getInvitation } from '../../Api/Invitation';
import { Link, useNavigate } from 'react-router-dom';
import getQueryParam from '../../Helpers/getQueryParam';
const Invitation = () => {
  const isAuth = localStorage.getItem('token');
  const location = useLocation();
  console.log('location', location);

  const navigate = useNavigate();

  const token = getQueryParam('token');
  if (!token) {
    navigate('/');
  }
  const { data, isLoading } = useQuery('invitation', () =>
    getInvitation(String(token)),
  );

  if (isAuth) {
    navigate(`/invitation/confirm?token=${token}`);
  }

  if (isLoading) return <p>loading...</p>;

  if (!isAuth) {
    return (
      <Row className="justify-center text-center mt-20">
        <Col span={6}>
          <div>
            <h1 className="text-3xl font-semibold">
              {data?.sender.firstName} {data?.sender.lastName}
            </h1>
            <h2 className="text-2xl mt-3">
              Zaprosił Cie do dołączenia do rodziny{' '}
              <strong>{data?.familyName}</strong>
            </h2>
            <div className="shadow-lg rounded mt-10 bg-white p-10">
              <p className="text-xl">
                Aby dołączyć do rodziny, musisz się zalogować lub utworzyć konto
              </p>
              <div className="flex mt-10 justify-center space-x-4">
                <Link
                  to="/auth/login"
                  state={{
                    from: { pathname: location.pathname + location.search },
                  }}
                  className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 hover:text-white"
                >
                  Zaloguj się
                </Link>
                <Link
                  to="/auth/register"
                  state={{
                    from: { pathname: location.pathname + location.search },
                  }}
                  className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 hover:text-white"
                >
                  Załóż konto
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
};

{
  /* <div className="col-span-1 md:col-span-2 mt-8">
            <Link to="/auth/login">
              <button className="bg-blue-600 text-white text-lg px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Przejdź do logowania
              </button>
            </Link>
          </div> */
}

export default Invitation;
