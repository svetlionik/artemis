import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './Footer.module.scss';

const Footer = () => {
  const history = useHistory();
  const isRelocation = history.location.pathname.includes('/relocation');

  return (
    <div className={styles.footer}>
      <p>© Musala Soft JSC 2023</p>
      <span>
        <Link
          className={styles.links}
          to={{ pathname: 'https://www.musala.com/policies/gdpr/' }}
          target="_blank">
          Privacy Policy
        </Link>
        {isRelocation && (
          <span className={styles.contactInfo}>
            <span>Contact Us: </span>
            <span>
              <a href="tel:0035927439579">T: +359 (2) 743 9579</a>
            </span>{' '}
            <span>
              <a href="mailto:visas@musala.com">M: visas@musala.com</a>
            </span>
          </span>
        )}
        {/*
        This is for future implementation
        <Overlays text="Please provide your username and detailed description of your problem">
          <a
            href="mailto:artemis.support@musala.com?subject=Report a problem&body=Hi Artemis team,
            %0A%0A%0AProblem description:
            %0A%0A%0ANames:
            %0A%0A%0AArtemis username:
            %0A%0A%0AHR Representative Name:
            %0A%0A%0AExtra information to help troubleshooting (e.g. screenshot, error message, etc.):
            %0A%0A%0ABest regards"
            className={styles.links}>
            Report a problem
          </a>
        </Overlays> */}
      </span>
    </div>
  );
};

export default Footer;
