import React from "react";
import styled from "styled-components";
import { FiCheck } from "react-icons/fi";

export default function Progress({ response }) {
  const { status } = response;
  const { intermediateSupervisor, director, PMT, HEAD, HR } = status;
  return (
    <Container>
      <h5 className="mb-4">Tracking</h5>
      <div className="d-flex align-items-center">
        <ProgressWrapper>
          <CircleIndicator isActive={response}>
            <FiCheck className="check" />
          </CircleIndicator>
          <CustomProgress isActive={response} />
          <Title>FACULTY</Title>
        </ProgressWrapper>

        <ProgressWrapper>
          <CircleIndicator isActive={intermediateSupervisor?.isApproved}>
            <FiCheck className="check" />
          </CircleIndicator>
          <CustomProgress isActive={intermediateSupervisor?.isApproved} />
          <Title>SUPERVISOR</Title>
        </ProgressWrapper>

        <ProgressWrapper>
          <CircleIndicator isActive={director?.isApproved}>
            <FiCheck className="check" />
          </CircleIndicator>
          <CustomProgress isActive={director?.isApproved} />
          <Title>DIRECTOR</Title>
        </ProgressWrapper>

        <ProgressWrapper>
          <CircleIndicator isActive={PMT?.isApproved}>
            <FiCheck className="check" />
          </CircleIndicator>
          <CustomProgress isActive={PMT?.isApproved} />
          <Title>PMT</Title>
        </ProgressWrapper>

        <ProgressWrapper>
          <CircleIndicator isActive={HEAD?.isApproved}>
            <FiCheck className="check" />
          </CircleIndicator>
          <Title>HEAD</Title>
        </ProgressWrapper>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const CustomProgress = styled.div`
  height: 5px;
  flex: 1;
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.accent.emerald : theme.colors.accent.blue};
`;

const CircleIndicator = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.accent.emerald : theme.colors.accent.blue};

  .check {
    display: ${({ isActive }) => (isActive ? "block" : "none")};
  }
`;

const ProgressWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  text-align: center;
`;

const Title = styled.div`
  width: max-content;
  position: absolute;
  bottom: -100%;
  font-size: 10px;
  font-weight: bold;
`;
