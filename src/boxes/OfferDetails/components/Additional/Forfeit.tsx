import styles from './Additional.module.scss';

export const Forfeit = () => {
  return (
    <div className={styles.benefits}>
      <p>
        If you decide to leave the company while your Blue card and working
        contract are valid and renewed by the company, your notice period for
        leaving the company will be 3 months and you will be charged for the
        expenses made by the company for your stay in Bulgaria, which includes:
      </p>
      <h4>
        - Documentation for Work permit (Blue card/Single permit) Visa D, (which
        varies but is around 400 euros)
      </h4>
      <h4>
        - Renewal of your Blue card every year – around 200 euros annually
      </h4>
      <h4>- Costs for travel [Egypt] to Bulgaria (around 550 euros)</h4>
      <h4>- Accommodation for the 12-month period (250 euros per month)</h4>
      <p>
        We will take care of your legal documents bounded with your Blue
        card/Single permit.
      </p>
    </div>
  );
};
