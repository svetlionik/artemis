import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkSkillMatrix } from 'store/tech/actions';

import UnderConstruction from '../../components/UnderConstruction/UnderConstruction';

import styles from './Benefits.module.scss';

const FLAG = process.env.REACT_APP_TEST_FLAG;

const Benefits = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSkillMatrix());
  }, []);
  return FLAG === 'true' ? (
    <Container data-testid="benefit" className={styles.benefits} fluid>
      <UnderConstruction />
    </Container>
  ) : (
    <Redirect to="/home" />
  );
};

export default Benefits;
