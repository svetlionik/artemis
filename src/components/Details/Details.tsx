import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import { IModal } from 'components/types';

import styles from './Details.module.scss';

import ArrowIcon from 'images/arrow-back.svg';

const Details = ({ show, handleClose, tips, testType }: IModal) => {
  return (
    <Modal show={show} onHide={handleClose} className={styles.modal}>
      <div className={styles.modalHeader}>
        <p onClick={handleClose}>
          <img src={ArrowIcon} alt="" className={styles.arrowIcon} />
          Back
        </p>
      </div>
      <Modal.Title className={styles.title}>{testType}</Modal.Title>
      <Modal.Body className={styles.body}>
        <ul>
          {tips?.map((tip) => (
            <li className="my-4">{tip}</li>
          ))}
        </ul>
        <Button className={styles.btn} onClick={handleClose}>
          Okay
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default Details;
