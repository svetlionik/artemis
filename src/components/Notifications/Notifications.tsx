import React from 'react';
import { Alert } from 'react-bootstrap';

import { INotifications } from 'components/types';

import styles from './Notification.module.scss';

const Notifications = ({ errorMsg, show }: INotifications) => {
  return (
    <Alert
      show={show}
      className={styles.notifications}
      variant=""
      data-testid="alert">
      <p>{errorMsg}</p>
    </Alert>
  );
};

export default Notifications;
