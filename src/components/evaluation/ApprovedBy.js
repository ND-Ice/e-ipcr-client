import moment from "moment";
import React from "react";
import styled from "styled-components";

export default function ApprovedBy({ response }) {
  const { signatures, isApproved } = response;
  const { approvedBy, approvedDate } = isApproved;
  return (
    <Container>
      <SignatureWrapper>
        <img src={signatures?.evaluatorSignature} alt="" />
        {approvedBy?.name?.firstName} {approvedBy?.name?.lastName}
      </SignatureWrapper>
      <DateWrapper>{moment(parseInt(approvedDate)).format("LL")}</DateWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const SignatureWrapper = styled.div`
  width: 300px;
  font-size: 1.2rem;
  font-weight: 700;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;

  img {
    height: 50px;
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  ::after {
    content: "EVALUATOR";
    font-size: 0.8rem;
    font-weight: 700;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const DateWrapper = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  position: relative;
  padding: 0.2rem;
  border-bottom: 2px solid #000000;
  margin-right: 3rem;

  ::after {
    content: "DATE";
    font-size: 0.8rem;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`;
