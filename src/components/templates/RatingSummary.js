import React from "react";
import styled from "styled-components";

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
      <tr className="text-uppercase">
        <td colSpan={3} className="fw-bold">
          Rating Summary
        </td>
        <td className="text-center fw-bold">Average</td>
        <td className="text-center fw-bold" colSpan={2}>
          Percent
        </td>
        <td className="text-center fw-bold" colSpan={2}>
          Score
        </td>
      </tr>
      <tr className="bg-warning text-white fw-bold text-uppercase">
        <td colSpan={3}>Core Functions (90%)</td>
        <td></td>
        <td colSpan={2}></td>
        <td colSpan={2}></td>
      </tr>
      {/* core Functions */}
      {coreFunctions.map((cf) => (
        <tr key={cf?.id}>
          <td colSpan={3}>{cf?.title}</td>
          <td className="text-center"></td>
          <td className="text-center" colSpan={2}>
            {cf?.percentage}%
          </td>
          <td className="text-center" colSpan={2}>
            {cf?.rawAverage?.length !== 0
              ? (
                  (cf?.rawAverage.reduce((acc, curr) => acc + curr, 0) /
                    cf?.rawAverage?.length) *
                  (cf?.percentage / 100)
                ).toFixed(2)
              : ""}
          </td>
        </tr>
      ))}
      <tr className="bg-warning text-white fw-bold text-uppercase">
        <td colSpan={3}>Support Functions (90%)</td>
        <td></td>
        <td colSpan={2}></td>
        <td colSpan={2}></td>
      </tr>

      {/* support functions */}
      {supportFunctions.map((sf) => (
        <tr key={sf?.id}>
          <td colSpan={3}>{sf?.title}</td>
          <td></td>
          <td className="text-center" colSpan={2}>
            {sf?.percentage}%
          </td>
          <td className="text-center" colSpan={2}>
            {sf?.rawAverage?.length !== 0
              ? (
                  (sf?.rawAverage?.reduce((acc, curr) => acc + curr, 0) /
                    sf?.rawAverage?.length) *
                  (sf?.percentage / 100)
                ).toFixed(2)
              : ""}
          </td>
        </tr>
      ))}
      <tr>
        <td colSpan={8}></td>
      </tr>
      <tr>
        <td colSpan={4} className="fw-bold">
          Final Average Rating
        </td>
        <td className="text-center fw-bold" colSpan={2}>
          {coreFuncPercentage + supportFuncPercentage}%
        </td>
        <td className="text-center fw-bold" colSpan={2}>
          {finalRating}
        </td>
      </tr>
      <tr>
        <td colSpan={3} className="fw-bold">
          Final Adjectival Rating
        </td>
        <td colSpan={5} className="text-center fw-bold text-uppercase">
          {getRemarks(finalRating)}
        </td>
      </tr>
    </>
  );
}
