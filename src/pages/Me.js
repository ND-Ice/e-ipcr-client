import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { getUser } from "../store/user";
import { BasicInformation, PrimaryInfo, ProfileIntro } from "../components";

export default function Me() {
  const user = useSelector(getUser);
  const { currentUser } = user;

  return (
    <AppContainer>
      <div>
        <ProfileIntro user={currentUser} />
        <PrimaryInfo user={currentUser} />
      </div>
      <BasicInformation user={currentUser} />
    </AppContainer>
  );
}

const AppContainer = styled.section`
  display: grid;
  gap: 0.5rem;
  margin-top: 1rem;
  border-radius: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 2fr;
  }
`;
