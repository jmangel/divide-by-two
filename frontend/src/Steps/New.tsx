import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { Button, Col, FormText, Input, Modal, ModalBody, ModalFooter, Row } from "reactstrap";
import SaxophonistLogo from '../SaxophonistLogo';
import ContinueButton from './ContinueButton';


const New: React.FC<{
  allowContinue: boolean,
  handleFiles: (event: ChangeEvent<HTMLInputElement>) => void,
  startNewSong: (songTitle?: string) => void,
  navigateToNextStep: () => void,
}> = ({
  allowContinue,
  handleFiles,
  startNewSong,
  navigateToNextStep,
}) => {
  const [enteringTitle, setEnteringTitle] = useState(false);
  const [songTitle, setSongTitle] = useState('');
  const toggleTitleModal = () => setEnteringTitle(!enteringTitle);

  return (
    <Col className="flex-column d-flex">
      <Row className="justify-content-center flex-grow-1 align-items-center">
        <SaxophonistLogo />
      </Row>
      {allowContinue && (<ContinueButton navigateToNextStep={navigateToNextStep} />)}
      <Row className='py-2'>
        <Button
          color="light"
          className="w-75 ml-auto mr-auto"
          onClick={() => setEnteringTitle(true)}
        >
          New
        </Button>
      </Row>
      <Modal isOpen={enteringTitle} toggle={toggleTitleModal}>
        <ModalBody>
          <Input placeholder="Song Title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)}></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => startNewSong(songTitle)}>Confirm</Button>
        </ModalFooter>
      </Modal>
      <Row className='py-2'>
        <Input
          type="file"
          name="irealImportFile"
          id="irealImportFile"
          onChange={handleFiles}
          className="d-none"
        />
        <Button
          color="primary"
          className="w-75 ml-auto mr-auto"
          onClick={() => {
            const fileInput = document.getElementById('irealImportFile');
            fileInput && fileInput.click();
          }}
        >
          Import
        </Button>
        <FormText color="muted" className="py-1">
          Export the song from iReal Pro as HTML and upload here.
        </FormText>
      </Row>
    </Col>
  );
}

export default New;
