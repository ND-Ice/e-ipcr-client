import React from "react";
import { Form } from "react-bootstrap";
import { useFormikContext } from "formik";

export default function RadioButtons(props) {
  const { menuItems, name, title, loading, ...otherProps } = props;
  const { setFieldTouched, setFieldValue, touched, errors, values } =
    useFormikContext();
  return (
    <Form.Group className="mb-2" controlId="formBasicEmail">
      <Form.Label className="d-block">{title}</Form.Label>
      {menuItems?.map((item) => (
        <Form.Check
          className="my-2"
          key={item?.label}
          label={`${item?.value} - ${item?.label}`}
          id={item?.id}
          name={name}
          type="radio"
          onBlur={() => setFieldTouched(name)}
          onChange={() => setFieldValue(name, item?.value)}
          disabled={loading}
          checked={item?.value === values[name]}
          isInvalid={!touched[name] || !errors[name] ? false : true}
          {...otherProps}
        />
      ))}
      {!touched[name] || !errors[name] ? null : (
        <p className="text-danger">{errors[name]}</p>
      )}
    </Form.Group>
  );
}
