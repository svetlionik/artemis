import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store/store';
import {
  DEVOPS_EXTRA,
  EXTRA,
  GENERAL_EXTRA,
  HREXPECT,
  HREXTRA,
  TECHNICALEXPECT,
  UIUX_EXTRA,
} from './constants';
import { IDetailsType } from 'boxes/Interview/types';

import styles from '../../interview.module.scss';

export const Expect = (detailsType: IDetailsType) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const expect =
    detailsType?.step === 'HR' && detailsType.type === 'HR' ? HREXPECT : null;
  const expectTechnical =
    detailsType?.step === 'TECHNICAL' &&
    detailsType.type === 'TECHNICAL' &&
    (user?.profile === 'DEV' || user?.profile === 'QA')
      ? TECHNICALEXPECT
      : null;
  const correctText =
    user?.profile === 'UIUX'
      ? UIUX_EXTRA
      : user?.profile === 'DEVOPS'
      ? DEVOPS_EXTRA
      : user?.profile === 'DEV' || user?.profile === 'QA'
      ? null
      : GENERAL_EXTRA;
  const additionalInfo =
    detailsType?.step === 'HR' && detailsType.type === 'HR'
      ? HREXTRA
      : correctText;
  return (
    <div className={styles.expect}>
      {detailsType?.step === 'HR' && detailsType.type === 'HR' ? (
        <p>{expect}</p>
      ) : null}
      {detailsType?.step === 'TECHNICAL' &&
      detailsType.type === 'TECHNICAL' &&
      (user?.profile === 'DEV' || user?.profile === 'QA') ? (
        <p>{expectTechnical}</p>
      ) : null}
      {detailsType?.step === 'HR' && detailsType.type === 'HR'
        ? null
        : EXTRA[
            user?.profile === 'DEV'
              ? 'DEV'
              : user?.profile === 'QA'
              ? 'QA'
              : user?.profile === 'DEVOPS'
              ? 'DEVOPS'
              : user?.profile === 'UI/UX'
              ? 'UIUX'
              : 'GENERAL'
          ].topics.map((topic: string) => <li>{topic}</li>)}
      {additionalInfo ? (
        <p className={styles.additional}>{additionalInfo}</p>
      ) : null}
    </div>
  );
};
