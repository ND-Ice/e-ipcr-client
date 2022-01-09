import React, { useRef } from "react";
import styled from "styled-components";

export default function FileInput({ ...otherProps }) {
  const hiddenUploadRef = useRef(null);

  const handlePick = () => hiddenUploadRef.current.click();
  return (
    <Container>
      <CustomInput type="file" ref={hiddenUploadRef} {...otherProps} />
      <Button onClick={handlePick}>Add Attachment</Button>
    </Container>
  );
}

const Container = styled.div`
  margin: 3px 0;
`;

const CustomInput = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  outline: 0;
  border: 0;
`;
