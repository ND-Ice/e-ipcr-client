import React from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";

export default function LinkIcon(props) {
  const { onClick } = props;
  return (
    <Container onClick={onClick}>
      <FiArrowLeft className="back-icon" />
    </Container>
  );
}

const Container = styled.span`
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  background: #fafafa;
  transition: all 0.3s;

  :hover {
    background: #f2f2f2;
  }

  .back-icon {
    width: 24px;
    height: 24px;
  }
`;
