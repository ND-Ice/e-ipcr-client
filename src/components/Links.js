import { Link } from "react-router-dom";

export default function Links(props) {
  const { title, to, ...otherProps } = props;
  return (
    <Link to={to} className="text-decoration-none" {...otherProps}>
      {title}
    </Link>
  );
}
