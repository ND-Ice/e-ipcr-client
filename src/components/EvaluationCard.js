import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { getLetterAvatarBg, getRelativeTime } from "../utils";

export default function EvaluationCard({ evaluationInfo, onPreview }) {
  return (
    <StyledCard onClick={onPreview}>
      <Card.Body>
        <Card.Title>{evaluationInfo.title}</Card.Title>
        <Badge dept={evaluationInfo.dept}>{evaluationInfo.dept}</Badge>
        <Card.Text className="mt-2">{evaluationInfo.desc}</Card.Text>
        <DueDate isFinished={evaluationInfo.isFinished}>
          {evaluationInfo.isFinished
            ? "Finished"
            : `Due : ${getRelativeTime(evaluationInfo.due)}`}
        </DueDate>
      </Card.Body>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  border-radius: 0.5rem;
  transition: all 0.3s;
  cursor: pointer;

  :hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const Badge = styled.span`
  display: inline-grid;
  font-size: ${(props) => props.theme.fontSize.paragraph.sm};
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  background: ${(props) => getLetterAvatarBg(props.dept)};
  color: ${(props) => props.theme.colors.white};
`;

const DueDate = styled.span`
  display: grid;
  place-items: center;
  width: max-content;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  margin: 5px 0;
  font-size: 12px;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) =>
    props.isFinished
      ? props.theme.colors.accent.red
      : props.theme.colors.accent.emerald};
`;
