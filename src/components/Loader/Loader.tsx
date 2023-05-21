import React from 'react';
import { Spinner, ToastContainer } from 'react-bootstrap';

const Loader = () => {
  return (
    <ToastContainer position="middle-center">
      <Spinner
        animation="grow"
        role="status"
        className="justify-content-center text-center text-primary"
        data-testid="spinner"
      />
    </ToastContainer>
  );
};

export default Loader;
