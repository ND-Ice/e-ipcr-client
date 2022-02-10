import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getUser } from "../store/user";

import NavLInkItem from "./NavLInkItem";
import { AvatarMenu } from ".";

import logo from "../image/logo.png";

export default function NavBar() {
  const user = useSelector(getUser);
  return (
    <NavContainer>
      <NavLInkItem to="/">
        <div className="d-flex align-items-center">
          <LogoImage src={logo} alt="logo" />
          <h5 className="m-0">E-IPCR</h5>
        </div>
      </NavLInkItem>
      <AvatarMenu user={user?.currentUser} />
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

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
`;
