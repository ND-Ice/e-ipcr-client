import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getUser } from "../store/user";

import NavLInkItem from "./NavLInkItem";
import { AvatarMenu } from ".";
import { useLocation } from "react-router-dom";

const navItems = [
  { to: "/dashboard", title: "Home" },
  { to: "/dashboard/past-evaluations", title: "Past Evaluation" },
];

export default function NavBar() {
  const user = useSelector(getUser);
  const location = useLocation();
  return (
    <NavContainer>
      <NavLInkItem to="/">E-IPCR</NavLInkItem>
      <MenuContainer>
        <NavLinks>
          {navItems.map((item) => (
            <NavLInkItem
              key={item.title}
              to={item.to}
              active={item.to === location.pathname}
            >
              {item.title}
            </NavLInkItem>
          ))}
        </NavLinks>
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

const NavLinks = styled.div`
  display: flex;
  margin-right: 0.5rem;

  > * {
    margin: 0 0.5rem;
  }
`;
