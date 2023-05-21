import { IBenefit, IBenefits } from 'boxes/OfferDetails/types';
import styles from './Benefits.module.scss';

export const Benefits = (benefits: IBenefits) => {
  return (
    <div className={styles.benefits}>
      {benefits?.benefits.map(({ description, name }: IBenefit) => (
        <div className={styles.benefitsCard}>
          <span>
            <div></div>
            <h5> {name}</h5>
          </span>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
};
