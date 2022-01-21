import React from "react";
import styled from "styled-components";
import moment from "moment";

export default function HrSignature({ response }) {
  const { signatures, preparedBy, dateSubmitted } = response;
  return (
    <Container>
      <SignatureWrapper>
        <img src={signatures?.hrSignature} alt="" />
        {preparedBy?.name?.firstName} {preparedBy?.name?.lastName}
      </SignatureWrapper>
      <DataWrapper>{moment(parseInt(dateSubmitted)).format("LL")}</DataWrapper>
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
    content: "PREPARED BY";
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
  margin-right: 4rem;
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
