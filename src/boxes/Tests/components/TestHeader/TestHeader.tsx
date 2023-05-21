import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Container } from 'react-bootstrap';

import { Details } from 'components';
import Timer from '../Timer/Timer';
import SubmitTestModal from '../SubmitTestModal/SubmitTestModal';

import { RootState } from 'store/store';

import styles from './TestHeader.module.scss';

import InfoIcon from 'images/info.svg';

const TestHeader = () => {
  const { questions, currentAnswers, currentTest } = useSelector(
    (state: RootState) => state.tests,
  );
  const [show, setShow] = useState(false);
  const [showSubmitTestModal, setShowSubmitTestModal] = useState(false);
  const toggleSubmitTestModal = () => {
    setShowSubmitTestModal((prev) => !prev);
  };

  const handleOpenInstructions = () => {
    setShow(true);
  };

  const handleCloseInstructions = () => {
    setShow(false);
  };

  let detailsTips = [
    `The test lasts ${questions?.durationMinutes} minutes. The timer starts ticking when you click Let’s Begin.`,
    `The test consists of ${questions.questions?.length} questions. They are not arranged by complexity.`,
    `You can go back to the previous questions.`,
    `Please ensure you have a stable internet connection.`,
  ];

  return (
    <Container fluid className={styles.testHeader}>
      <Details
        show={show}
        handleClose={handleCloseInstructions}
        tips={detailsTips}
        testType={questions.title}
      />
      <SubmitTestModal
        show={showSubmitTestModal}
        handleClose={toggleSubmitTestModal}
      />
      <div className={styles.title}>
        <p className={styles.testCode}>
          Test Code : {decodeURIComponent(currentTest)}
        </p>
      </div>
      <div className={styles.otherInformation}>
        <img
          src={InfoIcon}
          alt="info"
          className={styles.infoIcon}
          onClick={handleOpenInstructions}
        />
        <span>
          <Timer />
        </span>
        <p className={styles.answers}>
          <p>Answered:</p>
          {currentAnswers?.length}/{questions?.questions?.length}
        </p>
        <Button
          data-testid="submitTestButton"
          className={styles.submitButton}
          onClick={toggleSubmitTestModal}>
          Submit Test
        </Button>
      </div>
    </Container>
  );
};

export default TestHeader;
