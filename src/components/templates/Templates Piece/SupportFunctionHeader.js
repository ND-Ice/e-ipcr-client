import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

import { AddSupportFunction, TemplateIcon } from "..";

export default function SupportFunctionHeader({ template }) {
  const [showAddSupportFunction, setShowAddSupportFunction] = useState(false);
  return (
    <>
      <tr>
        <td colSpan={8} className="text-white bg-warning">
          <div className="d-flex align-items-center">
            Support Functions - 10%
            {template?.supportFunctionsMeasure > 0 && (
              <TemplateIcon
                className="ms-3"
                icon={FiPlus}
                color="#ffffff"
                bg="#0891b2"
                onClick={() => setShowAddSupportFunction(true)}
              />
            )}
          </div>
        </td>
      </tr>
      <Modal
        show={showAddSupportFunction}
        onHide={() => setShowAddSupportFunction(false)}
      >
        <AddSupportFunction
          id={template?._id}
          supportFunctions={template?.supportFunctions}
          open={setShowAddSupportFunction}
        />
      </Modal>
    </>
  );
}
