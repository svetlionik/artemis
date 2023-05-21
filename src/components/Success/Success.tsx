import React from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { LocationState } from '../types';

import styles from './Success.module.scss';
import { RootState } from 'store/store';

const allowedAccess = [
  'questions',
  'skills',
  '/tests/timeup',
  '/practical',
  '/practical/timeup',
];

const Success = () => {
  let date = new Date().toISOString();
  let formattedDate = date.slice(0, 10);
  const { questions } = useSelector((state: RootState) => state.tests);
  const location = useLocation<LocationState>();
  const history = useHistory();

  const handleRedirect = () => {
    history.push('/tech');
  };

  return allowedAccess.includes(location?.state?.from) ? (
    <Container
      className={`mx-auto my-auto px-auto ${styles.errorContainer}`}
      fluid>
      <Container className={styles.errorPage} fluid>
        <div className={styles.topDiv}>
          <h1>
            Your{' '}
            {location.pathname === '/skills/success'
              ? 'Skill Matrix'
              : location.pathname === '/practical/success'
              ? 'Practical Task'
              : questions.title}{' '}
            is successfully submitted!
          </h1>
          <p>Date: {formattedDate}</p>
          {location.pathname === '/skills/success' ? (
            <p className={styles.link}>
              Take a look at your <Link to="/skills">Skill Matrix Form</Link>
            </p>
          ) : null}
        </div>
        <div className={styles.bottomDiv}>
          {location.pathname === '/tests/success' ||
          location.pathname === '/practical/success' ? (
            <Button className={styles.btn} onClick={handleRedirect}>
              Back to Tech Evaluations
            </Button>
          ) : null}
        </div>
      </Container>
    </Container>
  ) : (
    <Redirect to="/home" />
  );
};

export default Success;
