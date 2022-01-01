import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";

export default function ProfileItem({ icon: Icon, text, title }) {
  return (
    <Container>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="tooltip-button-2">{title}</Tooltip>}
      >
        <IconContainer>
          <Icon className="icon" />
        </IconContainer>
      </OverlayTrigger>
      <Item>{text}</Item>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
`;

const Item = styled.span`
  word-break: break-all;
`;
