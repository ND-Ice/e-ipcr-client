import moment from "moment";
import React from "react";
import styled from "styled-components";

export default function ApprovedBy({ response }) {
  const { status } = response;
  const { signature, user, dateApproved } = status?.intermediateSupervisor;

  return (
    <Container>
      <SignatureWrapper>
        <img src={signature} alt="" />
        {user?.name?.firstName} {user?.name?.lastName}
      </SignatureWrapper>
      <DateWrapper>{moment(parseInt(dateApproved)).format("LL")}</DateWrapper>
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
  width: 350px;
  font-weight: 700;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  text-transform: uppercase;

  img {
    height: 50px;
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  ::after {
    content: "SUPERVISOR";
    font-size: 0.8rem;
    font-weight: 700;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    text-transform: uppercase;
  }
`;

const DateWrapper = styled.div`
  font-weight: 700;
  position: relative;
  padding: 0.2rem;
  border-bottom: 2px solid #000000;
  margin-right: 3rem;
  text-transform: uppercase;

  ::after {
    content: "DATE";
    font-size: 0.8rem;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`;
