import { useField } from 'formik';
import { FormFeedback, FormGroup, Input, InputGroup, Label } from 'reactstrap';

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
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <InputGroup>
        <Input
          {...field}
          {...props}
          type="number"
          invalid={!!(meta.touched && meta.error)}
        />
        {meta.touched && meta.error && (
          <FormFeedback>{meta.error}</FormFeedback>
        )}
      </InputGroup>
    </FormGroup>
  );
};

export default FormikNumberInput;
