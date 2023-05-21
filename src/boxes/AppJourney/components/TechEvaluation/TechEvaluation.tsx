import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from 'store/store';
import {
  getAllTestsIds,
  selectCurrentTestCode,
  testStatus,
} from 'store/tests/actions';

import { IRequirement } from '../../types';

import { ReactComponent as ArrowIcon } from 'images/arrow-forward.svg';

import { Names } from 'shared/constants/enum';

import styles from './TechEvaluation.module.scss';

const HIDE_PRACTICAL = process.env.REACT_APP_DISABLE_PRACTICAL_TASK;

const TechEvaluation = ({ setShow }: { setShow: (arg: boolean) => void }) => {
  const { matrixInProgress, techRequirements } = useSelector(
    (state: RootState) => state.tech,
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [expand, setExpand] = useState(false);
  const toggleEvals = () => {
    !expand ? setExpand(true) : setExpand(false);
  };
  return techRequirements.length === 0 ? (
    <div className={styles.tech}>
      Tech Evaluations will be enabled soon and you will be notified via email.
    </div>
  ) : techRequirements.length !== 0 &&
    techRequirements.filter(
      (requirement: IRequirement) =>
        requirement.status === 'NOT_STARTED' ||
        requirement.status === 'IN_PROGRESS',
    ).length === 0 ? (
    <div className={styles.tech}>
      Thank you for completing your Tech Evaluations, please allow us some time
      to review them and we will get back to you!
    </div>
  ) : (
    <div className={styles.tech}>
      <div
        className={`${styles.techGrid} ${expand ? styles.expand : ''}`}
        data-testid="techBubbleContainer">
        {techRequirements
          ?.filter(
            (requirement: IRequirement) =>
              requirement.status !== 'SUBMITTED' &&
              (HIDE_PRACTICAL === 'true'
                ? requirement.type !== 'PRACTICAL'
                : requirement),
          )
          .map((requirement: IRequirement) => (
            <div
              data-testid="techBubble"
              onClick={() => {
                if (requirement.type === 'SKILLS') {
                  history.push('/skills');
                } else if (requirement.type === 'PRACTICAL') {
                  history.push('/practical');
                } else if (
                  techRequirements.find(
                    (newTest: IRequirement) =>
                      (newTest.type !== 'SKILLS' &&
                        newTest.status === 'IN_PROGRESS' &&
                        requirement.code !== newTest.code) ||
                      newTest.seconds < 0,
                  )
                ) {
                  setShow(true);
                } else {
                  dispatch(
                    selectCurrentTestCode(requirement.code.replace('#', '%23')),
                  );
                  dispatch(
                    getAllTestsIds(requirement.code.replace('#', '%23')),
                  );
                  dispatch(testStatus(requirement.code.replace('#', '%23')));
                  history.push('/tests/information', { from: '/home' });
                }
              }}
              className={`${styles.card}
                ${
                  requirement.status === 'NOT_STARTED'
                    ? styles.inactiveCard
                    : requirement.status === 'IN_PROGRESS'
                    ? styles.activeCard
                    : styles.passedCard
                }
                ${
                  requirement.type === 'SKILLS' && matrixInProgress
                    ? styles.activeCard
                    : ''
                }
              `}>
              <h5>
                {' '}
                {Object.entries(Names)
                  .filter(
                    ([key, value]) =>
                      key === `${requirement.type}-${requirement.code}`,
                  )
                  .map(([key, value]) => value)}
              </h5>
              {requirement.status === 'SUBMITTED' ? null : <ArrowIcon />}
            </div>
          ))}
      </div>
      {techRequirements?.filter(
        (requirement: IRequirement) => requirement.status !== 'SUBMITTED',
      ).length === 0 ? null : (
        <>
          <p className={styles.cardLength}>
            {!expand &&
            techRequirements?.filter(
              (requirement: IRequirement) => requirement.status !== 'SUBMITTED',
            ).length > 3
              ? 3
              : techRequirements?.filter(
                  (requirement: IRequirement) =>
                    requirement.status !== 'SUBMITTED',
                ).length}{' '}
            of{' '}
            {
              techRequirements?.filter(
                (requirement: IRequirement) =>
                  requirement.status !== 'SUBMITTED',
              ).length
            }
          </p>
          {techRequirements?.filter(
            (requirement: IRequirement) => requirement.status !== 'SUBMITTED',
          ).length > 3 ? (
            <p
              className={styles.more}
              onClick={toggleEvals}
              data-testid="expandButton">
              {!expand ? 'View more' : 'View less'}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
};

export default TechEvaluation;
