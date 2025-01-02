import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Przepraszamy, strona, którą odwiedziłeś, nie istnieje."
      extra={
        <button
          className="items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => navigate(-1)}
        >
          Powrót
        </button>
      }
      className="mt-10"
    />
  );
};

export default NotFound;
