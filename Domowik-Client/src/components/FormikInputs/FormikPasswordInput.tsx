import { useField } from 'formik';

interface IFormikPasswordInput {
  label: string;
  name: string;
  id: string;
}

const FormikPasswordInput: React.FC<IFormikPasswordInput> = ({
  label,
  name,
  id,
  ...props
}) => {
  const [field, meta] = useField({ name: name });

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        {...field}
        {...props}
        type="password"
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
  );
};

export default FormikPasswordInput;
