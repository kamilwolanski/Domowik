import { useField } from 'formik';
import { FormFeedback, FormGroup, Input, InputGroup, Label } from 'reactstrap';

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
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <InputGroup>
        <Input
          {...field}
          {...props}
          type="select"
          invalid={!!(meta.touched && meta.error)}
        >
          <option key="0" value="">
            -
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Input>
        {meta.touched && meta.error && (
          <FormFeedback>{meta.error}</FormFeedback>
        )}
      </InputGroup>
    </FormGroup>
  );
};

export default FormikSelectInput;
