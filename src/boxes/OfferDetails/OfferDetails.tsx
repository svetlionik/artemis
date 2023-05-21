import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import { Benefits } from './components/Benefits/Benefits';
import { SalaryTable } from './components/SalaryTable/SalaryTable';
import { Accommodation } from './components/Additional/Accomodation';
import { WorkingPermit } from './components/Additional/WorkingPermit';
import { Forfeit } from './components/Additional/Forfeit';
import { InternalOpportunities } from './components/InternalOpportunities/InternalOpportunities';

import { RootState } from 'store/store';
import { userInformation } from 'store/auth/selector';

import styles from './OfferDetails.module.scss';

import {
  BG_OFFER,
  BG_OFFER_FIVE,
  BG_OFFER_FOUR,
  BG_OFFER_THREE,
  BG_OFFER_TWO,
  ALL_POSSIBLE_WORK_LOCATIONS,
  WORK_LOCATIONS,
} from './constants';

export const OfferDetails = () => {
  const { stageDetails } = useSelector((state: RootState) => state.journey);
  const user = useSelector(userInformation);
  return (
    <Container className={` ${styles.mobileDetailsDiv}`}>
      <h6>Offer Details</h6>
      <p>
        {BG_OFFER}
        {BG_OFFER_TWO}
      </p>
      <div className={styles.divider}></div>
      <SalaryTable {...stageDetails?.salaryDetails} />
      {stageDetails?.salaryDetails?.conditional ? (
        <>
          <div className={styles.divider}></div>
          <div className={styles.conditional}>
            <p>
              <p className={styles.hrTitles}>*conditional offer</p>
              {BG_OFFER_THREE} {BG_OFFER_FOUR} {BG_OFFER_FIVE}
            </p>
          </div>
        </>
      ) : null}
      {user?.workLocation === 'Relocation to Sofia' ? (
        <>
          <div className={styles.divider}></div>
          <h6>Relocation and working permit</h6>
          <WorkingPermit />
        </>
      ) : null}
      {user?.workLocation === 'Relocation to Sofia' ? (
        <>
          <div className={styles.divider}></div>
          <h6>Accommodation</h6>
          <Accommodation />
        </>
      ) : null}
      {stageDetails?.benefits &&
      ALL_POSSIBLE_WORK_LOCATIONS.includes(user?.workLocation) ? (
        <>
          <div className={styles.divider}></div>
          <h6>Benefits</h6>
          <Benefits benefits={stageDetails?.benefits} />
        </>
      ) : null}
      {WORK_LOCATIONS.includes(user?.workLocation) ? (
        <>
          <div className={styles.divider}></div>
          <h6>Internal Opportunities</h6>
          <InternalOpportunities />
        </>
      ) : null}
      {user?.workLocation === 'Relocation to Sofia' ? (
        <>
          <div className={styles.divider}></div>
          <h6>Forfeit</h6>
          <Forfeit />
        </>
      ) : null}
    </Container>
  );
};
