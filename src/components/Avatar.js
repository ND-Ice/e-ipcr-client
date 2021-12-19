import React from "react";
import styled from "styled-components";
import getLetterAvatarBg from "../utils/getLetterAvatarBg";

export default function Avatar({ user, onError, size }) {
  return (
    <AvatarContainer dept={user?.dept} size={size}>
      <UserAvatar src={user?.image?.current} onError={onError} />
    </AvatarContainer>
  );
}

const AvatarContainer = styled.div`
  display: inline-grid;
  place-items: center;
  height: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 4px solid ${(props) => getLetterAvatarBg(props.dept)};
`;

const UserAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
