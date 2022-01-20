import React from "react";
import styled from "styled-components";

export default function Feedback({ feedback }) {
  const { comments, recommendations } = feedback;
  return (
    <>
      <tr>
        <td colSpan={8}></td>
      </tr>
      <tr className="text-uppercase bg-warning text-white fw-bold">
        <td colSpan={8}>Comments and Recommendations</td>
      </tr>
      <tr>
        <td colSpan={8}>
          <h6>Comments</h6>
          <Description>{comments?.title}</Description>
          <ul>
            {comments?.list?.map((comment) => (
              <li key={comment?.id}>{comment?.item}</li>
            ))}
          </ul>
        </td>
      </tr>
      <tr>
        <td colSpan={8}>
          <h6>Recommendations</h6>
          <Description>{recommendations?.title}</Description>
          <ul>
            {recommendations?.list?.map((recommendation) => (
              <li key={recommendation?.id}>{recommendation?.item}</li>
            ))}
          </ul>
        </td>
      </tr>
    </>
  );
}

const Description = styled.p`
  max-width: 120ch;
`;
