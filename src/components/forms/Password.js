import { Form } from "react-bootstrap";
import { useFormikContext } from "formik";

export default function Password(props) {
  const { title, name, loading, ...otherProps } = props;
  const { handleChange, setFieldTouched, errors, touched, values } =
    useFormikContext();

  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        type="password"
        placeholder={title}
        name={name}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        disabled={loading}
        value={values[name]}
        isValid={touched[name] && !errors[name]}
        isInvalid={!touched[name] || !errors[name] ? false : true}
        {...otherProps}
      />
      <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        {errors[name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
