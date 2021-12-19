import React, { useState } from "react";
import styled from "styled-components";

import AvatarProfile from "../components/AvatarProfile";
import { CustomModal, ProfileInformation, ProfileIntro } from "../components";
import UpdateProfilePicture from "../components/UpdateProfilePicture";

export default function Me() {
  const [isActive, setIsActive] = useState(false);
  const handleUpdateAvatar = () => setIsActive(!isActive);
  return (
    <AppContainer>
      {/* profile picture and name */}
      <BasicContainer>
        <div className="d-flex flex-column align-items-center">
          <AvatarProfile onClick={handleUpdateAvatar} />
          <h2 className="text-white mt-2">Joshua Dela Cruz</h2>
        </div>
      </BasicContainer>

      {/* profile information */}
      <ProfileContainer>
        <ProfileIntro />
        <ProfileInformation />
      </ProfileContainer>

      {/* modals */}
      <CustomModal
        heading="Update Profile Picture"
        show={isActive}
        onHide={handleUpdateAvatar}
      >
        <UpdateProfilePicture />
      </CustomModal>
    </AppContainer>
  );
}

const AppContainer = styled.section`
  padding: 1rem;
  @media (min-width: 768px) {
    padding: 1rem 5rem;
  }

  @media (min-width: 1024px) {
    padding: 1rem 15rem;
  }
`;

const BasicContainer = styled.div`
  padding: 1rem;
  height: 250px;
  display: grid;
  place-items: end center;
  background: url(https://www.gstatic.com/classroom/themes/Honors.jpg);
  background-size: cover;
  background-position: center;
  border-radius: 0.3rem;

  @media (min-width: 768px) {
    height: 300px;
  }
`;

const ProfileContainer = styled.div`
  display: grid;
  margin: 1rem 0;
  gap: 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
  }
`;
