import React, { useState, useEffect } from "react";
import styled from "styled-components";
import templatesApi from "../api/templates";

import { getSentimentColor } from "../utils";

export default function CommentItem({ comment }) {
  const [sentiments, setSentiments] = useState([]);
  const sentiment = sentiments[0]?.classifications[0];

  useEffect(() => {
    analyzeSentiment();
  }, []);

  const analyzeSentiment = async () => {
    try {
      const response = await templatesApi.analyzeSentiment(comment?.item);
      setSentiments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li>
      {comment?.item}{" "}
      <Sentiment sentiment={sentiment?.tag_name}>
        {sentiment?.tag_name} {Math.round(sentiment?.confidence * 100)}%
      </Sentiment>
    </li>
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
