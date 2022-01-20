import React from "react";

export default function TableHeader() {
  return (
    <>
      <tr className="text-center text-uppercase">
        <td colSpan={8} className="fw-bold">
          INDIVIDUAL PERFORMANCE COMMITMENT REVIEW
        </td>
      </tr>
      <tr className="text-center text-uppercase">
        <td className="fw-bold">Statement of Functions</td>
        <td className="fw-bold">Success Indicators (Target Measure)</td>
        <td className="fw-bold">Actual Accomplishments</td>
        <td className="fw-bold" colSpan={5}>
          Rating
        </td>
      </tr>
    </>
  );
}
