import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import OutsideClickHandler from "react-outside-click-handler";
import { Avatar, LetterAvatar } from ".";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../store/user";

export default function AvatarMenu({ user }) {
  const dispatch = useDispatch();
  const [isToggle, setIsToggle] = useState(false);
  const [IsImageError, setImageError] = useState(false);
  const history = useHistory();

  return (
    <OutsideClickHandler onOutsideClick={() => setIsToggle(false)}>
      <Container>
        <div onClick={() => setIsToggle(!isToggle)}>
          {IsImageError || !user?.image?.current ? (
            <LetterAvatar size={40} user={user} />
          ) : (
            <Avatar user={user} size={40} onError={() => setImageError(true)} />
          )}
        </div>
        <DropDownItems active={isToggle}>
          <DropDownItem
            onClick={() => {
              setIsToggle(false);
              return history.push("/dashboard/me");
            }}
          >
            Profile
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              setIsToggle(false);
              dispatch(userLoggedOut());
              return history.push("/");
            }}
          >
            Logout
          </DropDownItem>
        </DropDownItems>
      </Container>
    </OutsideClickHandler>
  );
}

const Container = styled.span`
  display: inline-block;
  position: relative;
  margin-right: 0.5rem;

  @media (min-width: 1024px) {
    margin-right: 0;
  }
`;

const DropDownItems = styled.ul`
  background: white;
  border-radius: 0.5rem;
  display: block;
  list-style: none;
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: -1rem;
  top: calc(100% + 0.3rem);
  width: 200px;
  opacity: ${({ active }) => (active ? 1 : 0)};
  pointer-events: ${({ active }) => (active ? "visible" : "none")};
  transition: all 0.3s;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
`;

const DropDownItem = styled.li`
  padding: 1rem 1.5rem;
  transition: all 0.3s;

  :hover {
    background: #f2f2f2;
    cursor: pointer;
  }
`;
