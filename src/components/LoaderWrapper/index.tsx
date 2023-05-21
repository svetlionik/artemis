import Loader from 'components/Loader/Loader';
import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './LoaderWrapper.module.scss';

const LoaderWrapper = ({
  children,
  loading,
}: {
  children?: React.ReactNode;
  loading: boolean;
}) => {
  return loading ? (
    <Container className={styles.loaderContainer} fluid>
      <Loader />
    </Container>
  ) : (
    <>{children}</>
  );
};

export default LoaderWrapper;
