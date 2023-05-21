import React from 'react';
import { Figure } from 'react-bootstrap';

import { IProgressBars } from '../../boxes/Relocation/types';
import { IProgressBar } from '../../boxes/AppJourney/types';

import styles from './ProgressMobile.module.scss';
import './ProgressMobile.scss';

const ProgressMobile = ({
  activeStep,
  userSteps,
}: IProgressBars | IProgressBar) => {
  return (
    <>
      <h4 className={`d-md-none ${styles.mobileProgressTitle}`}>
        Application progress
      </h4>
      {userSteps
        .filter(
          (someStep) =>
            activeStep[someStep?.type]?.status === 'PASSED' ||
            activeStep[someStep?.type]?.status === 'ACTIVE' ||
            activeStep[someStep?.type]?.status === 'FAILED',
        )
        .splice(-1)
        .map((someStep) => (
          <Figure
            className={`d-md-none ${
              activeStep[someStep?.type]?.status === 'PASSED' ||
              activeStep[someStep?.type]?.status === 'ACTIVE' ||
              activeStep[someStep?.type]?.status === 'FAILED'
                ? styles.mobileActive
                : styles.notActive
            }`}
            data-testid="progressBarMobile">
            <span
              className={`d-flex flex-direction-row 
              ${
                activeStep[someStep?.type]?.status === 'FAILED'
                  ? `failedStep`
                  : someStep?.type === 'DONE' &&
                    activeStep[someStep?.type]?.status === 'PASSED'
                  ? `passedStep_5`
                  : activeStep[someStep?.type]?.status === 'PASSED'
                  ? `passedStep_${Object.keys(activeStep).length}`
                  : activeStep[someStep?.type]?.status === 'ACTIVE'
                  ? `activeStep_${Object.keys(activeStep).length}`
                  : styles.hide
              }
              `}>
              <p className={styles.left}>
                0{Object.keys(activeStep).length}/05
              </p>
            </span>
            <span className="text-start my-auto px-2">
              <p className={`py-0 my-0 ${styles.current}`}>Current:</p>
              <h6 className={styles.currentName}>
                {someStep.name === 'Final Stage' &&
                activeStep[someStep?.type]?.status === 'FAILED'
                  ? 'Thank you for applying'
                  : someStep.name === 'Final Stage' &&
                    activeStep[someStep?.type]?.status === 'PASSED'
                  ? 'Welcome onboard'
                  : someStep.name}
              </h6>
            </span>
          </Figure>
        ))}
    </>
  );
};

export default ProgressMobile;
