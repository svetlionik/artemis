import { useSelector } from 'react-redux';

import { RootState } from 'store/store';

import TimeIcon from 'images/time-1.svg';
import NumberListIcon from 'images/list-icon.svg';
import ToggleQuestionsIcon from 'images/back-to-question.svg';
import WarningIcon from 'images/warning-icon.svg';
import WifiIcon from 'images/wifi-icon.svg';

import styles from './InfoCard.module.scss';

export const InfoCard = () => {
  const { questions } = useSelector((state: RootState) => state.tests);

  return (
    <div className={styles.grid}>
      <span>
        <img src={TimeIcon} alt="time" />
        <p>
          The test lasts {questions?.durationMinutes} minutes. The timer starts
          ticking when you click Let’s Begin.
        </p>
      </span>
      <span>
        <img src={NumberListIcon} alt="number" />
        <p>
          The test consists of {questions.questions?.length} questions. They are
          not arranged by complexity.
        </p>
      </span>
      <span>
        <img src={ToggleQuestionsIcon} alt="toggle" />
        <p>You can go back to the previous questions.</p>
      </span>
      <span>
        <img src={WifiIcon} alt="wi-fi" />
        <p>
          Please make sure you are not interrupted and have a stable Internet
          connection during the test, as the timer cannot be paused once
          started.
        </p>
      </span>
    </div>
  );
};
