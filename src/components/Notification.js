import React, { useState } from "react";
import styled from "styled-components";
import { FiBell } from "react-icons/fi";
import OutsideClickHandler from "react-outside-click-handler";
import { NotificationItem } from ".";

export default function Notification(props) {
  const { notifCount, notifications } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <NotifContainer>
      <OutsideClickHandler onOutsideClick={() => setIsActive(false)}>
        <NotifToggler onClick={() => setIsActive(!isActive)}>
          <Badge>{notifCount}</Badge>
          <FiBell className="notif-icon" />
        </NotifToggler>
        <NotifContent isActive={isActive}>
          {notifications?.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </NotifContent>
      </OutsideClickHandler>
    </NotifContainer>
  );
}

const NotifContainer = styled.ul`
  list-style: none;
  position: relative;
`;

const NotifToggler = styled.div`
  width: 50px;
  height: 50px;
  background: #fafafa;
  color: #f2f2f2;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.3s;
  position: relative;

  .notif-icon {
    width: 24px;
    height: 24px;
    color: #232a34;
    transition: all 0.3s;
  }

  :hover {
    background: #0064f9;

    .notif-icon {
      color: #ffffff;
    }
  }
`;

const Badge = styled.span`
  align-items: center;
  background: tomato;
  border-radius: 50%;
  color: #ffffff;
  display: inline-flex;
  font-size: 0.6rem;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
`;

const NotifContent = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: -4rem;
  width: 300px;
  background: #ffffff;
  max-height: 500px;
  border-radius: 0.5rem;
  transition: all 0.3s;
  overflow: auto;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  pointer-events: ${({ isActive }) => (isActive ? "visible" : "none")};

  @media (min-width: 786px) {
    width: 350px;
    right: -1rem;
  }
`;
