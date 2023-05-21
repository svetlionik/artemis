import { IModal } from 'boxes/Tests/interfaces';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectCurrentTestCode, submitTest } from 'store/tests/actions';
import { RootState } from 'store/store';

import styles from './SubmitTestModal.module.scss';
import './SubmitTestModal.scss';

import ArrowIcon from 'images/arrow-back.svg';

const SubmitTestModal = (props: IModal) => {
  const { questions, currentAnswers } = useSelector(
    (state: RootState) => state.tests,
  );
  const { show, handleClose } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleTestSubmit = async () => {
    const response: any = await dispatch(
      submitTest(questions.code.replace('#', '%23')),
    );
    if (!response.payload.status) {
      history.push('/tests/');
      return;
    }
    history.push('/tests/success', { from: 'questions' });
    await dispatch(selectCurrentTestCode(''));
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <div className={styles.submitTestContainer}>
        <div className={styles.modalHeader}>
          <p onClick={handleClose}>
            <img src={ArrowIcon} alt="" className={styles.arrowIcon} />
            Back
          </p>
        </div>
        <Modal.Title className={styles.title}>
          <p>Before you leave...</p>
        </Modal.Title>
        <Modal.Body className={styles.body}>
          <div>
            <p>
              {questions?.questions?.length === currentAnswers?.length ? (
                `You have answered all of your questions, are you ready to submit?`
              ) : `Looks like you have 
              ${questions?.questions?.length - currentAnswers?.length} unanswered
              questions in your ${questions?.title}.`}
            </p>

            {questions?.questions?.length !== currentAnswers?.length && (
            <div>
              <p>—</p>
              <p>Do you want to submit the test anyway?</p>
            </div>
            )}
          </div>
          <div className={styles.btns}>
            <Button className={styles.cancel} onClick={handleClose}>
              Cancel
            </Button>
            <Button className={styles.submit} onClick={handleTestSubmit}>
              Submit test
            </Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default SubmitTestModal;
