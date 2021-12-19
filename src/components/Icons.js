import React from "react";
import styled from "styled-components";

export default function Icons(props) {
  const { icon: Icon, size, backgroundColor, iconColor, ...otherProps } = props;
  return (
    <IconContainer
      bg={backgroundColor}
      iconColor={iconColor}
      iconSize={size * 0.6}
      size={size}
      {...otherProps}
    >
      <Icon className="icon" />
    </IconContainer>
  );
}

const IconContainer = styled.span`
  display: grid;
  place-items: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background: ${({ bg }) => bg};
  border-radius: 50%;
  transition: all 0.3s;
  cursor: pointer;

  .icon {
    width: ${({ iconSize }) => `${iconSize}px`};
    height: ${({ iconSize }) => `${iconSize}px`};
    color: ${({ iconColor }) => iconColor};
  }

  :hover {
    opacity: 0.8;
  }
`;
