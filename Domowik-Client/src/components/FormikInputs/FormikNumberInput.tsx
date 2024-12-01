import { useField } from 'formik';

interface IFormikNumberInput {
  label: string;
  name: string;
  id: string;
}

const FormikNumberInput: React.FC<IFormikNumberInput> = ({
  label,
  name,
  id,
  ...props
}) => {
  const [field, meta] = useField({ name: name });

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          {...field}
          {...props}
          type="number"
          id={id}
          className={`focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 ${
            meta.touched && meta.error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : ''
          } `}
        />
        {meta.touched && meta.error && (
          <p className="mt-2 text-sm text-red-600">{meta.error}</p>
        )}
      </div>
    </div>
  );
};

export default FormikNumberInput;
