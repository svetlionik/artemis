import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import { TIMER_DANGER, TIMER_WARNING } from 'shared/constants/constants';

import styles from './TopTooltip.module.scss';

const TopTooltip = (el: {
  text: string;
  type: string;
  children: React.ReactElement;
}) => {
  const renderTooltip = (props: object) => (
    <Popover
      id="popover-basic"
      {...props}
      className={`${styles.box} ${
        el.type === TIMER_WARNING
          ? styles.orange
          : el.type === TIMER_DANGER
          ? styles.red
          : ''
      }`}>
      <div
        className={`${styles.corner} ${
          el.type === TIMER_WARNING
            ? styles.orange
            : el.type === TIMER_DANGER
            ? styles.red
            : ''
        }`}></div>
      <Popover.Body className={styles.text}>{el.text}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 0, hide: 0 }}
      overlay={renderTooltip}>
      {el.children}
    </OverlayTrigger>
  );
};

export default TopTooltip;
