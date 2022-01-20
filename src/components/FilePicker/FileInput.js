import React, { useRef } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

export default function FileInput({ ...otherProps }) {
  const hiddenUploadRef = useRef(null);

  const handlePick = () => hiddenUploadRef.current.click();
  return (
    <Container>
      <CustomInput
        type="file"
        ref={hiddenUploadRef}
        {...otherProps}
        accept="application/pdf,image/*"
      />
      <Button className="mb-2" variant="outline-primary" onClick={handlePick}>
        Add Attachment
      </Button>
    </Container>
  );
}

const Container = styled.div`
  margin: 3px 0;
`;

const CustomInput = styled.input`
  display: none;
`;
