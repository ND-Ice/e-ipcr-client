import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { getConcatenated } from "../../utils";

export default function SelectedFile({ info, onDelete }) {
  return (
    <Container>
      <div>{getConcatenated(info?.name, 30)}</div>
      <IconContainer onClick={() => onDelete(info?.name)}>
        <FiX />
      </IconContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 300px;
  justify-content: space-between;
  padding: 0.5rem;
  margin: 3px 0;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const IconContainer = styled.div`
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
