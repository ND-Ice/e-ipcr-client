import React from "react";
import styled from "styled-components";

import { FiCamera } from "react-icons/fi";
import { Avatar, LetterAvatar } from ".";

export default function AvatarProfile(props) {
  const { user, size, onClick } = props;

  return (
    <Container>
      <IconContainer onClick={onClick}>
        <FiCamera />
      </IconContainer>
      {user?.image?.current ? (
        <Avatar user={user} size={size} />
      ) : (
        <LetterAvatar user={user} size={size} />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: max-content;
  height: max-content;
  border-radius: 50%;
  position: relative;
  border: 4px solid #ffffff;
`;

const IconContainer = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  background: gray;
  border-radius: 50%;
  transition: all 0.3s;
  cursor: pointer;
  width: 30px;
  height: 30px;
  bottom: 0;
  right: 0;

  :hover {
    background: darkgray;
  }

  > * {
    color: ${({ theme }) => theme.colors.white};
  }
`;
