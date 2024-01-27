import { useField } from 'formik';
import { FormFeedback, FormGroup, Input, InputGroup, Label } from 'reactstrap';

interface IFormikDateInput {
  label: string;
  name: string;
  id: string;
  min?: string;
  max?: string;
}

const FormikTextInput: React.FC<IFormikDateInput> = ({
  label,
  name,
  id,
  min,
  max,
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
          min={min}
          max={max}
          type="date"
          invalid={!!(meta.touched && meta.error)}
        />
        {meta.touched && meta.error && (
          <FormFeedback>{meta.error}</FormFeedback>
        )}
      </InputGroup>
    </FormGroup>
  );
};

export default FormikTextInput;
