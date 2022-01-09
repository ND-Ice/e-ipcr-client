import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

import Logo from "../../image/logo.png";
import { RatingSummary } from "../templates";
import Attachment from "./Attachment";

export default function ViewResponse({ response }) {
  const { coreFunctions, supportFunctions, _id, attachments } = response;

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

  const handleNavigate = (path) =>
    window.open(`https://e-ipcr-backend.herokuapp.com/${path}`, " _blank");

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
      <Table bordered hover>
        <thead>
          <tr className="text-center">
            <td colSpan={8}>INDIVIDUAL PERFORMANCE COMMITMENT REVIEW</td>
          </tr>
          <tr className="text-center">
            <td>Statement of Functions</td>
            <td>SuccessIndicator (Target Measure)</td>
            <td>Actual Accomplishments</td>
            <td colSpan={5}>Rating</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} className=" text-white bg-dark">
              Core Functions - 90%
            </td>
            <td className="text-center text-white bg-dark">Quality</td>
            <td className="text-center text-white bg-dark">Timeliness</td>
            <td className="text-center text-white bg-dark">Efficiency</td>
            <td className="text-center text-white bg-dark">Average</td>
            <td className="text-center text-white bg-dark">Remarks</td>
          </tr>

          {/*==================================== core functions ==========================================*/}
          {coreFunctions?.map((cf) => (
            <React.Fragment key={cf?.id}>
              <tr>
                {/* core function title */}
                <TableData colSpan={8}>
                  <Title>
                    {cf?.title} - ({cf?.percentage}%){" "}
                  </Title>
                  {/* function description */}
                  <p className="m-0"> {cf?.description}</p>
                </TableData>
              </tr>
              {cf?.successIndicators.map((sIn) => (
                <tr key={sIn?.id}>
                  <td></td>
                  <TableData>
                    {sIn?.title}
                    <p className="m-0">{sIn?.description}</p>
                  </TableData>
                  {/* actual accomplishments */}
                  <td>
                    {sIn?.actualAccomplishments?.title && (
                      <Accomplishment>
                        <p className="m-0">
                          {sIn?.actualAccomplishments?.title}
                        </p>
                        <p className="m-0">
                          {sIn?.actualAccomplishments?.description}
                        </p>
                      </Accomplishment>
                    )}
                  </td>
                  {/* quality timeliness efficiency */}
                  {/* ================ quality ======================== */}
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.quality}
                  </td>
                  {/* ============================= timelines =========================== */}
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.timeliness}
                  </td>
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.efficiency}
                  </td>
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.average.toFixed(2)}
                  </td>
                  {/* remarks */}
                  <td>{sIn?.remarks}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}

          {/* ============================== support functions ==================================*/}
          <tr>
            <td colSpan={8} className="text-white bg-dark">
              Support Functions - 10%
            </td>
          </tr>
          {supportFunctions?.map((sf) => (
            <React.Fragment key={sf?.id}>
              <tr>
                <TableData colSpan={8}>
                  <Title>
                    {sf?.title} - ({sf?.percentage}%)
                  </Title>
                  <p className="m-0">{sf?.description}</p>
                </TableData>
              </tr>
              {sf?.successIndicators.map((sIn) => (
                <tr key={sIn?.id}>
                  <td></td>
                  <TableData>
                    {sIn?.title}
                    <p className="m-0">{sIn?.description}</p>
                  </TableData>
                  {/* actual accomplishment */}
                  <td>{sIn?.actualAccomplishments?.title}</td>
                  {/* quality timeliness efficiency */}
                  {/* ========================= quality ================================== */}
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.quality}
                  </td>
                  {/* =========================== timeliness  =========================*/}
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.timeliness}
                  </td>
                  {/* =========================== Efficiency  =========================*/}
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.efficiency}
                  </td>
                  <td className="text-center">
                    {sIn?.actualAccomplishments?.rating?.average.toFixed(2)}
                  </td>
                  {/* remarks */}
                  <td>{sIn?.remarks}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}

          {/* ======================= rating summary ========================= */}
          <RatingSummary
            id={_id}
            coreFunctions={coreFunctions}
            supportFunctions={supportFunctions}
          />
        </tbody>
      </Table>
      {attachments?.map((attachment) => (
        <Attachment info={attachment} onNavigate={handleNavigate} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
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

const IconContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const TableData = styled.td`
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const Accomplishment = styled.div`
  cursor: pointer;
`;
