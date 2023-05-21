import React from 'react';
import { Container, Figure } from 'react-bootstrap';

import { IProgressBars } from 'boxes/Relocation/types';
import { IProgressBar } from 'boxes/AppJourney/types';

import CheckIcon from 'images/check-icon.svg';

import styles from './Progress.module.scss';

const Progress = ({ activeStep, userSteps }: IProgressBars | IProgressBar) => {
  return (
    <Container className={`${styles.progressLine}`}>
      {userSteps.map((someStep) => (
        <Figure
          className={`${
            (someStep?.type === 'DONE' || someStep?.type === 'FINAL') &&
            activeStep[someStep?.type]?.status === 'PASSED'
              ? styles.employed
              : activeStep[someStep?.type]?.status === 'PASSED'
              ? styles.passed
              : activeStep[someStep?.type]?.status === 'ACTIVE'
              ? styles.active
              : activeStep[someStep?.type]?.status === 'FAILED'
              ? styles.terminated
              : activeStep[someStep?.type]?.status === 'NOT_STARTED'
              ? styles.notActive
              : styles.notActive
          }
          d-none d-sm-block`}
          data-testid="progressBar">
          <Figure.Caption>
            <h6 data-testid="progressBarName">
              {activeStep[someStep?.type]?.status === 'PASSED' ? (
                <img src={CheckIcon} alt="" />
              ) : null}
              {someStep.name === 'Final Stage' &&
              activeStep[someStep?.type]?.status === 'FAILED'
                ? 'Thank you for applying'
                : someStep.name === 'Final Stage' &&
                  activeStep[someStep?.type]?.status === 'PASSED'
                ? 'Welcome onboard'
                : someStep.name}
            </h6>
          </Figure.Caption>
          <p data-testid="progressBarSection"></p>
        </Figure>
      ))}
    </Container>
  );
};

export default Progress;
