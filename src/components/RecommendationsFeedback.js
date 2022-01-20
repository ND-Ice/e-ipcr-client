import React from "react";
import styled from "styled-components";

export default function RecommendationsFeedback({ recommendations }) {
  return (
    <div>
      <h6>Recommendations</h6>
      <p>{recommendations?.title}</p>
      <ul>
        {recommendations?.list?.map((recommendation) => (
          <li key={recommendation?.id}>{recommendation?.item}</li>
        ))}
      </ul>
    </div>
  );
}
