import React from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";

import getRelativeTime from "../utils/getRelativeTime";
import concatenate from "../utils/concatenate";

export default function NotificationItem(props) {
  const { notification } = props;
  return (
    <Container>
      <SenderContainer>
        <SystemAvatar>
          <FiSettings className="system-avatar" />
        </SystemAvatar>
        <span className="text-">{notification?.from}</span>
      </SenderContainer>

      <p>{concatenate(notification.message, 70)}</p>
      <span className="text-primary ">
        {getRelativeTime(notification?.time)}
      </span>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  color: black;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    background: #f2f2f2;
  }
`;

const SenderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SystemAvatar = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;

  .system-avatar {
    font-size: 2rem;
  }
`;
