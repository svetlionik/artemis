import React from 'react';
import { Accordion, Card, Container } from 'react-bootstrap';
import { DateTime } from 'luxon';

import ArrowDownIcon from 'images/arrow-down.svg';
import ArrowUpIcon from 'images/arrow-up.svg';

import { Template } from '../RelocationDetails/Template';

import { ITable } from '../../types';

import { Names } from '../../enums';

import styles from './Table.module.scss';
import DATA from '../../details.json';

const DATADETAILS = DATA;

export const Table = ({
  status,
  startDate,
  applicationStep,
  step,
  detailKey,
  completedDate,
  handleClick,
  index,
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
                <p className={styles.desktop}>Relocation step </p>

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
                <p>Requested on</p>
                <h6>
                  {startDate === '—' || !startDate
                    ? '—'
                    : DateTime.fromISO(startDate, {
                        zone: 'eet',
                        locale: 'en-GB',
                      })
                        .toLocal()
                        .toFormat('dd LLL yyyy / HH:mm ZZZZ')}
                </h6>
              </div>
              <div className={styles.lgRow}>
                <p>Completed on</p>
                <h6>
                  {completedDate === '—' || !completedDate
                    ? '—'
                    : DateTime.fromISO(completedDate, {
                        zone: 'eet',
                        locale: 'en-GB',
                      })
                        .toLocal()
                        .toFormat('dd LLL yyyy / HH:mm ZZZZ')}
                </h6>
              </div>
              <div className={styles.middleLine}></div>
              <div className={styles.lgRow}>
                <p>Details</p>
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
              </div>
            </Container>
            <Accordion.Collapse eventKey={detailKey} key={applicationStep}>
              {applicationStep === 'PROVIDING_DOCUMENTS' ? (
                <Template {...DATADETAILS} />
              ) : applicationStep === 'CONTRACT' ? (
                <Template {...DATADETAILS} />
              ) : applicationStep === 'MIGRATION_PROCESS' ? (
                <Template {...DATADETAILS} />
              ) : applicationStep === 'VISA' ? (
                <Template {...DATADETAILS} />
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
