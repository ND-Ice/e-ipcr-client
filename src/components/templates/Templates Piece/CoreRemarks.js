import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";
import styled from "styled-components";

import { AddCoreFunctionRemarks, EditCoreRemarks, TemplateIcon } from "..";
import { setTargetIndicator } from "../../../store/templates";

export default function CoreRemarks({
  coreFunction,
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
                    funcId: coreFunction?.id,
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
                      funcId: coreFunction?.id,
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

      <Modal show={showAddRemarks} onHide={() => setShowAddRemarks(false)}>
        <AddCoreFunctionRemarks id={template?._id} open={setShowAddRemarks} />
      </Modal>
      <Modal show={showEditRemarks} onHide={() => setShowEditRemarks(false)}>
        <EditCoreRemarks
          id={template?._id}
          open={setShowEditRemarks}
          successIndicator={successIndicator}
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
