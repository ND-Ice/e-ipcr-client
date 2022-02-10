import React from "react";
import styled from "styled-components";
import Logo from "../image/logo.png";
import Templates from "../components/templates/Templates";
import { FiX } from "react-icons/fi";

export default function CreateEvaluationResponse({ history }) {
  return (
    <AppContainer>
      <div className="d-flex align-items-center justify-content-end">
        <IconContainer onClick={() => history.goBack()}>
          <FiX />
        </IconContainer>
      </div>
      <Header>
        <LogoImage src={Logo} />
        <div className="text-center">
          <i>Republic of the Philippines</i>
          <h4 className="m-0">
            EULOGIO “AMANG” RODRIGUEZ INSTITUTE OF SCIENCE AND TECHNOLOGY
          </h4>
          <i>Nagtahan, Sampaloc, Manila</i>
        </div>
      </Header>
      <Templates />
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  position: relative;
  left: -2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  display: grid;
  place-items: center;
  transition: all 120ms;
  font-size: 1.4rem;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
