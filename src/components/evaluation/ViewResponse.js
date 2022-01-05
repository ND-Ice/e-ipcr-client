import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import Logo from "../../image/logo.png";
import { getRemarks } from "../../utils";

export default function ViewResponse({ response }) {
  const { coreFunctions, supportFunctions } = response;

  // get the core functions ratings
  const coreFuncRating = coreFunctions?.map((coreFunc) => {
    const ave = coreFunc?.rawAverage?.reduce((acc, curr) => acc + curr, 0);
    return (
      (ave / coreFunc?.successIndicators?.length) * (coreFunc?.percentage / 100)
    );
  });

  // get the support functions rating
  const supportFuncRating = supportFunctions?.map((suppFunc) => {
    const ave = suppFunc?.rawAverage?.reduce((acc, curr) => acc + curr, 0);
    return (
      (ave / suppFunc?.successIndicators?.length) * (suppFunc?.percentage / 100)
    );
  });

  const finalRating = [...supportFuncRating, ...coreFuncRating]
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  return (
    <Container>
      <Header>
        <LogoImage src={Logo} />
        <div className="text-center">
          <i>Republic of the Philippines</i>
          <h4 className="m-0">
            EULOGIO “AMANG” RODRIGUEZ INSTITUTE OF SCIENCE AND TECHNOLOGY
          </h4>
          <i>Nagtahan, Sampaloc, Manila</i>
        </div>
      </Header>
      <Table bordered>
        <tbody>
          <tr className="text-center">
            <td colSpan={3}>Individual Performance Commitment Review</td>
          </tr>
          {/* header */}
          <tr className="text-center">
            <td>Statement of Functions</td>
            <td>Success Indicator (Target Measure)</td>
            <td>Actual Accomplishments</td>
          </tr>
          <tr>
            {/* content */}
            <td colSpan={3} className="bg-dark text-white">
              Core Functions - 90%
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

          {/* support functions */}
          <tr>
            <td colSpan={3} className="bg-dark text-white">
              Support Functions - 10%
            </td>
          </tr>
          {supportFunctions?.map((supportFunc) => (
            <React.Fragment key={supportFunc?.id}>
              <tr>
                <td colSpan={3}>
                  <h6>
                    {supportFunc?.title} ({supportFunc?.percentage}%)
                  </h6>
                  {supportFunc?.description && (
                    <Description>{supportFunc?.description}</Description>
                  )}
                </td>
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
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      {/* Rating Summary */}
      <Table bordered className="mt-2">
        <tbody>
          {/* heading */}
          <tr>
            <td>Summary of Ratings</td>
            <td className="text-center">Average</td>
            <td className="text-center">Percent</td>
            <td className="text-center">Score</td>
          </tr>
          {/* indicator */}
          <tr className="text-center">
            <td colSpan={4} className="bg-secondary text-white">
              Core Functions
            </td>
          </tr>

          {/* core functions */}
          {coreFunctions?.map((coreFunc) => (
            <tr>
              <td>{coreFunc?.title}</td>
              <td className="text-center">
                {(
                  coreFunc?.rawAverage?.reduce((acc, curr) => acc + curr) /
                  coreFunc?.rawAverage?.length
                ).toFixed(2)}
              </td>
              <td className="text-center">{coreFunc?.percentage}%</td>
              <td className="text-center">
                {(
                  (coreFunc?.rawAverage?.reduce((acc, curr) => acc + curr) /
                    coreFunc?.rawAverage?.length) *
                  (coreFunc?.percentage / 100)
                ).toFixed(2)}
              </td>
            </tr>
          ))}

          <tr className="text-center">
            <td colSpan={4} className="bg-secondary text-white">
              Support Functions
            </td>
          </tr>

          {/* support functions */}
          {supportFunctions?.map((suppFunc) => (
            <tr>
              <td>{suppFunc?.title}</td>
              <td className="text-center">
                {(
                  suppFunc?.rawAverage?.reduce((acc, curr) => acc + curr) /
                  suppFunc?.rawAverage?.length
                ).toFixed(2)}
              </td>
              <td className="text-center">{suppFunc?.percentage}%</td>
              <td className="text-center">
                {(
                  (suppFunc?.rawAverage?.reduce((acc, curr) => acc + curr) /
                    suppFunc?.rawAverage?.length) *
                  (suppFunc?.percentage / 100)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr className="text-center bg-secondary text-white">
            <td colSpan={4}>Ratings</td>
          </tr>

          <tr>
            <td colSpan={2}>Final Rating</td>
            <td className="text-center">100%</td>
            <td className="text-center">{finalRating}</td>
          </tr>
          <tr>
            <td colSpan={2}>Adjectival Rating</td>
            <td colSpan={2} className="text-center">
              {getRemarks(finalRating)}
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="">
        <h5>Comments and Recommendations</h5>
        <p className="ms-2">{response?.isApproved?.recommendation}</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const Description = styled.p`
  max-width: 40ch;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  position: relative;
  left: -4rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;
