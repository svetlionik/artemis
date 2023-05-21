import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TopTooltip from 'components/TopTooltip/TopTooltip';

import { RootState } from 'store/store';

import styles from './Timer.module.scss';

import TimeIcon from 'images/time.svg';

import { TIMER_DANGER, TIMER_WARNING } from 'shared/constants/constants';

const Timer = () => {
  const { questions, timer } = useSelector((state: RootState) => state.tests);
  const history = useHistory();
  const [minutes, setMinutes] = useState(questions.durationMinutes - 1);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      if (minutes === 0 && seconds === 0) {
        setMinutes(0);
        setSeconds(0);
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  useEffect(() => {
    let newMinutes = Math.floor(timer / 60);
    let newSeconds = timer % 60;
    if (!isNaN(newMinutes) || !isNaN(newSeconds)) {
      setMinutes(newMinutes);
      setSeconds(newSeconds);
    }
  }, [timer]);

  useEffect(() => {
    if (minutes <= -1 && seconds <= 0) {
      history.push('/tests/timeup', { from: '/tests/questions' });
    }
  }, [minutes, seconds, history]);

  return (
    <TopTooltip
      text="Your test will be submitted automatically when time is up."
      type={
        minutes <= 2 && minutes > 0
          ? TIMER_WARNING
          : minutes <= 0
          ? TIMER_DANGER
          : ''
      }>
      <div
        className={`${styles.timer} ${
          minutes <= 2 && minutes > 0
            ? styles.warning
            : minutes <= 0
            ? styles.danger
            : ''
        }`}>
        <img src={TimeIcon} alt="" className={styles.timeIcon} />
        <h4>
          {minutes < 10 ? `0${minutes}` : minutes} :{' '}
          {seconds < 10 ? `0${seconds}` : seconds}
        </h4>
      </div>
    </TopTooltip>
  );
};

export default Timer;
