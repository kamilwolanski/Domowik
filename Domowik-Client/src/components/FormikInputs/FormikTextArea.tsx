import { useField } from 'formik';

interface IFormikTextarea {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  rows?: number;
}

const FormikTextarea: React.FC<IFormikTextarea> = ({
  label,
  name,
  id,
  rows = 3,
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

      <textarea
        {...field}
        {...props}
        id={id}
        rows={rows}
        className={`focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 resize-none ${
          meta.touched && meta.error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : ''
        }`}
      />
      {meta.touched && meta.error && (
        <p className="mt-2 text-sm text-red-600">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikTextarea;