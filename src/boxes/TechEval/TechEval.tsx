import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Toasts } from 'components';
import { LoaderWrapper } from 'components/index';
import TestCard from 'boxes/Tests/components/TestCard/TestCard';

import { TestType } from 'boxes/Tests/interfaces';

import {
  getAllTestsIds,
  selectCurrentTestCode,
  testStatus,
} from 'store/tests/actions';
import { userInformation } from 'store/auth/selector';
import { RootState } from 'store/store';
import { getTechRequirements, skillMatrixInProgress } from 'store/tech/actions';

import { IRequirement } from 'boxes/AppJourney/types';

import styles from './TechEval.module.scss';

const HIDE_JOURNEY = process.env.REACT_APP_DISABLE_JOURNEY_PAGE;
const HIDE_PRACTICAL = process.env.REACT_APP_DISABLE_PRACTICAL_TASK;

const TechEval = () => {
  const history = useHistory();
  const user = useSelector(userInformation);
  const [show, setShow] = useState(false);
  const { techRequirements } = useSelector((state: RootState) => state.tech);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTechRequirements());
    dispatch(skillMatrixInProgress());
  }, [dispatch]);

  return (user.hasTestRequirement || user.hasSkillRequirement) &&
    HIDE_JOURNEY === 'false' ? (
    <LoaderWrapper loading={techRequirements.length === 0}>
      <Container className={styles.testListContainer}>
        <Toasts
          errorMsg={
            'You have already started a test. Please, submit it to start another one.'
          }
          show={show}
          handleClose={() => setShow(false)}
        />
        <div className={styles.testInformation}>
          <h1>Tech Evaluations</h1>
          <p>
            In order to move forward in your interview, you must complete all
            assigned Tech Evaluations.
          </p>
        </div>
        <div className={styles.testsContainer} data-testid="techEvalContainer">
          {techRequirements
            .filter((test: IRequirement) =>
              HIDE_PRACTICAL === 'true' ? test.type !== 'PRACTICAL' : test,
            )
            .map((test: IRequirement, index: number) => (
              <TestCard
                testId={`testCard${index}`}
                code={test?.code?.replace('#', '%23')}
                title={`${test.type}-${test.code}`}
                status={test.status}
                durationMinutes={
                  test.type === 'SKILLS'
                    ? 15
                    : test.type === 'PRACTICAL'
                    ? 10
                    : test.durationMinutes
                }
                questions={['1,2,3']}
                requestedAt={
                  test?.requestedAt
                    ? new Date(test.requestedAt).toLocaleDateString('en-US')
                    : '—'
                }
                submittedAt={
                  test?.submittedAt
                    ? new Date(test.submittedAt).toLocaleDateString('en-US')
                    : '—'
                }
                type={TestType.COGNITIVE}
                onClick={() => {
                  if (test.type === 'SKILLS') {
                    history.push('/skills');
                  } else if (test.type === 'PRACTICAL') {
                    history.push('/practical', { from: '/tech' });
                  } else if (
                    techRequirements.find(
                      (newTest: IRequirement) =>
                        (newTest.status === 'IN_PROGRESS' &&
                          test.code !== newTest.code &&
                          newTest.type !== 'PRACTICAL') ||
                        newTest.seconds < 0,
                    )
                  ) {
                    setShow(true);
                  } else {
                    dispatch(
                      selectCurrentTestCode(test.code.replace('#', '%23')),
                    );
                    dispatch(getAllTestsIds(test.code.replace('#', '%23')));
                    dispatch(testStatus(test.code.replace('#', '%23')));
                    history.push('/tests/information', { from: '/tech' });
                  }
                }}
              />
            ))}
        </div>
      </Container>
    </LoaderWrapper>
  ) : (
    <Redirect to="/home" />
  );
};

export default TechEval;
