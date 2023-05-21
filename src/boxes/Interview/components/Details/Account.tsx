import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/store';
import { getInterviewDetails } from 'store/journey/actions';

import styles from '../../interview.module.scss';

import BearAccount from 'images/account-photos/bear.svg';
import BeeAccount from 'images/account-photos/bee.svg';
import LionAccount from 'images/account-photos/lion.svg';
import MusalenkoAccount from 'images/account-photos/musalenko.svg';
import LinkedinIcon from 'images/account-photos/linkedin.svg';
import MailIcon from 'images/account-photos/mail.svg';
import { Loader } from 'components';

export const Account = () => {
  const { interviewer, stageDetails, stageDetailStatus, interviewerStatus } =
    useSelector((state: RootState) => state.journey);
  const dispatch = useDispatch();
  const [accountImage, setAccountImage] = useState({});
  useEffect(() => {
    switch (Math.floor(Math.random() * 4)) {
      case 0:
        setAccountImage(BearAccount);
        break;
      case 1:
        setAccountImage(BeeAccount);
        break;
      case 2:
        setAccountImage(LionAccount);
        break;
      case 3:
        setAccountImage(MusalenkoAccount);
        break;
    }
  }, []);

  useEffect(() => {
    dispatch(getInterviewDetails());
  }, []);

  const fallbackImage = (e: any) => {
    e.target.onerror = null;
    e.target.src = accountImage;
  };

  return stageDetailStatus === 'loading' || interviewerStatus === 'loading' ? (
    <Loader />
  ) : (
    <div className={styles.accountContainer}>
      <div className={styles.accountPhoto}>
        <img
          src={
            Object.keys(stageDetails).length === 0
              ? interviewer.photoURL
              : stageDetails?.interviewerDetails?.photoURL
          }
          onError={fallbackImage}
          alt="interviewer"
        />
      </div>
      <div className={styles.accountDetails}>
        <div className={styles.accountName}>
          <div className={styles.name}>
            {Object.keys(stageDetails).length === 0
              ? interviewer.name
              : stageDetails?.interviewerDetails?.name}
          </div>
        </div>
        <div className={styles.accountLinks}>
          {stageDetails?.type === 'TECHNICAL' ? null : (
            <div>
              <img src={LinkedinIcon} alt="linkedin" />
              <a
                href={
                  Object.keys(stageDetails).length === 0
                    ? interviewer.linkedinURL
                    : stageDetails?.interviewerDetails?.linkedinURL
                }
                target="_blank"
                rel="noreferrer">
                {Object.keys(stageDetails).length === 0
                  ? interviewer.linkedinURL
                  : stageDetails?.interviewerDetails?.linkedinURL}
              </a>
            </div>
          )}
          <div>
            <img src={MailIcon} alt="mail" />
            <a
              href={`mailto:${
                Object.keys(stageDetails).length === 0
                  ? interviewer.email
                  : stageDetails?.interviewerDetails?.email
              }`}
              target="_blank"
              rel="noreferrer">
              {Object.keys(stageDetails).length === 0
                ? interviewer.email
                : stageDetails?.interviewerDetails?.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
