import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Account } from 'boxes/Interview/components/Details/Account';

import { RootState } from 'store/store';
import { getInterviewDetails } from 'store/journey/actions';

import { IRelocationMap } from 'boxes/Relocation/types';
import { StageMap } from 'store/journey/types';

import { Loader } from 'components';

import styles from './CustomPage.module.scss';

const CustomPage = ({
  newStages,
}: {
  newStages: IRelocationMap | StageMap;
}) => {
  const { interviewer } = useSelector((state: RootState) => state.journey);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newStages['DONE']) {
      dispatch(getInterviewDetails());
    }
  }, [newStages]);

  return (
    <Container
      className={`mx-auto my-auto px-auto ${styles.errorContainer}`}
      fluid>
      <Container className={styles.errorPage} fluid>
        {!newStages ? (
          <Loader />
        ) : (newStages['STARTED']?.status === 'PASSED' ||
            newStages['PROVIDING_DOCUMENTS']?.status === 'PASSED') &&
          Object.keys(newStages).length === 1 ? (
          <div className={`${styles.topDiv} ${styles.start}`}>
            <h1>Your journey awaits!</h1>
            <p>
              Your application process is about to start. Please, follow the
              instructions throughout your journey, and if you have any
              additional questions we are here for you! We wish you the best of
              luck in your journey to join the Musala Soft family!
            </p>
            <div className={styles.illustration}></div>
          </div>
        ) : newStages['DONE']?.status === 'PASSED' ? (
          <div className={`${styles.topDiv} ${styles.success}`}>
            <h1>Congratulations!</h1>
            <p>You have successfully joined our big family in Musala Soft!</p>
            <div className={styles.illustration}></div>
            <div className={styles.next}>
              <h5 className={styles.title}>What’s next</h5>
              <p>
                We are excited you have joined Musala Soft! Shortly to your
                start date our colleague will contact you with information for
                further steps.
              </p>
              {Object.keys(interviewer).length !== 0 ? (
                <>
                  <div className={styles.middleLine}></div>
                  <h5 className={styles.accountTitle}>
                    Please, if you have any questions contact your HR
                    representative:
                  </h5>
                  <Account />
                </>
              ) : null}
              <div className={styles.middleLine}></div>
              <h4>
                Thank you, for your patience and for following our application
                process!
              </h4>
            </div>
          </div>
        ) : newStages['FINAL']?.status === 'PASSED' ? (
          <div className={`${styles.topDiv} ${styles.success}`}>
            <h1>Congratulations!</h1>
            <p>You have successfully joined our big family in Musala Soft!</p>
            <div className={styles.illustration}></div>
            <div className={styles.next}>
              <h5 className={styles.title}>What’s next</h5>
              <p>
                We are excited you have joined Musala Soft! Shortly to your
                start date our colleague will contact you with information for
                further steps.
              </p>
              {Object.keys(interviewer).length !== 0 ? (
                <>
                  <div className={styles.middleLine}></div>
                  <h5 className={styles.accountTitle}>
                    Please, if you have any questions contact your HR
                    representative:
                  </h5>
                  <Account />
                </>
              ) : null}
              <div className={styles.middleLine}></div>
              <h4>
                Thank you, for your patience and for following our application
                process!
              </h4>
            </div>
          </div>
        ) : (
          <div className={`${styles.topDiv} ${styles.terminated}`}>
            <h1>Thank you, for applying in Musala Soft!</h1>
            <p>
              Please, follow us in the future and apply again. We will also keep
              you in mind and we can get in touch again.
            </p>
            <div className={styles.illustration}></div>
          </div>
        )}
      </Container>
    </Container>
  );
};

export default CustomPage;
