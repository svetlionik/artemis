import styles from './SalaryTable.module.scss';

import { ISalary } from 'boxes/OfferDetails/types';

export const SalaryTable = (account: ISalary) => {
  return (
    <div className={styles.salaryTable}>
      <div className={styles.salaryCard}>
        <h5>Your salary</h5>
        <p>
          {account.probationSalary} {account.currency}
        </p>
      </div>
      <div className={styles.salaryCard}>
        <h5>Probation period</h5>
        <p>{account.probationMonths} months</p>
      </div>
      <div className={styles.salaryCard}>
        <h5>Salary after probation period</h5>
        <p>
          {account.salary} {account.currency}
        </p>
      </div>
    </div>
  );
};
