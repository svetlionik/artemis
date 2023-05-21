import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

import { ErrorPage } from 'boxes/ErrorPage';

import { IMarks } from 'components/types';

import ArrowBack from '../../images/arrow-back.svg';

import styles from './Marks.module.scss';

import DATA from '../../data/form.json';

const MarksMobile = () => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push('/skills');
  };

  const screenWidth = window.innerWidth;
  return screenWidth < 768 ? (
    <>
      <Table className={styles.row}>
        <thead>
          <tr>
            <th>
              <p>
                <img
                  src={ArrowBack}
                  alt="arrow"
                  className={styles.arrowIcon}
                  onClick={handleRedirect}
                />{' '}
                Skill Matrix
              </p>
            </th>
          </tr>
        </thead>
      </Table>
      <Container className={`${styles.marks}`}>
        <div className={styles.header}>
          <h4>Evaluation marks</h4>
        </div>
        <div className={styles.body}>
          <Container className="px-0">
            {DATA.form.general.map(({ id, name, msg, title }: IMarks) => (
              <Row className="g-2" key={id}>
                <Col xs={{ span: 2 }}>
                  <p className={styles.circle}>{name}</p>
                </Col>
                <Col xs={{ span: 10 }}>
                  <Row className={styles.rowTitle}>{title}</Row>
                  <Row className={styles.rowMessage}>{msg}</Row>
                </Col>
              </Row>
            ))}
            <Row>
              <Button onClick={handleRedirect} className={styles.okayBtn}>
                Okay
              </Button>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  ) : (
    <ErrorPage />
  );
};

export default MarksMobile;
