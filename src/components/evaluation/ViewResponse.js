import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

import Logo from "../../image/logo.png";
import { RatingSummary } from "../templates";
import Attachment from "./Attachment";
import Feedback from "../Feedback";
import { ApprovedBy, Respondent, Signature } from "..";

export default function ViewResponse({ response, open }) {
  const {
    coreFunctions,
    supportFunctions,
    _id,
    attachments,
    feedback,
    status,
  } = response;

  const handleClose = () => open(false);

  const handleNavigate = (path) =>
    window.open(`https://e-ipcr-backend.herokuapp.com/${path}`, " _blank");

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-end">
        <Icon onClick={handleClose}>
          <FiX />
        </Icon>
      </div>
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
          {/* heading */}
          <tr className="text-center">
            <td colSpan={8} className="fw-bold">
              INDIVIDUAL PERFORMANCE COMMITMENT REVIEW
            </td>
          </tr>
          {status?.faculty?.signature && <Respondent response={response} />}
          {status?.intermediateSupervisor?.signature && (
            <>
              <tr className="fw-bold text-uppercase">
                <td colSpan={8}>Approved By</td>
              </tr>
              {/* =================== approved by ========================= */}
              <tr>
                <td colSpan={8}>
                  <ApprovedBy response={response} />
                </td>
              </tr>
            </>
          )}

          <tr className="text-center fw-bold text-uppercase">
            <td>Statement of Functions</td>
            <td>SuccessIndicator (Target Measure)</td>
            <td>Actual Accomplishments</td>
            <td colSpan={5}>Rating</td>
          </tr>
          <tr className="text-uppercase fw-bold">
            <td colSpan={3} className=" text-white bg-warning">
              Core Functions - 90%
            </td>
            <td className="text-center text-white bg-warning">Quality</td>
            <td className="text-center text-white bg-warning">Timeliness</td>
            <td className="text-center text-white bg-warning">Efficiency</td>
            <td className="text-center text-white bg-warning">Average</td>
            <td className="text-center text-white bg-warning">Remarks</td>
          </tr>

          {/*==================================== core functions ==========================================*/}
          {coreFunctions?.map((cf) => (
            <React.Fragment key={cf?.id}>
              <tr>
                {/* core function title */}
                <TableData colSpan={8}>
                  <h6 className="m-0">
                    {cf?.title} - ({cf?.percentage}%){" "}
                  </h6>
                  {/* function description */}
                  <Description> {cf?.description}</Description>
                </TableData>
              </tr>
              {cf?.successIndicators.map((sIn) => (
                <tr key={sIn?.id}>
                  <td></td>
                  <TableData>
                    <h6 className="m-0">{sIn?.title}</h6>
                    <Description>{sIn?.description}</Description>
                  </TableData>
                  {/* actual accomplishments */}
                  <td>
                    {sIn?.actualAccomplishments?.title && (
                      <Accomplishment>
                        <AccomplishmentTitle>
                          {sIn?.actualAccomplishments?.title}
                        </AccomplishmentTitle>
                        <Description>
                          {sIn?.actualAccomplishments?.description}
                        </Description>
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
          <tr className="text-uppercase fw-bold">
            <td colSpan={8} className="text-white bg-warning">
              Support Functions - 10%
            </td>
          </tr>
          {supportFunctions?.map((sf) => (
            <React.Fragment key={sf?.id}>
              <tr>
                <TableData colSpan={8}>
                  <h6 className="m-0">
                    {sf?.title} - ({sf?.percentage}%)
                  </h6>
                  <Description>{sf?.description}</Description>
                </TableData>
              </tr>
              {sf?.successIndicators.map((sIn) => (
                <tr key={sIn?.id}>
                  <td></td>
                  <TableData>
                    <h6 className="m-0">{sIn?.title}</h6>
                    <Description>{sIn?.description}</Description>
                  </TableData>
                  {/* actual accomplishment */}
                  <td>
                    <Accomplishment>
                      <AccomplishmentTitle>
                        {sIn?.actualAccomplishments?.title}
                      </AccomplishmentTitle>
                      <Description>
                        {sIn?.actualAccomplishments?.description}
                      </Description>
                    </Accomplishment>
                  </td>
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
          {/* ====================== feedback ====================== */}
          <Feedback feedback={feedback} />
          <tr>
            <td colSpan={8} className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                {status?.director?.signature && (
                  <Signature response={response} positionProperty="director" />
                )}
                {status?.PMT?.signature && (
                  <Signature response={response} positionProperty="PMT" />
                )}
                {status?.HEAD?.signature && (
                  <Signature response={response} positionProperty="HEAD" />
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* attachments */}
      {attachments?.length !== 0 && (
        <div>
          <h6>Attachments</h6>
          {attachments?.map((attachment) => (
            <Attachment info={attachment} onNavigate={handleNavigate} />
          ))}
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  overflow: auto;
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

const Icon = styled.div`
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 2px;
  transition: all 120ms;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  > * {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  margin: 0;
  max-width: 40ch;
`;

const TableData = styled.td`
  cursor: pointer;
`;

const Accomplishment = styled.div`
  cursor: pointer;
  transition: all 120ms;

  :hover {
    color: ${({ theme }) => theme.colors.accent.blue};
  }
`;

const AccomplishmentTitle = styled.h6`
  max-width: 35ch;
  margin: 0;
`;
