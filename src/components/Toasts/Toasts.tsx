import React from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';

import { IToasts } from 'components/types';

import './Toasts.style.scss';

const Toasts = ({ errorMsg, show, handleClose }: IToasts) => {
  return (
    <ToastContainer position="middle-center" className="z-index-master">
      <Toast
        onClose={handleClose}
        show={show}
        delay={2000}
        className="z-index-master"
        id="toast">
        <Toast.Body id="body">
          {errorMsg}
          <br />
          <Button id="btn" onClick={handleClose}>
            Okay
          </Button>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Toasts;
