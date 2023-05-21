import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ResetPasswordForm from './ResetPasswordForm';

import { Notifications, Loader } from 'components/index';

import { logout, resetPassword } from 'store/auth/actions';
import { authMessage, isChangeSuccess } from 'store/auth/selector';

import UserPool from 'UserPool';

import { IResetCredentials } from '../types';

import { ResetTokenWithRedirect } from 'shared/services/common';

import styles from './ResetPassword.module.scss';

export const ResetPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = UserPool.getCurrentUser();

  const [show, setShow] = useState(false);
  const message = useSelector(authMessage);
  const reset = useSelector(isChangeSuccess);

  // The following check is to make sure the token is not changed or removed by the user
  if (!currentUser) {
    ResetTokenWithRedirect();
  }

  const onSubmit = (oldPassword: string, newPassword: string) => {
    if (!currentUser) {
      ResetTokenWithRedirect();
    }
    dispatch(resetPassword({ oldPassword, newPassword }));
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  useEffect(() => {
    if (reset === 'success') {
      history.replace('/home');
      history.push('/home');
      dispatch(logout());
    }
  }, [reset, history, dispatch]);

  return (
    <Container className="text-center mainContainer" fluid>
      <div className="row align-items-center h-100">
        <div className="mx-auto">
          <div className="jumbotron text-center ">
            {reset === 'success' || reset === 'loading' ? null : (
              <Notifications
                errorMsg={message}
                show={show}
                data-testid="resetPasswordNotifications"
              />
            )}
            {reset === 'loading' ? <Loader /> : null}
            <h1 className={styles.title}>Change your password.</h1>
            <ResetPasswordForm
              status={reset}
              onSubmit={({ oldPassword, newPassword }: IResetCredentials) => {
                onSubmit(oldPassword, newPassword);
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
