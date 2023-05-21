import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Timer.module.scss';

import { DateTime } from 'luxon';

const PracticalTaskTimer = ({ firstDate }: { firstDate: DateTime }) => {
  const history = useHistory();
  let secondDate = DateTime.local();
  let dateDiff = secondDate.diff(firstDate, 'second');
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(59);
  const [hours, setHours] = useState(23);
  const [days, setDays] = useState(9);

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
        clearInterval(interval);
      }
      if (minutes === 0 && seconds === 0) {
        setMinutes(59);
        setSeconds(59);
        clearInterval(interval);
      } else if (minutes === 0 && hours !== 0) {
        setHours(hours - 1);
        clearInterval(interval);
      }
      if (hours === 0 && minutes === 0 && seconds === 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes, hours, days]);

  useEffect(() => {
    let newDays = 9 - Math.floor(dateDiff.seconds / (3600 * 24));
    let newHours = 23 - Math.floor((dateDiff.seconds % (24 * 3600)) / 3600);
    let newMinutes = 59 - Math.floor((dateDiff.seconds % 3600) / 60);
    let newSeconds = 60 - (dateDiff.seconds % 60);
    if (
      !isNaN(newMinutes) ||
      !isNaN(newSeconds) ||
      !isNaN(newHours) ||
      !isNaN(newDays)
    ) {
      setMinutes(newMinutes);
      setSeconds(Math.round(newSeconds));
      setHours(newHours);
      setDays(newDays);
    }
  }, [dateDiff.seconds]);

  useEffect(() => {
    if (dateDiff.seconds > 864000) {
      history.push('/practical/timeup', { from: '/practical' });
    }
  }, [dateDiff.seconds, history]);

  return (
    <div
      className={`${styles.timer} 
       `}>
      <div className={styles.timerRow}>
        <h5
          className={`${
            days <= 1
              ? styles.start
              : days === 1
              ? styles.first
              : days > 1 && days <= 3
              ? styles.third
              : days === 4
              ? styles.fourth
              : days === 5
              ? styles.fifth
              : days === 6
              ? styles.sixth
              : days > 6 && days <= 8
              ? styles.seventh
              : days === 9
              ? styles.eighth
              : styles.completed
          }`}>
          <h2>{days < 10 ? `0${days}` : days}</h2>
        </h5>{' '}
        {'  '}
        <h5
          className={`${
            hours <= 1
              ? styles.start
              : hours > 1 && hours <= 2
              ? styles.first
              : hours > 2 && hours <= 5
              ? styles.second
              : hours === 6
              ? styles.third
              : hours > 6 && hours <= 8
              ? styles.fourth
              : hours > 8 && hours <= 11
              ? styles.fourthHalf
              : hours === 12
              ? styles.fifth
              : hours > 12 && hours <= 15
              ? styles.fifthHalf
              : hours > 15 && hours <= 17
              ? styles.sixth
              : hours === 18
              ? styles.seventh
              : hours > 18 && hours <= 21
              ? styles.seventhHalf
              : hours > 21 && hours <= 23
              ? styles.eighth
              : styles.completed
          }`}>
          <h2>{hours < 10 ? `0${hours}` : hours}</h2>
        </h5>
        <h5
          className={`${
            minutes <= 1
              ? styles.start
              : minutes > 1 && minutes <= 5
              ? styles.first
              : minutes > 5 && minutes <= 10
              ? styles.firstHalf
              : minutes > 10 && minutes <= 14
              ? styles.second
              : minutes === 15
              ? styles.third
              : minutes > 15 && minutes <= 20
              ? styles.thirdHalf
              : minutes > 20 && minutes <= 24
              ? styles.fourth
              : minutes > 24 && minutes <= 29
              ? styles.fourthHalf
              : minutes === 30
              ? styles.fifth
              : minutes > 30 && minutes <= 35
              ? styles.fifthHalf
              : minutes > 35 && minutes <= 40
              ? styles.sixth
              : minutes > 40 && minutes <= 44
              ? styles.sixthHalf
              : minutes === 45
              ? styles.seventh
              : minutes > 45 && minutes <= 50
              ? styles.seventhHalf
              : minutes > 50 && minutes <= 55
              ? styles.eighth
              : minutes > 55 && minutes <= 59
              ? styles.eighthHalf
              : styles.completed
          }`}>
          <h2>{minutes < 10 ? `0${minutes}` : minutes}</h2>
        </h5>
      </div>
      <div className={styles.timerRow}>
        <h6>Days</h6>
        <h6>Hours</h6>
        <h6>Minutes</h6>
      </div>
    </div>
  );
};

export default PracticalTaskTimer;
