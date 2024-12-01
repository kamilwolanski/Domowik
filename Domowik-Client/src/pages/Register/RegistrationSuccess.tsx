import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fromRegister = location.state?.from === 'register';
    if (!fromRegister) {
      navigate(-1);
    }
  }, [location.state?.from, navigate]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-center">
        <div className="col-span-1 md:col-span-2">
          <h1 className="text-3xl font-bold text-green-600">Gratulacje!</h1>
          <h2 className="text-xl mt-4 text-gray-700">
            Twoje konto zostało pomyślnie utworzone. Witamy w naszej
            społeczności! Teraz możesz zalogować się i cieszyć się wszystkimi
            funkcjonalnościami naszej platformy.
          </h2>
        </div>
        <div className="col-span-1 md:col-span-2 mt-8">
          <Link to="/auth/login">
            <button className="bg-blue-600 text-white text-lg px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Przejdź do logowania
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
