import { userInformation } from 'store/auth/selector';
import { useSelector } from 'react-redux';

import { IInternalOpportunity, IOpportunity } from 'boxes/OfferDetails/types';
import { WORK_LOCATIONS } from '../../constants';

import DATA from '../../internalOpportunities.json';

import styles from './InternalOpportunities.module.scss';

export const InternalOpportunities = () => {
  const data: IOpportunity = DATA;
  const user = useSelector(userInformation);
  return (
    <div className={styles.benefits}>
      {WORK_LOCATIONS.includes(user?.workLocation)
        ? data[user?.workLocation]?.opportunities?.map(
            ({ description, title, additional }: IInternalOpportunity) => (
              <div className={styles.benefitsCard}>
                <span>
                  <div></div>
                  <h5> {title}</h5>
                </span>
                <p>{description}</p>
                {additional?.map((info) => (
                  <li className={styles.li}>{info}</li>
                ))}
              </div>
            ),
          )
        : null}
    </div>
  );
};
