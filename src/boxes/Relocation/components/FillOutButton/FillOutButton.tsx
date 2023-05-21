import React, { useState } from 'react';
import { ReactComponent as FillOutIcon } from 'images/fill-out-icon.svg';
import styles from './FillOutButton.module.scss';
import { Modal } from 'react-bootstrap';
import { IFillOutButton } from '../../types';



const FillOutButton: React.FC<IFillOutButton> = ({
  windowWidth = 'lg',
  fileURL = 'https://www.musala.com',
}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className={styles.fillOutButton} onClick={openModal}>
        <span>
          <FillOutIcon />
          Fill out
        </span>
      </div>
      <Modal show={showModal} onHide={closeModal} centered size={windowWidth}>
        <Modal.Body>
          <iframe
            height={'1000px'}
            title="fileOpener"
            src={fileURL}
            width="100%"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FillOutButton;
