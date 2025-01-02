import { useField } from 'formik';

interface IFormikTextInput {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
}

const FormikTextInput: React.FC<IFormikTextInput> = ({
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
        type="text"
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

export default FormikTextInput;
