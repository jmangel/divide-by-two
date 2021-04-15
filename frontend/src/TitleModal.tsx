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
    <Modal isOpen={isOpen} toggle={toggle} zIndex={zIndex}
      backdropClassName="title-modal--backdrop"
      contentClassName="title-modal--content align-items-center"
      centered
    >
      <ModalBody>
        <Input
          className="text-center"
          placeholder="Song Title"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
        />
        <Button color="primary" className="w-100 mt-1" onClick={onConfirm}>Confirm</Button>
      </ModalBody>
    </Modal>
  );
}

export default TitleModal;
