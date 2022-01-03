import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { AvatarProfile, UpdateProfilePicture, CustomModal } from ".";

export default function ProfileIntro({ user }) {
  const [show, setShow] = useState(false);
  return (
    <Container>
      <Header>
        <AvatarProfile size={100} user={user} onClick={() => setShow(true)} />
        <h3 className="mt-2">
          {user?.name?.firstName} {user?.name?.lastName}
        </h3>
        <p>{user?.college?.full}</p>
      </Header>
      <CustomModal
        show={show}
        onHide={() => setShow(false)}
        heading="Update Profile Picture"
      >
        <UpdateProfilePicture open={setShow} user={user} />
      </CustomModal>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
`;

const Header = styled.div`
  display: grid;
  place-items: center;
  padding: 1rem;
`;
