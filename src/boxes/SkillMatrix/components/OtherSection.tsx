import { Form, Table } from 'react-bootstrap';

import { IAdditionalSubbmitedSkill, IPossibleYear } from '../types';

import DATA from 'data/form.json';

import styles from '../SkillMatrix.module.scss';

const OtherSection = ({
  skills,
  index,
  possibleYears,
}: {
  skills: IAdditionalSubbmitedSkill[];
  index: number;
  possibleYears: IPossibleYear[];
}) => {
  return skills.length === 0 ? null : (
    <Table className={styles.table}>
      <thead>
        <tr>
          <th>
            <p>{index + 1}. Other</p>
          </th>
          <th className={styles.levelHeader}>
            <p>Level of Experience</p>
          </th>
          <th className={styles.levelHeader}>
            <p>Years of Experience</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {skills.map((field) => (
          <tr>
            <td className={styles.field}>
              <p>{field.name}</p>
            </td>
            <p className={styles.mobileLevelHeader}>Level of experience</p>
            <td className={styles.radio}>
              {DATA.form.general.map(({ id, val, title, name, isChecked }) => (
                <Form.Check className="px-0 mx-0">
                  <Form.Check.Label>
                    <Form.Check.Input
                      disabled
                      type="radio"
                      name={field.name}
                      defaultChecked={isChecked === field.level}
                    />
                    <span title={title}>{name}</span>
                  </Form.Check.Label>
                </Form.Check>
              ))}
            </td>
            <td className={styles.years}>
              <p className={styles.mobileLevelHeader}>Years of experience</p>
              <Form.Group className={styles.otherDiv}>
                {possibleYears.map(
                  ({ description, displayValue }: IPossibleYear) => (
                    <Form.Check className="px-0 mx-0">
                      <Form.Check.Label>
                        <Form.Check.Input
                          disabled
                          type="radio"
                          defaultChecked={description === field.years}
                        />
                        <span title={description}>{displayValue}</span>
                      </Form.Check.Label>
                    </Form.Check>
                  ),
                )}
              </Form.Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OtherSection;
