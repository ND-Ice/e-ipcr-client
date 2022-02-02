import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";
import styled from "styled-components";

import {
  AddCoreAccomplishment,
  EditCoreAccomplishment,
  TemplateIcon,
} from "..";
import { setTargetIndicator } from "../../../store/templates";

export default function CoreAccomplishment({
  coreFunction,
  successIndicator,
  template,
}) {
  const dispatch = useDispatch();
  const [showAddAccomplishment, setShowAddAccomplishment] = useState(false);
  const [showEditAccomplishment, setShowEditAccomplishment] = useState(false);
  return (
    <>
      <td>
        {successIndicator?.actualAccomplishments?.title ? (
          <Accomplishment
            onClick={() => {
              setShowEditAccomplishment(true);
              return dispatch(
                setTargetIndicator({
                  funcId: coreFunction?.id,
                  succId: successIndicator?.id,
                })
              );
            }}
          >
            <Title>{successIndicator?.actualAccomplishments?.title}</Title>
            <p className="m-0">
              {successIndicator?.actualAccomplishments?.description}
            </p>
          </Accomplishment>
        ) : (
          <div className="text-center">
            <TemplateIcon
              icon={FiPlus}
              fg="#ffffff"
              bg="#0891b2"
              onClick={() => {
                setShowAddAccomplishment(true);
                return dispatch(
                  setTargetIndicator({
                    funcId: coreFunction?.id,
                    succId: successIndicator?.id,
                  })
                );
              }}
            />
          </div>
        )}
      </td>
      {/* add accomplishment */}
      <Modal
        size="lg"
        show={showAddAccomplishment}
        onHide={() => setShowAddAccomplishment(false)}
      >
        <AddCoreAccomplishment
          id={template?._id}
          coreFunctions={template?.coreFunctions}
          open={setShowAddAccomplishment}
        />
      </Modal>

      {/* edit accomplishment */}
      <Modal
        size="lg"
        show={showEditAccomplishment}
        onHide={() => setShowEditAccomplishment(false)}
      >
        <EditCoreAccomplishment
          id={template?._id}
          coreFunctions={template?.coreFunctions}
          open={setShowEditAccomplishment}
        />
      </Modal>
    </>
  );
}

const Accomplishment = styled.div`
  cursor: pointer;
  transition: all 120ms;

  :hover {
    color: ${({ theme }) => theme.colors.accent.blue};
  }
`;

const Title = styled.h6`
  margin: 0;
  max-width: 50ch;
`;
