import { useField } from 'formik';

interface IFormikDateInput {
  label: string;
  name: string;
  id: string;
  min?: string;
  max?: string;
}

const FormikDateInput: React.FC<IFormikDateInput> = ({
  label,
  name,
  id,
  min,
  max,
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
        id={id}
        type="date"
        min={min}
        max={max}
        className={`focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 ${
          meta.touched && meta.error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : ''
        } shadow-sm sm:text-sm`}
      />
      {meta.touched && meta.error && (
        <p className="mt-2 text-sm text-red-600">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikDateInput;
