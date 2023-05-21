import React from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';

import { IMarksModal, IMarks } from 'components/types';

import styles from './Marks.module.scss';

const Marks = ({ show, handleClose, evaluationMarks }: IMarksModal) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className={styles.marks}>
        <Modal.Header className={styles.header}>
          <h4>Evaluation marks</h4>
        </Modal.Header>
        <Modal.Body className={styles.body}>
          <Container className="px-0">
            {evaluationMarks?.map(({ id, name, msg, title }: IMarks) => (
              <Row className="g-2" key={parseFloat(id)}>
                <Col md={{ span: 1 }}>
                  <p className={styles.circle}>{name}</p>
                </Col>
                <Col md={{ span: 11 }}>
                  <Row className={styles.rowTitle}>{title}</Row>
                  <Row className={styles.rowMessage}>{msg}</Row>
                </Col>
              </Row>
            ))}
            <Row>
              <Button onClick={handleClose} className={styles.okayBtn}>
                Okay
              </Button>
            </Row>
          </Container>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default Marks;
