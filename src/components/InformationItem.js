import { Card } from "react-bootstrap";
import { Icons } from ".";

export default function InformationItem(props) {
  const { children, icon } = props;
  return (
    <>
      <Card.Text>
        {icon && (
          <Icons
            size={40}
            icon={icon}
            backgroundColor="#05a081"
            iconColor="#ffffff"
          />
        )}
        <span className="mt-2 d-inline-flex">{children}</span>
      </Card.Text>
    </>
  );
}
