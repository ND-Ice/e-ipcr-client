import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";

import { AddCoreRating, TemplateIcon } from "..";
import { setTargetIndicator } from "../../../store/templates";

export default function CoreRating({
  coreFunction,
  successIndicator,
  template,
  textProperty,
}) {
  const dispatch = useDispatch();
  const [showAddCoreRating, setShowAddCoreRating] = useState(false);

  return (
    <>
      <td className="text-center">
        {successIndicator?.actualAccomplishments?.rating?.[textProperty] || (
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
        onHide={() => setShowAddCoreRating(false)}
      >
        <AddCoreRating
          id={template?._id}
          coreFunctions={template?.coreFunctions}
          open={setShowAddCoreRating}
        />
      </Modal>
    </>
  );
}
