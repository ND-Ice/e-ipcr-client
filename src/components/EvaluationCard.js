import moment from "moment";
import React from "react";
import styled from "styled-components";

import { getLetterAvatarBg } from "../utils";

export default function EvaluationCard({ evaluationInfo, onPreview }) {
  const diffInHours = moment().diff(
    moment(parseInt(evaluationInfo.timeStamp)),
    "hours"
  );

  return (
    <StyledCard onClick={() => onPreview(evaluationInfo._id)}>
      <CardBody>
        <CardTitle>
          Individual Performance Commitment Review (IPCR){" "}
          <strong>
            {parseInt(evaluationInfo.targetYear - 1)} -
            {evaluationInfo.targetYear}
          </strong>
        </CardTitle>
        <Badge college={evaluationInfo?.college?.acronym}>
          {evaluationInfo?.college?.acronym}
        </Badge>
        {diffInHours < 5 && <NewBadge>New</NewBadge>}
      </CardBody>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  :hover {
    border-bottom-color: ${({ theme }) => theme.colors.accent.emerald};
  }
`;

const CardBody = styled.div`
  padding: 0.8rem;
`;

const CardTitle = styled.p`
  max-width: 35ch;
`;

const Badge = styled.span`
  display: inline-grid;
  font-size: ${(props) => props.theme.fontSize.paragraph.sm};
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  background: ${(props) => getLetterAvatarBg(props.college)};
  color: ${(props) => props.theme.colors.white};
`;

const NewBadge = styled.span`
  padding: 0.3rem 0.5rem;
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.accent.red};
  font-size: 10px;
  font-weight: 500;
  position: absolute;
  top: 10px;
  right: -2px;
`;
