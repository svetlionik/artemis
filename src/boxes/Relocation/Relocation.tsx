import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import { Progress, ProgressMobile } from 'components/index';
import { Table } from './components/Table/Table';
import { LoaderWrapper, CustomPage } from 'components/index';

import { IOneRelocationStage, IRelocationMap, IStep, ITable } from './types';

import { RootState } from 'store/store';
import { getStageDetails } from 'store/journey/actions';

import { POSSIBLE_STEPS } from './constants';

import styles from './Relocation.module.scss';
import DATA from './data.json';

const HIDE_RELOCATION = process.env.REACT_APP_DISABLE_RELOCATION;

const Relocation = () => {
  const { stagesStatus } = useSelector((state: RootState) => state.journey);
  const stages: IRelocationMap = DATA;
  const dispatch = useDispatch();
  const STEPS: Array<IStep> = POSSIBLE_STEPS;
  const [detailKey, setDetailKey] = useState('');
  const [stage, setStage] = useState<IOneRelocationStage[]>([]);
  const [steps, setSteps] = useState({});
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
        status: value.status === 'PASSED' ? 'Completed' : value.status,
        submittedAt: value.createdAt,
        completedAt: value?.completedAt,
        type: value.relocationStep,
        code: value.relocationStep,
        description: value.description,
      })),
    ]);
    console.log(stage);
    setSteps(() => Object.assign(steps, stages));
  }, [stages, steps]);

  //   useEffect(() => {
  //     dispatch(getAllStages());
  //     dispatch(getTechRequirements());
  //     dispatch(skillMatrixInProgress());
  //   }, []);

  return HIDE_RELOCATION === 'true' ? (
    <Redirect to="/home" />
  ) : stagesStatus === 'loading' && stages ? (
    <LoaderWrapper loading={true} />
  ) : (
    <Container className={` h-auto ${styles.journey}`}>
      <Progress activeStep={stages} userSteps={STEPS} />
      <ProgressMobile activeStep={stages} userSteps={STEPS} />
      {stages['FINAL']?.status === 'PASSED' ||
      stages['FINAL']?.status === 'FAILED' ? (
        <CustomPage newStages={stages} />
      ) : (
        <>
          <div className="mx-4">
            <h4 className={styles.titlePassed} data-testid="activeStep">
              Active
            </h4>
            {!stage?.some((task) => task.status === 'ACTIVE') ? (
              <p>
                We are currently reviewing your application, thank you for your
                patience!
              </p>
            ) : (
              <p>
                {
                  POSSIBLE_STEPS.find(
                    (step) =>
                      step.type ===
                      stage.find((stage) => stage.status === 'ACTIVE')?.type,
                  )?.description
                }
              </p>
            )}
          </div>
          {stage
            ?.filter((task) => task.status === 'ACTIVE')
            .map((tasks, index) => (
              <>
                <Table
                  status={tasks.status}
                  startDate={tasks.submittedAt}
                  applicationStep={`${tasks.type}`}
                  step={`${tasks.type}`}
                  detailKey={detailKey}
                  handleClick={handleClick}
                  index={'active_' + index}
                />
              </>
            ))}
          {stage?.filter((task) => task?.status === 'Completed').length !==
          0 ? (
            <>
              <div className={styles.middleLine}></div>
              <h4 className={styles.titlePassed} data-testid="completedStep">
                Completed
              </h4>
            </>
          ) : null}
          {stage
            ?.filter(
              (task) => task.status === 'Completed' && task.type !== 'DONE',
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
                  startDate={tasks.submittedAt}
                  applicationStep={`${tasks.type}`}
                  completedDate={tasks.completedAt}
                  step={`${tasks.type}`}
                  detailKey={detailKey}
                  handleClick={handleClick}
                  index={'passed_' + index}
                />
              </>
            ))}
        </>
      )}
    </Container>
  );
};

export default Relocation;
