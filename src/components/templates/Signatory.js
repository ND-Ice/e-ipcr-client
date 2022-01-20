import React from "react";
import styled from "styled-components";

export default function Signatory({ template }) {
  const { signature, createdBy } = template?.generatedBy;
  return (
    <Container>
      <SignatureWrapper>
        <img src={signature} alt="" />
        {createdBy?.name?.firstName} {createdBy?.name?.lastName}
      </SignatureWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem 1rem;
  display: grid;
  place-items: center;
`;

const SignatureWrapper = styled.div`
  padding: 0.5rem;
  width: 300px;
  border-bottom: 2px solid #000000;
  text-align: center;
  position: relative;
  font-size: 1.2rem;

  img {
    height: 70px;
    width: 200px;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
  }

  ::after {
    content: "Prepared By";
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
  }
`;
