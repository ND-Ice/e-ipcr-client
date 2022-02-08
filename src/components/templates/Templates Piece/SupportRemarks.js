import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";
import styled from "styled-components";

import { AddSupportFunctionRemarks, TemplateIcon } from "..";
import { setTargetIndicator } from "../../../store/templates";
import EditSupportRemarks from "../EditSupportRemarks";

export default function SupportRemarks({
  supportFunction,
  successIndicator,
  template,
}) {
  const dispatch = useDispatch();
  const [showAddRemarks, setShowAddRemarks] = useState(false);
  const [showEditRemarks, setShowEditRemarks] = useState(false);

  return (
    <>
      {successIndicator?.actualAccomplishments?.title ? (
        <td>
          {successIndicator?.remarks ? (
            <Remarks
              onClick={() => {
                setShowEditRemarks(true);
                return dispatch(
                  setTargetIndicator({
                    funcId: supportFunction?.id,
                    succId: successIndicator?.id,
                  })
                );
              }}
            >
              {successIndicator?.remarks}
            </Remarks>
          ) : (
            <div className="text-center">
              <TemplateIcon
                icon={FiPlus}
                fg="#ffffff"
                bg="#0891b2"
                onClick={() => {
                  dispatch(
                    setTargetIndicator({
                      funcId: supportFunction?.id,
                      succId: successIndicator?.id,
                    })
                  );
                  return setShowAddRemarks(true);
                }}
              />
            </div>
          )}
        </td>
      ) : (
        <td></td>
      )}
      {/* add support remarks */}
      <Modal show={showAddRemarks} onHide={() => setShowAddRemarks(false)}>
        <AddSupportFunctionRemarks
          id={template?._id}
          open={setShowAddRemarks}
        />
      </Modal>
      <Modal show={showEditRemarks} onHide={() => setShowEditRemarks(false)}>
        <EditSupportRemarks
          id={template?._id}
          successIndicator={successIndicator}
          open={setShowEditRemarks}
        />
      </Modal>
    </>
  );
}

const Remarks = styled.p`
  margin: 0;
  transition: all 120ms;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.accent.blue};
  }
`;
