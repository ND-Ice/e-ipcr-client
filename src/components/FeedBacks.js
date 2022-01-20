import React from "react";
import styled from "styled-components";
import CommentFeedback from "./CommentFeedback";
import RecommendationsFeedback from "./RecommendationsFeedback";

export default function FeedBacks({ feedbacks }) {
  const { comments, recommendations } = feedbacks;
  return (
    <Container>
      <h5 className="mb-4">Evaluators Feedback</h5>
      <CommentFeedback comments={comments} />
      <RecommendationsFeedback recommendations={recommendations} />
    </Container>
  );
}

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 0.5rem;
  padding: 2rem;
`;
