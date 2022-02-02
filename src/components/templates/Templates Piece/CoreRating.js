import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";
import styled from "styled-components";

import { AddCoreRating, TemplateIcon } from "..";
import { setTargetIndicator } from "../../../store/templates";
import { EditCoreRating } from ".";

export default function CoreRating({
  coreFunction,
  successIndicator,
  template,
  textProperty,
}) {
  const dispatch = useDispatch();
  const [showAddCoreRating, setShowAddCoreRating] = useState(false);
  const [showEditCoreRating, setShowEditCoreRating] = useState(false);

  return (
    <>
      <td className="text-center">
        {successIndicator?.actualAccomplishments?.rating?.[textProperty] ? (
          <Rating
            onClick={() => {
              dispatch(
                setTargetIndicator({
                  funcId: coreFunction?.id,
                  succId: successIndicator?.id,
                })
              );
              return setShowEditCoreRating(true);
            }}
          >
            {successIndicator?.actualAccomplishments?.rating?.[textProperty]}
          </Rating>
        ) : (
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
              return setShowAddCoreRating(true);
            }}
          />
        )}
      </td>
      <Modal
        show={showAddCoreRating}
        size="lg"
        onHide={() => setShowAddCoreRating(false)}
      >
        <AddCoreRating
          id={template?._id}
          coreFunctions={template?.coreFunctions}
          open={setShowAddCoreRating}
        />
      </Modal>
      <Modal
        show={showEditCoreRating}
        size="lg"
        onHide={() => setShowEditCoreRating(false)}
      >
        <EditCoreRating
          id={template?._id}
          coreFunctions={template?.coreFunctions}
          open={setShowEditCoreRating}
        />
      </Modal>
    </>
  );
}

const Rating = styled.div`
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    color: ${({ theme }) => theme.colors.accent.blue};
  }
`;
