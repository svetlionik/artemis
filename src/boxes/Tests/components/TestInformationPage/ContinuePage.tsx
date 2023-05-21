import { Details } from 'components';
import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/store';
import { getAllQuestionsInfo } from 'store/tests/actions';
import Timer from '../Timer/Timer';

import styles from './TestInformationPage.module.scss';

const ContinuePage = ({ handleStartForm }: any) => {
  const { questions, currentTest, currentAnswers } = useSelector(
    (state: RootState) => state.tests,
  );
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => {
    show ? setShow(false) : setShow(true);
  };

  let detailsTips = [
    `The test lasts ${questions?.durationMinutes} minutes. The timer starts ticking when you click Let’s Begin.`,
    `The test consists of ${questions.questions?.length} questions. They are not arranged by complexity.`,
    `You can go back to the previous questions.`,
    `Please ensure you have a stable internet connection.`,
  ];

  useEffect(() => {
    dispatch(getAllQuestionsInfo(currentTest));
  }, []);

  return (
    <Container className={`${styles.info}`}>
      <Details
        show={show}
        handleClose={toggleModal}
        tips={detailsTips}
        testType={questions?.title}
      />
      <div className={styles.information}>
        <h1>{questions.title}</h1>
        <p>You can continue the test by pressing the button below.</p>
        <h6>
          Please, be aware that when you left the test the timer did not stop!
        </h6>
        <h6>
          If you don't continue your test, when it is up it will be submitted
          automatically.
        </h6>
      </div>
      <Timer />
      <h6 className={styles.timerText}>Time left</h6>
      <div className={styles.answerContainer}>
        <p className={styles.answers}>
          <p>Answered:</p>
          {currentAnswers?.length}/{questions?.questions?.length}
        </p>
      </div>
      <div className={styles.beginButtonContainer}>
        <p>Ready?</p>
        <Button
          className={styles.beginBtn}
          onClick={handleStartForm}
          data-testid="beginButton">
          Let's Continue
        </Button>
        <Button
          className={styles.marksBtn}
          onClick={toggleModal}
          data-testid="instructionsButton">
          Instructions
        </Button>
      </div>
    </Container>
  );
};

export default ContinuePage;
