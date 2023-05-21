import React from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';

import { IToasts } from 'components/types';

import './TabModal.style.scss';

const TabModal = ({ errorMsg, show, handleClose, title }: IToasts) => {
  return (
    <ToastContainer
      position="top-center"
      className="z-index-master"
      id="tabContainer">
      <Toast
        onClose={handleClose}
        show={show}
        className="z-index-master"
        delay={2000}
        id="tabModal">
        <div className="corner"></div>
        <Toast.Body id="body">
          <h6>{title}</h6>
          <p>{errorMsg}</p>
          <div>
            <Button className="closeButton" id="btn" onClick={handleClose}>
              Got it!
            </Button>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default TabModal;
