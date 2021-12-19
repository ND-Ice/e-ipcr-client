import React from "react";
import styled from "styled-components";

import { EvaluationCard, NavLInkItem } from "../components";
import cardLimit from "../utils/CardLimit";

const evaluationInfo = [
  {
    id: 1,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CAS",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
  {
    id: 2,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CBA",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
  {
    id: 3,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CAFA",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
  {
    id: 4,
    title: "2021-2022 IPCR Evaluation for CAS",
    dept: "CBA",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta porro iste sapiente nisi quaerat. Dolor nostrum quos tempora libero facilis!",
    postDate: "2021/10/30",
    due: "2021/12/20",
  },
];

export default function EvaluationsPage({ history }) {
  const handleViewMore = (id) => history.push(`/dashboard/evaluations/${id}`);

  return (
    <AppContainer>
      <h2 className="mb-4">Ongoing Evaluation</h2>
      <Container>
        {cardLimit(evaluationInfo, 3)?.map((evaluation) => (
          <EvaluationCard
            key={evaluation.id}
            evaluationInfo={evaluation}
            onPreview={handleViewMore}
          />
        ))}
      </Container>

      <ViewMoreContainer>
        {evaluationInfo.length > 3 && (
          <NavLInkItem to="/dashboard/ongoing-evaluations">
            View More
          </NavLInkItem>
        )}
      </ViewMoreContainer>

      <h2 className="my-4">Past Evaluation</h2>
      <Container>
        {cardLimit(evaluationInfo, 6)?.map((evaluation) => (
          <EvaluationCard
            key={evaluation.id}
            evaluationInfo={evaluation}
            onPreview={handleViewMore}
          />
        ))}
      </Container>

      <ViewMoreContainer>
        {evaluationInfo.length > 6 && (
          <NavLInkItem to="/dashboard/past-evaluations">View More</NavLInkItem>
        )}
      </ViewMoreContainer>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1rem 5rem;
  }
`;

const Container = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ViewMoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
`;
