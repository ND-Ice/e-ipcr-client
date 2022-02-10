import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import moment from "moment";

import { CustomModal, BasicInfoItem } from ".";
import { UpdateBasicInformation } from ".";

export default function BasicInformation({ user }) {
  const [show, setShow] = useState(false);
  return (
    <Container>
      <Header>
        <h6 className="m-0 text-uppercase fw-bold">Basic Information</h6>
        <FiEdit className="edit-icon" onClick={() => setShow(true)} />
      </Header>
      <Content>
        <BasicInfoItem title="First Name" item={user?.name?.firstName} />
        <BasicInfoItem
          title="Middle Name"
          item={user?.name?.middleName || "Not yet defined."}
        />
        <BasicInfoItem title="Last Name" item={user?.name?.lastName} />
        <BasicInfoItem
          title="Gender"
          item={user?.gender || "Not yet defined."}
        />
        <BasicInfoItem
          title="Date of Birth"
          item={moment(user?.birthDate).format("LL") || "Not yet defined."}
        />
        <BasicInfoItem
          title="Age"
          item={moment().diff(user?.birthDate, "years") || "Not yet defined."}
        />
        <BasicInfoItem
          title="Department"
          item={user?.dept || "Not yet defined."}
        />
        <BasicInfoItem
          title="Position"
          item={user?.position || "Not yet defined."}
        />
        <BasicInfoItem
          title="Highest qualification"
          item={user?.qualification || "Not yet defined."}
        />
      </Content>

      <CustomModal
        heading="Update Basic Information"
        show={show}
        onHide={() => setShow(false)}
      >
        <UpdateBasicInformation open={setShow} user={user} />
      </CustomModal>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const Header = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};

  .edit-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: all 0.3s;

    :hover {
      color: ${({ theme }) => theme.colors.accent.blue};
    }
  }
`;

const Content = styled.div`
  padding: 1rem;
  display: grid;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
`;
