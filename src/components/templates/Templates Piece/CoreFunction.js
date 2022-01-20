import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiEdit, FiPlus } from "react-icons/fi";
import styled from "styled-components";

import { AddCoreSuccessIndicator, EditCoreFunction, TemplateIcon } from "..";
import { setCurrentId } from "../../../store/templates";

export default function CoreFunction({ coreFunction, template }) {
  const dispatch = useDispatch();
  const [showEditCoreFunction, setShowEditCoreFunction] = useState(false);
  const [showAddCoreIndicator, setShowAddCoreIndicator] = useState(false);

  return (
    <>
      <td colSpan={8}>
        <div className="d-flex align-items-center">
          <h6 className="m-0">
            {coreFunction?.title} - ({coreFunction?.percentage}%)
          </h6>
          <Icons className="d-inline-flex align-items-center">
            <FiPlus
              className="icon icon-add"
              onClick={() => {
                setShowAddCoreIndicator(true);
                return dispatch(setCurrentId({ currentId: coreFunction?.id }));
              }}
            />
            <FiEdit
              className="icon icon-edit"
              onClick={() => {
                setShowEditCoreFunction(true);
                return dispatch(setCurrentId({ currentId: coreFunction?.id }));
              }}
            />
          </Icons>
        </div>
        <Description> {coreFunction?.description}</Description>
      </td>
      {/* edit core function */}
      <Modal
        show={showEditCoreFunction}
        onHide={() => setShowEditCoreFunction(false)}
      >
        <EditCoreFunction
          id={template?._id}
          coreFunctions={template?.coreFunctions}
          open={setShowEditCoreFunction}
        />
      </Modal>
      {/* add success indicator*/}
      <Modal
        centered
        show={showAddCoreIndicator}
        onHide={() => setShowAddCoreIndicator(false)}
      >
        <AddCoreSuccessIndicator
          id={template?._id}
          open={setShowAddCoreIndicator}
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
  max-width: 50ch;
  margin: 0;
`;
