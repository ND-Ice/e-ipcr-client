import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Notification } from ".";
import { getUser } from "../store/user";

import NavLInkItem from "./NavLInkItem";
import { AvatarMenu } from ".";

const notifications = [
  {
    id: 1,
    from: "System Notification",
    message: "Admin Posted a new IPCR evaluation",
    time: 20111031,
  },
  {
    id: 2,
    from: "System Notification",
    message: "Admin Posted a new IPCR evaluation",
    time: Date.now(),
  },
  {
    id: 3,
    from: "System Notification",
    message:
      "Admin Posted a new IPCR evaluation this is just a place holder text",
    time: Date.now(),
  },
];

export default function NavBar() {
  const user = useSelector(getUser);
  return (
    <NavContainer>
      <NavLInkItem to="/">E-IPCR</NavLInkItem>
      <MenuContainer>
        <Notification notifCount={4} notifications={notifications} />
        <AvatarMenu user={user.currentUser} />
      </MenuContainer>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  justify-content: space-between;
  background: #f2f2f2;
  position: sticky;
  top: 0;
  z-index: 10;

  @media (min-width: 768px) {
    padding: 0.8rem 5rem;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin: 0 0.2rem;
  }
`;
