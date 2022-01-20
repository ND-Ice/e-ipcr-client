import React, { useEffect, useState } from "react";
import styled from "styled-components";

import templatesApi from "../api/templates";
import { getSentimentColor } from "../utils";
import CommentItem from "./CommentItem";

export default function CommentFeedback({ comments }) {
  const [sentiment, setSentiment] = useState([]);
  const sentimentValue = sentiment[0]?.classifications[0];

  useEffect(() => {
    analyzeSentiment();
  }, [comments]);

  const analyzeSentiment = async () => {
    try {
      const response = await templatesApi.analyzeSentiment(comments?.title);
      return setSentiment(response.data);
    } catch (error) {
      return console.log(error);
    }
  };
  return (
    <div>
      <h6>Comments</h6>
      <p>
        {comments?.title}
        <Sentiment sentiment={sentimentValue?.tag_name}>
          {sentimentValue?.tag_name}{" "}
          {Math.round(sentimentValue?.confidence * 100)}%
        </Sentiment>
      </p>
      <ul>
        {comments?.list?.map((comment) => (
          <CommentItem key={comment?.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}

const Sentiment = styled.span`
  display: inline-block;
  padding: 2px 8px;
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  background: ${({ sentiment }) => sentiment && getSentimentColor(sentiment)};
  color: white;
`;
