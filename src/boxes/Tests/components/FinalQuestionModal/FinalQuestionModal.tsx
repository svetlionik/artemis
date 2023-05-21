import { Fragment } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { RootState } from 'store/store';
import { IModal } from 'boxes/Tests/interfaces';

import styles from './FinalQuestionModal.module.scss';
import './FinalQuestionModal.scss';

import ArrowIcon from 'images/arrow-back.svg';

const FinalQuestionModal = (props: IModal) => {
  const { show, handleClose } = props;
  const { questions, currentAnswers } = useSelector(
    (state: RootState) => state.tests,
  );

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className={styles.submitTestContainer}>
        <div className={styles.modalHeader}>
          <p onClick={handleClose}>
            <img src={ArrowIcon} alt="" className={styles.arrowIcon} />
            Back
          </p>
        </div>
        <Modal.Body className={styles.body}>
          {currentAnswers?.length == questions?.questions?.length ? (
            <Fragment>
              <p>
                {' '}
                Looks like you are done, you still have time to revisit some
                answers
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <p>
                You have answered {currentAnswers?.length} out of{' '}
                {questions?.questions?.length} questions, you still have{' '}
                {questions?.questions?.length - currentAnswers?.length} more
              </p>
            </Fragment>
          )}
          <div className={styles.btns}>
            <Button className={styles.submit} onClick={handleClose}>
              Okay
            </Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default FinalQuestionModal;
