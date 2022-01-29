import React from "react";
import styled from "styled-components";
import { HashLoader } from "react-spinners";

export default function Loader() {
  return (
    <Container>
      <div className="text-center">
        <HashLoader loading color="#0064f9" size={80} />
        <LoaderIndicator>Loading</LoaderIndicator>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  min-height: 500px;
  display: grid;
  place-items: center;
`;

const LoaderIndicator = styled.div`
  margin-top: 3rem;
  font-size: 2rem;
  font-weight: 500;
`;
