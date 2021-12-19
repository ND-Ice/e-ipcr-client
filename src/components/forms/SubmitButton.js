import { Button } from "react-bootstrap";
import { useFormikContext } from "formik";

export default function SubmitButton(props) {
  const { title, loading, ...otherProps } = props;
  const { handleSubmit } = useFormikContext();

  return (
    <Button disabled={loading} onClick={handleSubmit} {...otherProps}>
      {title}
    </Button>
  );
}
