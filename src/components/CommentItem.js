import React, { useState, useEffect } from "react";
import styled from "styled-components";
import templatesApi from "../api/templates";
import { PulseLoader } from "react-spinners";

import { getSentimentColor } from "../utils";

export default function CommentItem({ comment }) {
  const [sentiments, setSentiments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sentiment = sentiments[0]?.classifications[0];

  useEffect(() => {
    analyzeSentiment();
  }, []);

  const analyzeSentiment = async () => {
    try {
      setLoading(true);
      const response = await templatesApi.analyzeSentiment(comment?.item);
      setLoading(false);
      return setSentiments(response.data);
    } catch (error) {
      setLoading(false);
      return setError(error);
    }
  };

  return (
    <li>
      {comment?.item}{" "}
      {loading ? (
        <Loader>
          Analyzing <PulseLoader color="#ffffff" size={5} />
        </Loader>
      ) : (
        <Sentiment sentiment={sentiment?.tag_name}>
          {sentiment?.tag_name} {Math.round(sentiment?.confidence * 100)}%
        </Sentiment>
      )}
    </li>
  );
}

const Sentiment = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
  padding: 2px 8px;
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  background: ${({ sentiment }) => sentiment && getSentimentColor(sentiment)};
  color: white;
`;

const Loader = styled.div`
  display: inline-flex;
  margin-left: 0.5rem;
  padding: 2px 8px;
  font-weight: bold;
  font-size: 12px;
  border-radius: 5px;
  background: #0064f9;
  color: white;
  align-items: center;
`;
