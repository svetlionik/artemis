import React from 'react';
import { Accordion, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

import { OfferDetails } from 'boxes/OfferDetails/OfferDetails';
import { Details } from 'boxes/Interview/components/Details/Details';
import { Overlays } from 'components';

import ArrowDownIcon from 'images/arrow-down.svg';
import ArrowUpIcon from 'images/arrow-up.svg';
import { ReactComponent as MeetingIcon } from 'images/teams-white.svg';
import { ReactComponent as LocationIcon } from 'images/export-in-new-tab.svg';

import { ITable } from 'boxes/AppJourney/types';

import { Names } from '../../enums';
import { POSSIBLESTEPS } from '../../constants';

import styles from './Table.module.scss';

export const Table = ({
  status,
  startDate,
  applicationStep,
  step,
  detailKey,
  handleClick,
  meeting,
  index,
  meetingType,
  officeLocation,
}: ITable) => {
  return (
    <>
      <Accordion defaultActiveKey={index} data-testid="stepComponent">
        <Card
          className={`border-0 
          ${
            status === 'ACTIVE'
              ? styles.progressCard
              : status === 'Terminated'
              ? styles.terminatedCard
              : status === 'Employed'
              ? styles.employedCard
              : styles.passedCard
          }`}>
          <Card.Header
            className={`my-0 py-0 px-0 mx-0
            ${
              status === 'ACTIVE'
                ? styles.progressHeader
                : status === 'Terminated'
                ? styles.terminatedHeader
                : status === 'Employed'
                ? styles.employedHeader
                : styles.passedHeader
            }`}>
            <Container className={styles.bigBox}>
              <div className={styles.lgRow}>
                <p className={styles.desktop}>Application step </p>

                <p className={styles.mobileTitle}>
                  {Object.entries(Names)
                    .filter(([key, value]) => key === applicationStep)
                    .map(([key, value]) => value)}
                </p>
                <h6 className={styles.desktop}>
                  {Object.entries(Names)
                    .filter(([key, value]) => key === applicationStep)
                    .map(([key, value]) => value)}
                </h6>
              </div>
              <div className={styles.lgRow}>
                <p>When</p>
                <h6>
                  {startDate === '—' || !startDate
                    ? '—'
                    : applicationStep === 'HR-HR' ||
                      applicationStep === 'TECHNICAL-TECHNICAL'
                    ? DateTime.fromISO(startDate, {
                        zone: 'eet',
                        locale: 'en-GB',
                      })
                        .toLocal()
                        .toFormat('dd LLL yyyy / HH:mm ZZZZ')
                    : DateTime.fromISO(startDate, {
                        zone: 'utc',
                        locale: 'en-GB',
                      })
                        .toLocal()
                        .toFormat('dd LLL yyyy / HH:mm ZZZZ')}
                </h6>
              </div>
              {applicationStep === 'OFFER-OFFER' ? (
                <div className={styles.hideRow}></div>
              ) : (
                <div className={styles.lgRow}>
                  <p>Where</p>
                  {meeting && meetingType === 'ONLINE' ? (
                    status !== 'ACTIVE' ? (
                      <h6
                        className={`${styles.meetingBtn} ${styles.disabledBtn}`}>
                        <MeetingIcon />{' '}
                        <Link to="#" className={styles.link}>
                          Join the meeting
                        </Link>
                      </h6>
                    ) : (
                      <h6 className={styles.meetingBtn}>
                        <MeetingIcon />{' '}
                        <Link
                          to={{ pathname: meeting }}
                          target={'_blank'}
                          className={styles.link}>
                          Join the meeting
                        </Link>
                      </h6>
                    )
                  ) : (
                    <h6>
                      {POSSIBLESTEPS.includes(applicationStep) ? (
                        'Online'
                      ) : (
                        <span
                          onClick={handleClick.bind(this, {
                            index,
                            applicationStep,
                            step,
                          })}>
                          Office {officeLocation}
                          {''}
                          <Overlays text={'View location'}>
                            <LocationIcon />
                          </Overlays>
                        </span>
                      )}
                    </h6>
                  )}
                </div>
              )}
              {applicationStep === 'HR-HR' ||
              applicationStep === 'TECHNICAL-TECHNICAL' ? (
                <div className={styles.lgRow}>
                  <p>Duration</p>
                  <h6>
                    {applicationStep === 'HR-HR'
                      ? '40mins'
                      : applicationStep === 'TECHNICAL-TECHNICAL'
                      ? 'Up to 2 hours'
                      : '—'}
                  </h6>
                </div>
              ) : applicationStep === 'OFFER-OFFER' ? (
                <div className={styles.lgRow}></div>
              ) : (
                <div className={styles.hideRow}></div>
              )}
              <div className={styles.middleLine}></div>
              {POSSIBLESTEPS.includes(applicationStep) ? (
                <div className={styles.hideRow}></div>
              ) : (
                <div className={styles.lgRow}>
                  <p>Details</p>
                  {POSSIBLESTEPS.includes(applicationStep) ? (
                    <h6>-</h6>
                  ) : (
                    <h6
                      className={styles.btn}
                      onClick={handleClick.bind(this, {
                        index,
                        applicationStep,
                        step,
                      })}
                      data-testid="detailsButton">
                      View{' '}
                      {detailKey === index ? (
                        <img
                          src={ArrowUpIcon}
                          alt="arrowUpIcon"
                          className={styles.arrowIcon}
                        />
                      ) : (
                        <img
                          src={ArrowDownIcon}
                          alt="arrowDownIcon"
                          className={styles.arrowIcon}
                        />
                      )}
                    </h6>
                  )}
                </div>
              )}
            </Container>
            <Accordion.Collapse eventKey={detailKey} key={applicationStep}>
              {applicationStep === 'OFFER-OFFER' ? (
                <OfferDetails />
              ) : applicationStep === 'HR-HR' ? (
                <Details type="HR" step={'HR'} />
              ) : applicationStep === 'TECHNICAL-TECHNICAL' ? (
                <Details type="TECHNICAL" step={'TECHNICAL'} />
              ) : (
                <Container></Container>
              )}
            </Accordion.Collapse>
          </Card.Header>
        </Card>
      </Accordion>
    </>
  );
};
