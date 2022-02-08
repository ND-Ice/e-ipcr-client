import React from "react";
import styled from "styled-components";
import moment from "moment";

export default function Signature({ response, positionProperty }) {
  const { status } = response;
  const user = status[positionProperty]?.user;
  const signature = status[positionProperty]?.signature;
  const dateApproved = status[positionProperty]?.dateApproved;
  const position = positionProperty;

  return (
    <Container>
      <SignatureWrapper position={position}>
        <img src={signature} alt="" />
        {user?.name?.firstName} {user?.name?.lastName}
        <p className="position">{position}</p>
      </SignatureWrapper>
      <DataWrapper>{moment(parseInt(dateApproved)).format("LL")}</DataWrapper>
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
  font-weight: 700;
  margin-right: 2rem;
  text-transform: uppercase;

  img {
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
    height: 50px;
    width: 200px;
  }

  .position {
    position: absolute;
    top: calc(100% + 3px);
    left: 50%;
    font-weight: 700;
    font-size: 0.8rem;
    margin: 0;
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
