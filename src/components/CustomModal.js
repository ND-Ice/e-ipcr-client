import React from "react";
import { Modal } from "react-bootstrap";

export default function CustomModal(props) {
  const { heading, children, ...otherProps } = props;

  return (
    <Modal
      {...otherProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h5
          className="text-uppercase fw-bold m-0"
          id="contained-modal-title-vcenter"
        >
          {heading}
        </h5>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
