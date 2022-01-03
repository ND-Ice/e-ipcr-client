import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

export default function ViewResponse({ response }) {
  const { coreFunctions, supportFunctions } = response;
  return (
    <Container>
      <Table bordered>
        <thead>
          <tr>
            <td>
              <h6 className="m-0"> Statement of Functions </h6>
            </td>
            <td>
              <h6 className="m-0">Success Indicator (Target Measure) </h6>
            </td>
            <td>
              <h6 className="m-0">Actual Accomplishments </h6>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}>
              <h6>Core Functions - 90% </h6>
            </td>
          </tr>
          {coreFunctions?.map((coreFunc) => (
            <React.Fragment key={coreFunc?.id}>
              <tr>
                <td>
                  <h6 className="m-0">
                    {coreFunc?.title} ({coreFunc?.percentage}%)
                  </h6>
                  {coreFunc?.description && (
                    <Description>{coreFunc?.description}</Description>
                  )}
                </td>
                <td colSpan={2}></td>
              </tr>
              {coreFunc?.successIndicators?.map((successIndicator) => (
                <tr key={successIndicator?.id}>
                  <td></td>
                  <td>{successIndicator.title}</td>
                  <td>{successIndicator?.actualAccomplishments?.title}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      {/* Support Functions */}
      <Table bordered className="mt-4">
        <thead>
          <tr>
            <td>
              <h6 className="m-0"> Statement of Functions </h6>
            </td>
            <td>
              <h6 className="m-0">Success Indicator (Target Measure) </h6>
            </td>
            <td>
              <h6 className="m-0">Actual Accomplishments </h6>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}>
              <h6>Support Functions - 10% </h6>
            </td>
          </tr>
          {supportFunctions?.map((supportFunc) => (
            <React.Fragment key={supportFunc?.id}>
              <tr>
                <td>
                  <h6>
                    {supportFunc?.title} ({supportFunc?.percentage}%)
                  </h6>
                  {supportFunc?.description && (
                    <Description>{supportFunc?.description}</Description>
                  )}
                </td>
                <td></td>
                <td></td>
              </tr>
              {supportFunc?.successIndicators?.map((successIndicator) => (
                <tr key={successIndicator?.id}>
                  <td></td>
                  <td>
                    <Description>{successIndicator.title} </Description>
                  </td>
                  <td>
                    <Description>
                      {successIndicator?.actualAccomplishments?.title}{" "}
                    </Description>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const Description = styled.p`
  max-width: 30ch;
`;
