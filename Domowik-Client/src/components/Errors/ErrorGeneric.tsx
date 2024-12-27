import { Result } from 'antd';

interface IErrorGeneric {
  resetErrorBoundary: () => void;
}

const ErrorGeneric: React.FC<IErrorGeneric> = ({ resetErrorBoundary }) => {
  return (
    <Result
      status="500"
      title="Przepraszamy, coś poszło nie tak"
      extra={
        <button
          className="items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={resetErrorBoundary}
        >
          Spróbuj ponownie
        </button>
      }
      className="mt-10"
    />
  );
};

export default ErrorGeneric;
