import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import { Progress, ProgressMobile } from 'components/index';
import { Table } from './components/Table/Table';
import TechEvaluation from './components/TechEvaluation/TechEvaluation';
import { Overlays, Toasts } from 'components';
import { LoaderWrapper, CustomPage } from 'components/index';
import TabModal from 'components/TabModal/TabModal';

import {
  IOneStage,
  IRequirement,
  IStep,
  ITable,
  MeetingType,
  StageType,
  StagesStatus,
} from './types';

import { ReactComponent as InfoIcon } from 'images/info-new.svg';
import { RootState } from 'store/store';
import { getAllStages, getStageDetails } from 'store/journey/actions';
import { getTechRequirements, skillMatrixInProgress } from 'store/tech/actions';

import { POSSIBLE_STEPS } from './constants';

import styles from './AppJourney.module.scss';
const HIDE_JOURNEY = process.env.REACT_APP_DISABLE_JOURNEY_PAGE;

const AppJourney = () => {
  const { stages, stagesStatus } = useSelector(
    (state: RootState) => state.journey,
  );
  const { techRequirements, techRequirementStatus } = useSelector(
    (state: RootState) => state.tech,
  );
  const [disclaimer, setDisclaimer] = useState('false');
  const [showModal, setShowModal] = useState('false');
  const dispatch = useDispatch();
  const STEPS: Array<IStep> = POSSIBLE_STEPS;
  const [detailKey, setDetailKey] = useState('');
  const [stage, setStage] = useState<IOneStage[]>([]);
  const [show, setShow] = useState(false);

  const handleClick = (e: ITable) => {
    setDetailKey(e.index);
    if (detailKey === e.index) {
      setDetailKey('');
    } else {
      dispatch(getStageDetails(e.step));
    }
  };

  useEffect(() => {
    setStage([
      ...Object.entries(stages).map(([key, value]) => ({
        status:
          value.status === 'PASSED'
            ? 'Completed'
            : (value.status as StagesStatus),
        submittedAt: value?.dateTime || '',
        type: value.type,
        meetingDetails: value?.meetingDetails && {
          ...value.meetingDetails,
          type: value.meetingDetails.type as MeetingType,
        },
        code: value.type as StageType,
      })),
    ]);
  }, [stages]);

  useEffect(() => {
    dispatch(getAllStages());
    dispatch(getTechRequirements());
    dispatch(skillMatrixInProgress());
  }, []);

  useEffect(() => {
    if (stagesStatus === 'success') {
      localStorage.setItem(
        'disclaimer',
        String(stages && !('STARTED' in stages)),
      );
    }
    if (
      stagesStatus === 'success' &&
      techRequirements.length !== 0 &&
      !localStorage.getItem('tab')
    ) {
      localStorage.setItem(
        'tab',
        String(
          stages &&
            'STARTED' in stages &&
            Object.keys(stages).length === 1 &&
            techRequirements.length !== 0,
        ),
      );
    }
  }, [stages, stagesStatus, techRequirements.length]);

  const delay = new Promise((res) => setTimeout(res, 1000));
  delay.then(() => {
    setShowModal(localStorage.getItem('tab') || 'false');
  });
  delay.then(() => {
    setDisclaimer(localStorage.getItem('disclaimer') || 'false');
  });
  const handleCloseModal = () => {
    setShowModal('false');
    localStorage.setItem('tab', 'false');
  };

  return stagesStatus === 'loading' &&
    techRequirementStatus === 'loading' &&
    stages ? (
    <LoaderWrapper loading={true} />
  ) : (
    <>
      {disclaimer === 'true' &&
        HIDE_JOURNEY === 'false' &&
        stagesStatus === 'success' && (
          <div className={styles.disclaimerContainer}>
            <p className={styles.disclaimerBody}>
              Some steps of your Journey are greyed out because they have been
              completed before the Journey feature was introduced.
            </p>
          </div>
        )}
      <Container className={` h-auto ${styles.journey}`}>
        <Toasts
          errorMsg={
            'You have already started a test. Please, submit it to start another one.'
          }
          show={show}
          handleClose={() => setShow(false)}
        />
        <Progress activeStep={stages} userSteps={STEPS} />
        <ProgressMobile activeStep={stages} userSteps={STEPS} />
        {stages['STARTED']?.status === 'PASSED' &&
        Object.keys(stages).length === 1 ? (
          <>
            {showModal === 'true' ? (
              <TabModal
                show={showModal === 'true'}
                title={'Tech Evaluations unlocked!'}
                errorMsg={
                  'Please note that in order to move forward with your interview process you must submit all tech evaluations.'
                }
                handleClose={handleCloseModal}
              />
            ) : null}
            <CustomPage newStages={stages} />
          </>
        ) : stages['DONE']?.status === 'PASSED' ||
          stages['DONE']?.status === 'FAILED' ? (
          <CustomPage newStages={stages} />
        ) : (
          <>
            <h4 className={styles.title}>
              Tech Evaluations{' '}
              {techRequirements.length !== 0 &&
              techRequirements.filter(
                (requirement: IRequirement) =>
                  requirement.status === 'NOT_STARTED' ||
                  requirement.status === 'IN_PROGRESS',
              ).length !== 0 ? (
                <Overlays
                  text={
                    'In order to move forward in your interview, you must complete all assigned Tech Evaluations.'
                  }>
                  <InfoIcon fill="red" />
                </Overlays>
              ) : null}{' '}
              <span>
                (
                {
                  techRequirements?.filter(
                    (requirement) => requirement.status !== 'SUBMITTED',
                  ).length
                }
                )
              </span>
            </h4>
            <TechEvaluation setShow={setShow} />
            <div className={styles.middleLine}></div>
            <h4 className={styles.titlePassed} data-testid="activeStep">
              Active
            </h4>
            {stage?.filter((task) => task.status === 'ACTIVE').length === 0 ? (
              <p>
                We are currently reviewing your application, thank you for your
                patience!
              </p>
            ) : null}
            {stage
              ?.filter((task) => task.status === 'ACTIVE')
              .map((tasks, index) => (
                <>
                  <Table
                    status={tasks.status}
                    startDate={tasks.dateTime || tasks.submittedAt}
                    applicationStep={`${tasks.type}-${tasks.code}`}
                    step={`${tasks.type}`}
                    detailKey={detailKey}
                    handleClick={handleClick}
                    meeting={tasks?.meetingDetails?.url}
                    meetingType={tasks?.meetingDetails?.type}
                    officeLocation={tasks?.meetingDetails?.officeLocation}
                    index={'active_' + index}
                  />
                </>
              ))}
            {stage?.filter((task) => task?.status === 'Completed').length !==
              0 &&
            stage?.filter((task) => task?.status === 'Completed').length !==
              1 ? (
              <>
                <div className={styles.middleLine}></div>
                <h4 className={styles.titlePassed} data-testid="completedStep">
                  Completed
                </h4>
              </>
            ) : null}
            {stage
              ?.filter(
                (task) =>
                  task.status === 'Completed' &&
                  task.type !== 'STARTED' &&
                  task.type !== 'DONE',
              )
              .sort(
                (a, b) =>
                  new Date(b.submittedAt).getTime() -
                  new Date(a.submittedAt).getTime(),
              )
              .map((tasks, index) => (
                <>
                  <Table
                    status={tasks.status}
                    startDate={tasks.dateTime || tasks.submittedAt}
                    applicationStep={`${tasks.type}-${tasks?.code}`}
                    step={`${tasks.type}`}
                    detailKey={detailKey}
                    handleClick={handleClick}
                    meeting={tasks?.meetingDetails?.url}
                    meetingType={tasks?.meetingDetails?.type}
                    officeLocation={tasks?.meetingDetails?.officeLocation}
                    index={'passed_' + index}
                  />
                </>
              ))}
          </>
        )}
      </Container>
    </>
  );
};

export default AppJourney;
