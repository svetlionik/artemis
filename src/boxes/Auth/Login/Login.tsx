import React from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';

import Notifications from 'components/Notifications/Notifications';
import Loader from 'components/Loader/Loader';

import { authStatusSelector, authMessage } from 'store/auth/selector';
import { profile, login } from 'store/auth/actions';

import { ILoginCredentials, ILoginProps } from '../types';

import UserPool from 'UserPool';

import logo from 'images/logo-white.svg';

import styles from './Login.module.scss';

export const Login = (props: ILoginProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const status = useSelector(authStatusSelector);
  const message = useSelector(authMessage);

  const onSubmit = async (username: string, password: string) => {
    await dispatch(login({ username, password }));
    const currentUser = UserPool.getCurrentUser();
    if (currentUser) {
      await dispatch(profile());
      if (history.length == 3 && props.prevURL !== '/login') {
        history.push(props.prevURL);
      } else if (history.length < 3) {
        history.push(props.prevURL);
      } else {
        history.push(history.location.pathname);
      }
    }
  };

  return (
    <Container className={`bg-primary ${styles.login}`} fluid>
      {status !== 'idle' && message && (
        <Notifications errorMsg={message} show={message} />
      )}
      {status === 'loading' && <Loader />}
      <Container className={styles.loginTitle}>
        <h1 className="text-secondary">Welcome to</h1>
        <img src={logo} alt="" className={styles.logoImage} />
      </Container>
      <LoginForm
        status={message}
        onSubmit={({ username, password }: ILoginCredentials) => {
          onSubmit(username, password);
        }}
      />
    </Container>
  );
};
