import React from "react";
import styled from "styled-components";

import { FiCamera } from "react-icons/fi";
import { Icons } from ".";

export default function AvatarProfile(props) {
  const { onClick } = props;

  return (
    <Container>
      <IconContainer>
        <Icons
          icon={FiCamera}
          size={40}
          iconColor="#ffffff"
          backgroundColor="#0064f9"
          onClick={onClick}
        />
      </IconContainer>
      <AvatarImage src="https://scontent.fmnl3-2.fna.fbcdn.net/v/t1.6435-9/71756577_196585848007718_4137557491925909504_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeG1y-KmTF4YjCu05IbCuU9ZgzJHcpnrvHeDMkdymeu8d5EQBgpQ28egWp9x6HhuGOn_yUy5HHIKo4yjgYHyxa7c&_nc_ohc=YsWuvrFrWsYAX8xnyg9&_nc_ht=scontent.fmnl3-2.fna&oh=cc987b3ceecf03c3021c16edcbed95b6&oe=61A37351" />
    </Container>
  );
}

const Container = styled.div`
  width: 150px;
  height: 150px;
  padding: 0.2rem;
  background-color: #0064f9;
  border-radius: 50%;
  position: relative;
  border: 4px solid #ffffff;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 4px solid #ffffff;
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;
