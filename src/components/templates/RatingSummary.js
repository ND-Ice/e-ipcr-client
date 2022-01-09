import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { TemplateIcon, AddComments } from ".";
import { getTemplates } from "../../store/templates";
import { getRemarks } from "../../utils";

export default function RatingSummary({ id, coreFunctions, supportFunctions }) {
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

  const coreFuncPercentage = coreFunctions.reduce(
    (acc, curr) => acc + parseInt(curr?.percentage),
    0
  );
  const supportFuncPercentage = supportFunctions.reduce(
    (acc, curr) => acc + parseInt(curr?.percentage),
    0
  );

  return (
    <>
      <tr>
        <td colSpan={8}></td>
      </tr>
      <tr>
        <td colSpan={3}>
          <Title>Rating Summary</Title>
        </td>
        <td className="text-center" colSpan={2}>
          Average
        </td>
        <td className="text-center" colSpan={2}>
          Percent
        </td>
        <td className="text-center">Score</td>
      </tr>
      <tr>
        <td colSpan={3} className="text-white bg-dark">
          Core Functions (90%)
        </td>
        <td colSpan={2} className="text-white bg-dark"></td>
        <td colSpan={2} className="text-white bg-dark"></td>
        <td className="text-white bg-dark"></td>
      </tr>
      {/* core Functions */}
      {coreFunctions.map((cf) => (
        <tr key={cf?.id}>
          <td colSpan={3}>{cf?.title}</td>
          <td className="text-center" colSpan={2}>
            {(
              cf?.rawAverage.reduce((acc, curr) => acc + curr, 0) /
              cf?.rawAverage?.length
            ).toFixed(2)}
          </td>
          <td className="text-center" colSpan={2}>
            {cf?.percentage}%
          </td>
          <td className="text-center">
            {(
              (cf?.rawAverage.reduce((acc, curr) => acc + curr, 0) /
                cf?.rawAverage?.length) *
              (cf?.percentage / 100)
            ).toFixed(2)}
          </td>
        </tr>
      ))}
      <tr>
        <td colSpan={3} className="text-white bg-dark">
          Support Functions (90%)
        </td>
        <td colSpan={2} className="text-white bg-dark"></td>
        <td colSpan={2} className="text-white bg-dark"></td>
        <td className="text-white bg-dark"></td>
      </tr>

      {/* support functions */}
      {supportFunctions.map((sf) => (
        <tr key={sf?.id}>
          <td colSpan={3}>{sf?.title}</td>
          <td className="text-center" colSpan={2}>
            {(
              sf?.rawAverage?.reduce((acc, curr) => acc + curr, 0) /
              sf?.rawAverage?.length
            ).toFixed(2)}
          </td>
          <td className="text-center" colSpan={2}>
            {sf?.percentage}%
          </td>
          <td className="text-center">
            {(
              (sf?.rawAverage?.reduce((acc, curr) => acc + curr, 0) /
                sf?.rawAverage?.length) *
              (sf?.percentage / 100)
            ).toFixed(2)}
          </td>
        </tr>
      ))}
      <tr>
        <td colSpan={8}></td>
      </tr>
      <tr>
        <td colSpan={5}>
          <Title>Final Average Rating</Title>
        </td>
        <td className="text-center" colSpan={2}>
          {coreFuncPercentage + supportFuncPercentage}%
        </td>
        <td className="text-center">{finalRating}</td>
      </tr>
      <tr>
        <td colSpan={3}>
          <Title>Final Adjectival Rating</Title>
        </td>
        <td className="text-center" colSpan={5}>
          <Title>Verbal Rating</Title>
        </td>
      </tr>
      <tr>
        <td colSpan={3}></td>
        <td colSpan={5} className="text-center">
          {getRemarks(finalRating)}
        </td>
      </tr>
    </>
  );
}

const Title = styled.div`
  font-weight: 500;
`;
