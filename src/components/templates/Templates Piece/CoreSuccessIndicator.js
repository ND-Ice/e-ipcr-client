import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { EditCoreSuccessIndicator } from "..";
import { setTargetIndicator } from "../../../store/templates";

export default function CoreSuccessIndicator({
  coreFunction,
  successIndicator,
  template,
}) {
  const dispatch = useDispatch();
  const [showEditSuccessIndicator, setShowEditSuccessIndicator] =
    useState(false);

  return (
    <>
      <TableData
        onClick={() => {
          setShowEditSuccessIndicator(true);
          return dispatch(
            setTargetIndicator({
              funcId: coreFunction?.id,
              succId: successIndicator?.id,
            })
          );
        }}
      >
        <h6 className="m-0"> {successIndicator?.title}</h6>
        <p className="m-0">{successIndicator?.description}</p>
      </TableData>

      <Modal
        show={showEditSuccessIndicator}
        onHide={() => setShowEditSuccessIndicator(false)}
      >
        <EditCoreSuccessIndicator
          id={template?._id}
          coreFunctions={template?.coreFunctions}
          open={setShowEditSuccessIndicator}
        />
      </Modal>
    </>
  );
}

const TableData = styled.td`
  cursor: pointer;
  transition: all 120ms;

  :hover {
    color: ${({ theme }) => theme.colors.accent.blue};
  }
`;
