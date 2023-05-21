import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TestCard from '../TestCard/TestCard';
import { Toasts } from 'components';
import { LoaderWrapper } from 'components/index';

import { IRequirement } from 'boxes/AppJourney/types';
import { TestType } from '../../interfaces';
import {
  getAllTestsIds,
  getTestsRequirements,
  selectCurrentTestCode,
  testStatus,
} from 'store/tests/actions';
import { userInformation } from 'store/auth/selector';
import { RootState } from 'store/store';

import styles from './TestList.module.scss';

const HIDE_JOURNEY = process.env.REACT_APP_DISABLE_JOURNEY_PAGE;

const TestList = () => {
  const history = useHistory();
  const user = useSelector(userInformation);
  const [show, setShow] = useState(false);
  const { requirements } = useSelector((state: RootState) => state.tests);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestsRequirements());
  }, [dispatch]);

  return user.hasTestRequirement && HIDE_JOURNEY === 'true' ? (
    <LoaderWrapper loading={requirements.length === 0}>
      <Container className={styles.testListContainer}>
        <Toasts
          errorMsg={
            'You have already started a test. Please, submit it to start another one.'
          }
          show={show}
          handleClose={() => setShow(false)}
        />
        <div className={styles.testInformation}>
          <h1>Skill Tests</h1>
          <p>
            In order to continue your application process with us, please
            complete all of the following tests.
          </p>
        </div>
        <div className={styles.testsContainer}>
          {requirements.map((test: IRequirement, index: number) => (
            <TestCard
              testId={`testCard${index}`}
              code={test.code.replace('#', '%23')}
              title={`${test.type}-${test.code}`}
              status={test.status}
              durationMinutes={test.durationMinutes}
              questions={['1,2,3']}
              requestedAt={new Date(test.requestedAt).toLocaleDateString(
                'en-US',
              )}
              submittedAt={
                test.submittedAt
                  ? new Date(test.submittedAt).toLocaleDateString('en-US')
                  : '—'
              }
              type={TestType.COGNITIVE}
              onClick={() => {
                if (
                  requirements.find(
                    (newTest: IRequirement) =>
                      (newTest.status === 'IN_PROGRESS' &&
                        test.code !== newTest.code) ||
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
                  history.push('/tests/information', { from: '/tests' });
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

export default TestList;
