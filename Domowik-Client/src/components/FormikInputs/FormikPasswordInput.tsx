import { useField } from 'formik';
import { FormFeedback, FormGroup, Input, InputGroup, Label } from 'reactstrap';

interface IFormikEmailInput {
  label: string;
  name: string;
  id: string;
}

const FormikPasswordInput: React.FC<IFormikEmailInput> = ({
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
          type="password"
          invalid={!!(meta.touched && meta.error)}
        />
        {meta.touched && meta.error && (
          <FormFeedback>{meta.error}</FormFeedback>
        )}
      </InputGroup>
    </FormGroup>
  );
};

export default FormikPasswordInput;
