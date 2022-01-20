import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus, FiEdit } from "react-icons/fi";

import { AddSupportSuccessIndicator, EditSupportFunction } from "..";
import { setCurrentId } from "../../../store/templates";

export default function SupportFunction({ supportFunction, template }) {
  const dispatch = useDispatch();
  const [showEditSupportFunction, setShowEditSupportFunction] = useState(false);
  const [showAddSupportIndicator, setShowAddSupportIndicator] = useState(false);

  return (
    <>
      <td colSpan={8}>
        <div className="d-flex align-items-center">
          <h6 className="m-0">
            {supportFunction?.title} - ({supportFunction?.percentage}%)
          </h6>
          <Icons>
            <FiPlus
              className="icon icon-add"
              onClick={() => {
                setShowAddSupportIndicator(true);
                return dispatch(
                  setCurrentId({ currentId: supportFunction?.id })
                );
              }}
            />
            <FiEdit
              className="icon icon-edit"
              onClick={() => {
                setShowEditSupportFunction(true);
                return dispatch(
                  setCurrentId({ currentId: supportFunction?.id })
                );
              }}
            />
          </Icons>
        </div>
        <Description>{supportFunction?.description}</Description>
      </td>
      {/* edit support function */}
      <Modal
        show={showEditSupportFunction}
        onHide={() => setShowEditSupportFunction(false)}
      >
        <EditSupportFunction
          id={template?._id}
          supportFunctions={template?.supportFunctions}
          open={setShowEditSupportFunction}
        />
      </Modal>
      {/* add success indicator */}
      <Modal
        centered
        show={showAddSupportIndicator}
        onHide={() => setShowAddSupportIndicator(false)}
      >
        <AddSupportSuccessIndicator
          id={template?._id}
          open={setShowAddSupportIndicator}
        />
      </Modal>
    </>
  );
}

const Icons = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 1rem;

  .icon {
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 0.2rem;
    transition: all 120ms ease-in-out;

    :hover {
      transform: scale(1.2);
      transform-origin: bottom;
    }
  }

  .icon-add {
    color: ${({ theme }) => theme.colors.accent.blue};
  }

  .icon-edit {
    color: ${({ theme }) => theme.colors.accent.emerald};
  }
`;

const Description = styled.p`
  margin: 0;
  max-width: 50ch;
`;
