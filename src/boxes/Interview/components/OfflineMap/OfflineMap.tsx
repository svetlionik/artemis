import React from 'react';

import { IOfflineMap } from 'boxes/Interview/types';

import styles from './OfflineMap.module.scss';

import {
  ALL_OFFICE_NAMES,
  BURGAS_COORDINATES,
  BURGAS_LOCATION,
  RUSE_COORDINATES,
  RUSE_LOCATION,
  SKOPJE_COORDINATES,
  SKOPJE_LOCATION,
  SOFIA_COORDINATES,
  SOFIA_LOCATION,
} from '../Details/constants';

import { ReactComponent as PhoneIcon } from 'images/phone.svg';
import { ReactComponent as LocationIcon } from 'images/location.svg';
import { ReactComponent as MailIcon } from 'images/account-photos/mail.svg';

const OfflineMap = ({ officeLocation }: IOfflineMap) => {
  return (
    <div className={styles.offlineMap}>
      {ALL_OFFICE_NAMES.includes(officeLocation as string) ? (
        <span>
          <LocationIcon />
          <p className={styles.address}>
            {officeLocation === 'Sofia'
              ? SOFIA_LOCATION
              : officeLocation === 'Skopje'
              ? SKOPJE_LOCATION
              : officeLocation === 'Ruse'
              ? RUSE_LOCATION
              : officeLocation === 'Burgas'
              ? BURGAS_LOCATION
              : officeLocation}
          </p>
        </span>
      ) : null}
      <span>
        <MailIcon />
        <h4 className={styles.mail}>musala@musala.com</h4>
      </span>
      {ALL_OFFICE_NAMES.includes(officeLocation as string) ? (
        <span>
          <PhoneIcon />
          <p className={styles.phone}>
            {officeLocation === 'Skopje'
              ? `+389 (2) 320 1551`
              : `+359 (2) 969 5821`}
          </p>
        </span>
      ) : null}
      {ALL_OFFICE_NAMES.includes(officeLocation as string) ? (
        <iframe
          src={
            officeLocation === 'Sofia'
              ? SOFIA_COORDINATES
              : officeLocation === 'Burgas'
              ? BURGAS_COORDINATES
              : officeLocation === 'Skopje'
              ? SKOPJE_COORDINATES
              : RUSE_COORDINATES
          }
          width="100%"
          height="450"
          className="border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={'Office location'}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default OfflineMap;
