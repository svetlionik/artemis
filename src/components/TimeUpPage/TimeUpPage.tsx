import React, { useEffect } from 'react';
import { Loader } from 'components';
import { Container } from 'react-bootstrap';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LocationState } from 'components/types';
import { RootState } from 'store/store';

import styles from './TimeUpPage.module.scss';
const allowedAccess = ['/tests/questions', '/practical'];
const TimeUpPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { questions } = useSelector((state: RootState) => state.tests);

  useEffect(() => {
    if (location?.state?.from === '/tests/questions') {
      setTimeout(() => {
        history.push('/tests/success', { from: '/tests/timeup' });
      }, 5000);
    }
    if (location?.state?.from === '/practical') {
      setTimeout(() => {
        history.push('/practical/success', { from: '/practical/timeup' });
      }, 5000);
    }
  }, [history, location]);

  return allowedAccess.includes(location?.state?.from) ? (
    <Container
      className={`mx-auto my-auto px-auto ${styles.errorContainer}`}
      fluid>
      <Container className={styles.errorPage} fluid>
        <div className={styles.topDiv}>
          <h1>whoops…looks like your time is up.</h1>
          <p>
            Your{' '}
            {location.pathname === '/practical/timeup'
              ? 'Practical task'
              : questions.title}{' '}
            will be submitted automatically. — <br /> Thank you for your time!
          </p>
        </div>
        <Loader />
      </Container>
    </Container>
  ) : (
    <Redirect to="/home" />
  );
};

export default TimeUpPage;
