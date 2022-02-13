import { Form } from "react-bootstrap";
import { useFormikContext } from "formik";

export default function TextInput(props) {
  const { title, name, loading, ...otherProps } = props;
  const { handleChange, setFieldTouched, errors, touched, values } =
    useFormikContext();

  return (
    <Form.Group className="mb-2 w-100" controlId="formBasicEmail">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        type="text"
        placeholder={title}
        name={name}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        value={values[name]}
        disabled={loading}
        isValid={touched[name] && !errors[name]}
        isInvalid={!touched[name] || !errors[name] ? false : true}
        {...otherProps}
      />
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
