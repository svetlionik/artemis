import React from 'react';
import { useHistory } from 'react-router';
import { Button, Container } from 'react-bootstrap';

import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
  const history = useHistory();
  const handleRedirect = () => {
    history.goBack();
  };

  return (
    <Container
      className={`mx-auto my-auto px-auto ${styles.errorContainer}`}
      fluid>
      <Container className={styles.errorPage} fluid>
        <div className={styles.topDiv}>
          <h1>whoops...</h1>
          {history.location.pathname === '/error-page' ? (
            <p>
              Looks like we are experiencing some problems, please try again
              later.
            </p>
          ) : (
            <p>Looks like we can't find the page you're looking for.</p>
          )}
        </div>

        <div className={styles.bottomDiv}>
          {history.location.pathname === '/error-page' ? null : (
            <>
              <h1>404</h1>
              <Button onClick={handleRedirect} className={styles.btn}>
                Go back
              </Button>
            </>
          )}
        </div>
      </Container>
    </Container>
  );
};

export default ErrorPage;
