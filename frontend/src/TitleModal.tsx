import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter } from "reactstrap";


const TitleModal: React.FC<{
  isOpen: boolean,
  toggle: () => void,
  onSet: (songTitle: string) => void,
  startingValue?: string,
  zIndex?: number,
}> = ({
  isOpen,
  toggle,
  onSet,
  startingValue,
  zIndex,
}) => {
  const [songTitle, setSongTitle] = useState(startingValue || '');

  useEffect(() => {
    if (startingValue) setSongTitle(startingValue);
  }, [startingValue, isOpen])

  const onConfirm = () => {
    onSet(songTitle);
    toggle();
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} zIndex={zIndex}>
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
