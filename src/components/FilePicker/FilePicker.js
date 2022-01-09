import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

import Confirmation from "../templates/Confirmation";
import FileInput from "./FileInput";
import SelectedFile from "./SelectedFile";

export default function FilePicker({ id }) {
  const [selected, setSelected] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAdd = (e) => setSelected([...selected, e.target.files[0]]);
  const handleDelete = (name) =>
    setSelected(selected.filter((file) => file.name !== name));

  return (
    <Container>
      <FileInput onChange={handleAdd} />
      {selected?.map((selectedFile) => (
        <SelectedFile
          key={selectedFile?.lastModified}
          info={selectedFile}
          onDelete={handleDelete}
        />
      ))}

      <Button className="mt-4" onClick={() => setShowConfirmation(true)}>
        Submit
      </Button>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Confirmation files={selected} id={id} />
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  margin: 1rem 0;
`;
