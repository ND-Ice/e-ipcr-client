import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";

import { setTargetIndicator } from "../../../store/templates";
import { EditSupportSuccessIndicator } from "..";

export default function SupportSuccessIndicator({
  supportFunction,
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
              funcId: supportFunction?.id,
              succId: successIndicator?.id,
            })
          );
        }}
      >
        <h6 className="m-0">{successIndicator?.title}</h6>
        <p className="m-0">{successIndicator?.description}</p>
      </TableData>

      <Modal
        show={showEditSuccessIndicator}
        onHide={() => setShowEditSuccessIndicator(false)}
      >
        <EditSupportSuccessIndicator
          id={template?._id}
          supportFunctions={template?.supportFunctions}
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
