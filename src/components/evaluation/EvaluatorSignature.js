import React from "react";
import styled from "styled-components";
import moment from "moment";

export default function EvaluatorSignature({ response }) {
  const { signatures, isApproved } = response;
  const { approvedBy, approvedDate } = isApproved;
  return (
    <Container>
      <SignatureWrapper>
        <img src={signatures?.evaluatorSignature} alt="" />
        {approvedBy?.name?.firstName} {approvedBy?.name?.lastName}
      </SignatureWrapper>
      <DataWrapper>{moment(parseInt(approvedDate)).format("LL")}</DataWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const SignatureWrapper = styled.div`
  width: 200px;
  position: relative;
  padding: 0.2rem;
  border-bottom: 2px solid #000000;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  margin-right: 4rem;
  text-transform: uppercase;

  img {
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
    height: 50px;
    width: 200px;
  }

  ::after {
    content: "ASSESED BY";
    position: absolute;
    top: calc(100% + 3px);
    left: 50%;
    font-weight: 700;
    font-size: 0.8rem;
    transform: translateX(-50%);
  }
`;

const DataWrapper = styled.div`
  width: 200px;
  position: relative;
  padding: 0.2rem;
  border-bottom: 2px solid #000000;
  text-align: center;
  font-weight: 700;
  font-size: 1.2rem;
  text-transform: uppercase;

  ::after {
    content: "DATE";
    position: absolute;
    top: calc(100% + 3px);
    left: 50%;
    font-weight: 700;
    font-size: 0.8rem;
    transform: translateX(-50%);
  }
`;
