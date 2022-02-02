import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { EditSupportRating } from ".";

import { AddSupportRating, TemplateIcon } from "..";
import { setTargetIndicator } from "../../../store/templates";

export default function SupportRating({
  supportFunction,
  successIndicator,
  template,
  textProperty,
}) {
  const dispatch = useDispatch();
  const [showAddSupportRating, setShowAddSupportRating] = useState(false);
  const [showEditSupportRating, setShowEditSupportRating] = useState(false);

  return (
    <>
      <td className="text-center">
        {successIndicator?.actualAccomplishments?.rating?.[textProperty] ? (
          <Rating
            onClick={() => {
              dispatch(
                setTargetIndicator({
                  funcId: supportFunction?.id,
                  succId: successIndicator?.id,
                })
              );
              return setShowEditSupportRating(true);
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
                  funcId: supportFunction?.id,
                  succId: successIndicator?.id,
                })
              );
              return setShowAddSupportRating(true);
            }}
          />
        )}
      </td>
      {/* add support rating */}
      <Modal
        size="lg"
        show={showAddSupportRating}
        onHide={() => setShowAddSupportRating(false)}
      >
        <AddSupportRating
          id={template?._id}
          supportFunctions={template?.supportFunctions}
          open={setShowAddSupportRating}
        />
      </Modal>
      <Modal
        size="lg"
        show={showEditSupportRating}
        onHide={() => setShowEditSupportRating(false)}
      >
        <EditSupportRating
          id={template?._id}
          supportFunctions={template?.supportFunctions}
          open={setShowEditSupportRating}
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
