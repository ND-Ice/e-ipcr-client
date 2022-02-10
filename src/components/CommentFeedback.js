import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PulseLoader } from "react-spinners";

import templatesApi from "../api/templates";
import { getSentimentColor } from "../utils";
import CommentItem from "./CommentItem";

export default function CommentFeedback({ comments }) {
  return (
    <div>
      <h6 className="text-uppercase fw-bold">Comments</h6>
      <p>{comments?.title}</p>
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
  margin-left: 0.5rem;
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
