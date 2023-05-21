import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Account } from './Account';
import { Expect } from './Expect';

import { RootState } from 'store/store';

import OfflineMap from '../OfflineMap/OfflineMap';

import { IDetailsType } from 'boxes/Interview/types';

import styles from '../../interview.module.scss';

import MSTEAMS from 'images/account-photos/ms-teams-logo.png';

import {
  HRDESCRIPTION,
  TECHNICALDESCRIPTION,
  TECHNICAL_DESCRIPTION_LIST,
  TECHNICAL_DESCRIPTION_ONE,
} from './constants';

export const Details = (detailsType: IDetailsType) => {
  const { stageDetails } = useSelector((state: RootState) => state.journey);

  const title =
    detailsType.type === 'HR'
      ? 'HR Interview Details'
      : 'Technical Interview Details';
  const description =
    detailsType.type === 'HR' ? (
      HRDESCRIPTION
    ) : (
      <>
        {TECHNICALDESCRIPTION}
        <h4>{TECHNICAL_DESCRIPTION_ONE}</h4>
        {TECHNICAL_DESCRIPTION_LIST.map((list: string) => (
          <li>{list}</li>
        ))}
      </>
    );

  return (
    <Container className={` ${styles.mobileDetailsDiv}`}>
      <h6>{title}</h6>
      <p>{description}</p>
      <div className={styles.divider}></div>
      <div className={styles.hrTitles}>
        Your {detailsType.type === 'HR' ? 'HR' : 'Technical'} interviewer
      </div>
      <Account />
      <div className={styles.divider}></div>
      <div className={styles.hrTitles}>What to expect on the interview</div>
      <Expect step={detailsType.step} type={stageDetails?.type} />
      {stageDetails?.meetingDetails?.type === 'ONLINE' &&
      detailsType.step === stageDetails?.type &&
      stageDetails?.status === 'ACTIVE' ? (
        <>
          <div className={styles.divider}></div>
          <div className={styles.hrTitles}>Meeting Details</div>
          <div className={styles.meetingDetails}>
            <div>
              <img src={MSTEAMS} />
              Microsoft Teams meeting
            </div>
            <div className={styles.msTeamsDetails}>
              <div className={styles.msLink}>
                Join on your computer or mobile app <br />
                <a
                  href={stageDetails?.meetingDetails?.url}
                  target="_blank"
                  rel="noreferrer">
                  Click here to join the meeting
                </a>
              </div>
              <div>
                Meeting ID: {stageDetails?.meetingDetails?.meetingId} <br />
                Passcode: {stageDetails?.meetingDetails?.passCode}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.divider}></div>
          <div className={styles.hrTitles}>Office location</div>
          <OfflineMap
            officeLocation={
              stageDetails?.meetingDetails?.officeLocation as string
            }
          />
        </>
      )}
    </Container>
  );
};
