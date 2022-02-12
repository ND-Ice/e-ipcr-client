import React from "react";
import styled from "styled-components";
import getLetterAvatarBg from "../utils/getLetterAvatarBg";

export default function LetterAvatar({ user, size }) {
  return (
    <AvatarContainer size={size} college={user?.college}>
      <Letter size={size}>{user?.name?.firstName?.trim()[0]} </Letter>
    </AvatarContainer>
  );
}

const AvatarContainer = styled.div`
  display: inline-grid;
  place-items: center;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background: ${(props) => getLetterAvatarBg(props.college)};
  border-radius: 50%;
  cursor: pointer;
`;

const Letter = styled.span`
  display: flex;
  font-size: ${(props) => `${props.size * 0.6}px`};
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
  line-height: 0;
`;
