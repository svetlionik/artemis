import { TestDTO } from '../../interfaces';
import { useSelector } from 'react-redux';

import { RootState } from 'store/store';
import { Names } from 'shared/constants/enum';

import styles from './TestCard.module.scss';

import { ReactComponent as ArrowIcon } from 'images/arrow-forward.svg';

const TestCard = (props: TestDTO) => {
  const {
    title,
    code,
    testId,
    requestedAt,
    submittedAt,
    durationMinutes,
    onClick,
    status,
  } = props;
  const { matrixInProgress } = useSelector((state: RootState) => state.tech);
  let isSubmitted = status == 'SUBMITTED' || status == 'CANCELED';
  let skillMatrixProgress =
    status === 'NOT_STARTED' &&
    matrixInProgress &&
    title === 'SKILLS-undefined';

  return (
    <div
      data-testid={testId}
      onClick={
        !isSubmitted || (title === 'SKILLS-undefined' && isSubmitted)
          ? onClick
          : undefined
      }
      className={`${styles.testCardContainer} ${
        skillMatrixProgress
          ? styles.inProgressBorder
          : isSubmitted
          ? styles.submittedCard
          : status === 'NOT_STARTED'
          ? ''
          : status === 'PRACTICAL'
          ? styles.practicalBorder
          : styles.inProgressBorder
      }`}>
      <div
        className={`${styles.header} ${
          skillMatrixProgress
            ? styles.inProgressHeader
            : isSubmitted
            ? styles.submmitedHeader
            : status === 'NOT_STARTED'
            ? styles.notStartedHeader
            : status === 'PRACTICAL'
            ? styles.practicalHeader
            : styles.inProgressHeader
        }`}>
        <h6>
          {' '}
          {Object.entries(Names)
            .filter(([key, value]) => key === title)
            .map(([key, value]) => value)}
        </h6>
        {!isSubmitted && (
          <span data-testid="testStatus">
            <h6>
              {skillMatrixProgress
                ? 'Continue'
                : status === 'NOT_STARTED'
                ? 'Begin'
                : 'Continue'}
            </h6>
            <ArrowIcon />
          </span>
        )}
        {isSubmitted && title === 'SKILLS-undefined' && (
          <span data-testid="testStatus">
            <h6>{status === 'SUBMITTED' ? 'View' : null}</h6>
            <ArrowIcon />
          </span>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.testAttributeContainer}>
          <p>Status:</p>
          <p className={`${styles.status} ${styles.bold}`}>
            {status === 'IN_PROGRESS' || skillMatrixProgress
              ? 'In Progress'
              : status === 'NOT_STARTED'
              ? 'Not Started'
              : status === 'CONTINUE'
              ? 'Continue'
              : 'Submitted'}
          </p>
        </div>
        <div className={styles.testAttributeContainer}>
          <p>Est. time</p>
          <p className={styles.status}>
            {durationMinutes === 10
              ? '10 days'
              : durationMinutes !== 0
              ? durationMinutes + ' mins'
              : '2 days'}
          </p>
        </div>
        <div className={styles.testAttributeContainer}>
          <p>Requested:</p>
          <p className={styles.status}>
            {requestedAt !== '0'
              ? new Date(requestedAt)?.toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              : '-'}
          </p>
        </div>
        <div className={styles.testAttributeContainer}>
          <p>Submitted:</p>
          <p className={styles.status}>
            {submittedAt !== '0' && status === 'SUBMITTED'
              ? new Date(submittedAt)?.toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              : '—'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
