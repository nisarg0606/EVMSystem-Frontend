import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

const PopupModal = ({ isOpen, toggle, message }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Popup Modal</ModalHeader>
      <ModalBody>
        <p>{message}</p>
        <Button color="primary" onClick={toggle}>Close</Button>
      </ModalBody>
    </Modal>
  );
};

export default PopupModal;
