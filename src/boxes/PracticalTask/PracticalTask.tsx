import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { DateTime } from 'luxon';

import PracticalTaskTimer from './components/Timer/Timer';
import SubmitPracticalTask from './components/SubmitTestModal/SubmitPracticalModal';
import Language from './components/Language/Language';

import { InfoCard } from './components/InfoCard/InfoCard';
import { LoaderWrapper, Overlays } from 'components';

import { useDispatch, useSelector } from 'react-redux';
import { getPracticalTask, startPracticalTask } from 'store/practical/actions';
import { getTechRequirements } from 'store/tech/actions';
import { RootState } from 'store/store';
import {
  inProgressTechSelector,
  notStartedTechSelector,
} from 'store/tech/selectors';

import { ReactComponent as NumberListIcon } from 'images/copy.svg';

import { IRequirement } from 'shared/types';

import styles from './PracticalTask.module.scss';

const HIDE_PRACTICAL = process.env.REACT_APP_DISABLE_PRACTICAL_TASK;

const PracticalTask = () => {
  const { techRequirements, techRequirementStatus } = useSelector(
    (state: RootState) => state.tech,
  );
  const { practicalTaskInfo, practicalTaskStatus } = useSelector(
    (state: RootState) => state.practical,
  );
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [code, setCode] = useState('');
  const [copyText, setCopyText] = useState(false);
  const [language, setLanguage] = useState('');
  const inProgressPractical = useSelector(inProgressTechSelector);
  const notStartedPractical = useSelector(notStartedTechSelector);
  const handleStart = () => {
    !showMessage ? setShowMessage(true) : setShowMessage(false);
    dispatch(startPracticalTask({ type: code, language: language }));
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(practicalTaskInfo?.url);
      setCopyText(true);
    } catch (err) {
      setCopyText(false);
    }
  };

  const handleSubmit = () => {
    setShow(true);
  };

  useEffect(() => {
    if (inProgressPractical) {
      setShowMessage(true);
      setNewDate(inProgressPractical.requestedAt);
    } else if (notStartedPractical) {
      setShowMessage(false);
    }
  }, [techRequirements]);

  useEffect(() => {
    if (techRequirements.length === 0) {
      dispatch(getTechRequirements());
      if (techRequirementStatus === 'success') {
        setCode(
          techRequirements.find(
            (requirement: IRequirement) => requirement.type === 'PRACTICAL',
          ).code,
        );
      }
    } else if (techRequirements.length !== 0) {
      if (techRequirementStatus === 'success') {
        setCode(
          techRequirements.find(
            (requirement: IRequirement) => requirement.type === 'PRACTICAL',
          ).code,
        );
      }
    }
  }, [
    techRequirements.length,
    techRequirementStatus,
    techRequirements,
    dispatch,
  ]);

  useEffect(() => {
    if (code.length !== 0) {
      dispatch(getPracticalTask(code));
    }
  }, [code, dispatch]);

  return practicalTaskStatus === 'loading' ? (
    <LoaderWrapper loading={true} />
  ) : HIDE_PRACTICAL === 'false' ? (
    <Container fluid className={styles.practicalTask}>
      <h4 className={styles.title}>Practical Task</h4>
      <InfoCard />
      {!showMessage && practicalTaskStatus === 'failed' ? (
        <>
          <div className={styles.middleLine}></div>
          <Language language={language} setLanguage={setLanguage} />
          <Button
            className={styles.btnBack}
            disabled={language.length === 0}
            onClick={handleStart}
            data-testid="backButton">
            Let's Begin
          </Button>
        </>
      ) : null}
      {showMessage && practicalTaskStatus === 'success' ? (
        <>
          <div className={styles.linkContainer}>
            <p className={styles.link}>{practicalTaskInfo?.url}</p>
            <Overlays text={'Copy GitLab link'}>
              <Button className={styles.copyButton} onClick={handleCopyLink}>
                <NumberListIcon />
              </Button>
            </Overlays>
          </div>
          <Button onClick={handleSubmit} className={styles.submitButton}>
            Submit
          </Button>
          <SubmitPracticalTask
            show={show}
            handleClose={() => setShow(false)}
            code={code}
          />
          <div className={styles.timerContainer}>
            <PracticalTaskTimer
              firstDate={DateTime.fromISO(newDate, {
                locale: 'en-GB',
              }).toLocal()}
            />
          </div>
        </>
      ) : null}
    </Container>
  ) : (
    <Redirect to="/home" />
  );
};

export default PracticalTask;
