import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";

import { getTemplates, setTargetIndicator } from "../../store/templates";
import { getUser } from "../../store/user";

import FilePicker from "../FilePicker/FilePicker";
import { RatingSummary } from ".";
import {
  CoreAccomplishment,
  CoreFunction,
  CoreFunctionHeader,
  CoreRating,
  CoreRemarks,
  CoreSuccessIndicator,
  SupportAccomplishment,
  SupportFunction,
  SupportFunctionHeader,
  SupportRating,
  SupportRemarks,
  SupportSuccessIndicator,
  TableHeader,
} from "./Templates Piece";
import Signatory from "./Signatory";

export default function Templates() {
  const templates = useSelector(getTemplates);
  const user = useSelector(getUser);

  const currentYear = new Date().getFullYear();

  const template = templates?.list?.filter(
    (template) =>
      parseInt(template?.targetYear) === currentYear &&
      template?.target === user?.currentUser?.position
  )[0];

  return (
    <Container>
      {template ? (
        <>
          <Table bordered>
            <tbody>
              {/* head */}
              <TableHeader />
              <CoreFunctionHeader template={template} />

              {/*==================================== core functions ==========================================*/}

              {template?.coreFunctions?.map((cf) => (
                <React.Fragment key={cf?.id}>
                  <tr>
                    <CoreFunction coreFunction={cf} template={template} />
                  </tr>
                  {cf?.successIndicators.map((succ) => (
                    <tr key={succ?.id}>
                      <td></td>
                      <CoreSuccessIndicator
                        coreFunction={cf}
                        successIndicator={succ}
                        template={template}
                      />
                      {/* actual accomplishments */}
                      <CoreAccomplishment
                        coreFunction={cf}
                        successIndicator={succ}
                        template={template}
                      />
                      {/* ================ quality ======================== */}
                      <CoreRating
                        coreFunction={cf}
                        successIndicator={succ}
                        template={template}
                        textProperty={"quality"}
                      />
                      {/* ============================= timelines =========================== */}
                      <CoreRating
                        coreFunction={cf}
                        successIndicator={succ}
                        template={template}
                        textProperty={"timeliness"}
                      />
                      {/* ========================== efficiency ================== */}
                      <CoreRating
                        coreFunction={cf}
                        successIndicator={succ}
                        template={template}
                        textProperty={"efficiency"}
                      />
                      <td className="text-center">
                        {succ?.actualAccomplishments?.rating?.average?.toFixed(
                          2
                        )}
                      </td>
                      {/* remarks */}
                      <CoreRemarks
                        coreFunction={cf}
                        successIndicator={succ}
                        template={template}
                      />
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* ============================== support functions ==================================*/}

              <SupportFunctionHeader template={template} />
              {template?.supportFunctions?.map((sf) => (
                <React.Fragment key={sf?.id}>
                  <tr>
                    <SupportFunction supportFunction={sf} template={template} />
                  </tr>
                  {sf?.successIndicators.map((succ) => (
                    <tr key={succ?.id}>
                      <td></td>
                      <SupportSuccessIndicator
                        supportFunction={sf}
                        successIndicator={succ}
                        template={template}
                      />
                      {/* actual accomplishment */}
                      <SupportAccomplishment
                        supportFunction={sf}
                        successIndicator={succ}
                        template={template}
                      />
                      {/* ========================= quality ================================== */}
                      <SupportRating
                        supportFunction={sf}
                        successIndicator={succ}
                        template={template}
                        textProperty={"quality"}
                      />
                      {/* =========================== timeliness  =========================*/}
                      <SupportRating
                        supportFunction={sf}
                        successIndicator={succ}
                        template={template}
                        textProperty={"timeliness"}
                      />
                      {/* =========================== Efficiency  =========================*/}
                      <SupportRating
                        supportFunction={sf}
                        successIndicator={succ}
                        template={template}
                        textProperty={"efficiency"}
                      />
                      <td className="text-center">
                        {succ?.actualAccomplishments?.rating?.average?.toFixed(
                          2
                        )}
                      </td>
                      {/* remarks */}
                      <SupportRemarks
                        supportFunction={sf}
                        successIndicator={succ}
                        template={template}
                      />
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {/* ======================= rating summary ========================= */}
              <RatingSummary
                id={template?._id}
                comments={template?.comments}
                coreFunctions={template?.coreFunctions}
                supportFunctions={template?.supportFunctions}
              />
              {/* ===================== signatories ===================== */}
              <tr>
                <td colSpan={8}></td>
              </tr>
              <tr>
                <td colSpan={8} className="p-4">
                  <Signatory template={template} />
                </td>
              </tr>
            </tbody>
          </Table>
          <FilePicker id={template?._id} template={template} />
        </>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem;
`;
