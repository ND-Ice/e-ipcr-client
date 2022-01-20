import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

import { AddCoreFunction, TemplateIcon } from "..";

export default function CoreFunctionHeader({ template }) {
  const [showAddCoreFunction, setShowAddCoreFunction] = useState(false);
  return (
    <>
      <tr className="text-uppercase fw-bold">
        <td colSpan={3} className=" text-white bg-warning">
          <div className="d-flex align-items-center">
            Core Functions - 90%
            {template?.coreFunctionsMeasure > 0 && (
              <TemplateIcon
                className="ms-3"
                icon={FiPlus}
                color="#ffffff"
                bg="#0891b2"
                onClick={() => setShowAddCoreFunction(true)}
              />
            )}
          </div>
        </td>
        <td className="text-center text-white bg-warning">Quality</td>
        <td className="text-center text-white bg-warning">Timeliness</td>
        <td className="text-center text-white bg-warning">Efficiency</td>
        <td className="text-center text-white bg-warning">Average</td>
        <td className="text-center text-white bg-warning">Remarks</td>
      </tr>

      <Modal
        centered
        show={showAddCoreFunction}
        onHide={() => setShowAddCoreFunction(false)}
      >
        <AddCoreFunction id={template?._id} open={setShowAddCoreFunction} />
      </Modal>
    </>
  );
}
