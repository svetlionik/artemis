import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Modal } from 'react-bootstrap';

import { IPromptModal } from 'components/types';

import styles from './PromptModal.module.scss';

import ArrowIcon from 'images/arrow-back.svg';

export const PromptModal = (props: IPromptModal) => {
  const { when, onOK, onCancel, title, okText, cancelText } = props;

  const history = useHistory();

  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (when) {
      history.block((prompt) => {
        if (
          prompt.pathname !== '/tests/success' &&
          prompt.pathname !== '/tests/timeup' &&
          prompt.pathname !== '/tests/'
        ) {
          setCurrentPath(prompt.pathname);
          setShowPrompt(true);
          return 'true';
        }
      });
    } else {
      history.block(() => {});
    }

    return () => {
      history.block(() => {});
    };
  }, [history, when]);

  const handleOK = useCallback(async () => {
    if (onOK) {
      const canRoute = await Promise.resolve(onOK());
      if (canRoute) {
        history.block(() => {});
        history.push(currentPath);
      }
    }
  }, [currentPath, history, onOK]);

  const handleCancel = useCallback(async () => {
    if (onCancel) {
      const canRoute = await Promise.resolve(onCancel());
      if (canRoute) {
        history.block(() => {});
        history.push(currentPath);
      }
    }
    setShowPrompt(false);
  }, [currentPath, history, onCancel]);

  return showPrompt ? (
    <Modal show={showPrompt} title={title} centered className={styles.prompt}>
      <div className={styles.modalHeader}>
        <p onClick={handleCancel}>
          <img src={ArrowIcon} alt="" className={styles.arrowIcon} />
          Back
        </p>
      </div>
      <p>Before you leave...</p>
      <Modal.Body className={styles.body}>
        <p>
          You should submit the Test before leaving the Page, otherwise the test
          will submit automatically after the time is up
        </p>
      </Modal.Body>
      <div className={styles.footer}>
        <Button className={styles.stayBtn} onClick={handleCancel}>
          Go back
        </Button>
        <Button className={styles.leaveBtn} onClick={handleOK}>
          Leave
        </Button>
      </div>
    </Modal>
  ) : null;
};

export default PromptModal;
