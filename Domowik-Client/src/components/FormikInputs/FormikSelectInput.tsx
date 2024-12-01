import { useField } from 'formik';

interface IFormikSelectInput {
  label: string;
  name: string;
  id: string;
  options: { id: number; name: string }[];
}

const FormikSelectInput: React.FC<IFormikSelectInput> = ({
  label,
  name,
  id,
  options,
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
        <select
          {...field}
          {...props}
          id={id}
          className={`focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 ${
            meta.touched && meta.error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : ''
          } `}
        >
          <option value="">-</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {meta.touched && meta.error && (
          <p className="mt-2 text-sm text-red-600">{meta.error}</p>
        )}
      </div>
    </div>
  );
};

export default FormikSelectInput;
