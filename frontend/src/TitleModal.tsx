import React, { useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter } from "reactstrap";


const TitleModal: React.FC<{
  isOpen: boolean,
  toggle: () => void,
  onSet: (songTitle: string) => void,
}> = ({
  isOpen,
  toggle,
  onSet,
}) => {
  const [songTitle, setSongTitle] = useState('');

  const onConfirm = () => {
    onSet(songTitle);
    toggle();
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        <Input placeholder="Song Title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)}></Input>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onConfirm}>Confirm</Button>
      </ModalFooter>
    </Modal>
  );
}

export default TitleModal;
