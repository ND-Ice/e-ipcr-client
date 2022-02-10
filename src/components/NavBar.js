import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getUser } from "../store/user";

import NavLInkItem from "./NavLInkItem";
import { AvatarMenu } from ".";
import { useLocation } from "react-router-dom";

import logo from "../image/logo.png";

const navItems = [
  { to: "/dashboard", title: "HOME" },
  { to: "/dashboard/past-evaluations", title: "PAST EVALUATIONS" },
];

export default function NavBar() {
  const user = useSelector(getUser);
  const location = useLocation();
  return (
    <NavContainer>
      <NavLInkItem to="/">
        <div className="d-flex align-items-center">
          <LogoImage src={logo} alt="logo" />
          <h5 className="m-0">E-IPCR</h5>
        </div>
      </NavLInkItem>
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
        <AvatarMenu user={user?.currentUser} />
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

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
`;
