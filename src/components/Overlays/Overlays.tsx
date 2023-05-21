import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import { IOverlay } from 'components/types';
import styles from './Overlays.module.scss';

const Overlays = (el: IOverlay) => {
  const renderTooltip = (props: object) => (
    <Popover id="popover-basic" {...props} className={styles.box}>
      <div className={styles.corner}></div>
      <Popover.Body className={styles.text}>{el.text}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 0, hide: 0 }}
      overlay={renderTooltip}>
      <span>{el.children}</span>
    </OverlayTrigger>
  );
};

export default Overlays;
