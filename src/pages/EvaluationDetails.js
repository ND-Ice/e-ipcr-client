import React from "react";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import moment from "moment";
import { Button } from "react-bootstrap";

import concatenate from "../utils/concatenate";
import { Icons } from "../components";

export default function EvaluationDetails({ match, history }) {
  const id = match.params.id;
  const handleGoBack = () => history.goBack();

  return (
    <AppContainer>
      <Header bg="https://www.gstatic.com/classroom/themes/img_backtoschool.jpg">
        <HeadContainer>
          <Icons
            icon={FiArrowLeft}
            size={40}
            iconColor="#ffffff"
            backgroundColor="transparent"
            onClick={handleGoBack}
          />
          <Duedate>Due : {moment(Date.now()).calendar()}</Duedate>
        </HeadContainer>
        <Heading>{concatenate(`2021-2022 IPCR Evaluation  ${id}`, 45)}</Heading>
        <Department>CAS</Department>
      </Header>
      <Body>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
          voluptatem itaque ipsa iusto eum sit impedit accusantium velit
          eligendi modi.
        </p>
        <Button
          onClick={() => history.push(`/dashboard/create-response/${id}`)}
          variant="primary"
          className="mt-3"
        >
          Create Response
        </Button>
      </Body>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1rem 5rem;
  }

  @media (min-width: 1024px) {
    padding: 1rem 15rem;
  }
`;

const Header = styled.div`
  height: 200px;
  background: url(${({ bg }) => bg});
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;

  @media (min-width: 768px) {
    height: 300px;
  }
`;

const HeadContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Duedate = styled.span`
  display: inline-block;
  color: #f2f2f2;
`;

const Department = styled.span`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: #ffffff;
`;

const Heading = styled.h1`
  position: absolute;
  color: #ffffff;
  bottom: 1rem;
  left: 1rem;
  width: 15ch;
  margin: 0;

  @media (min-width: 768px) {
    width: 20ch;
  }
`;

const Body = styled.div`
  padding: 1rem 0;

  @media (min-width: 768px) {
    width: 70ch;
  }
`;
