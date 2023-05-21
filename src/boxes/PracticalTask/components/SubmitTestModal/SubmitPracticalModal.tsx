import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { submitPracticalTask } from 'store/practical/actions';

import { IModalProps } from 'boxes/PracticalTask/types';

import styles from './SubmitPracticalModal.module.scss';
import './SubmitPracticalModal.scss';

import ArrowIcon from 'images/arrow-back.svg';

const SubmitPracticalTask = (props: IModalProps) => {
  const { show, handleClose, code } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmitPractical = async () => {
    dispatch(submitPracticalTask(code));
    history.push('/practical/success', { from: '/practical' });
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
            <p>You are about to submit practical task. </p>
            <div>
              <p>—</p>
              <p>Do you want to submit the task anyway?</p>
            </div>
          </div>
          <div className={styles.btns}>
            <Button className={styles.cancel} onClick={handleClose}>
              Cancel
            </Button>
            <Button className={styles.submit} onClick={handleSubmitPractical}>
              Submit task
            </Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default SubmitPracticalTask;
