import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";

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
        show={showAddSupportRating}
        onHide={() => setShowAddSupportRating(false)}
      >
        <AddSupportRating
          id={template?._id}
          supportFunctions={template?.supportFunctions}
          open={setShowAddSupportRating}
        />
      </Modal>
    </>
  );
}
