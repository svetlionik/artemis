import { Form, Table } from 'react-bootstrap';

import styles from '../SkillMatrix.module.scss';

import { IPossibleYear, ISectionSkills } from '../types';

import DATA from 'data/form.json';

const Section = ({
  skills,
  index,
  possibleYears,
}: {
  skills: ISectionSkills;
  index: number;
  possibleYears: IPossibleYear[];
}) => {
  return (
    <Table className={styles.table}>
      <thead>
        <tr>
          <th>
            <p>
              {index + 1}.{' '}
              {skills.name.length > 30
                ? skills.name.substring(0, 30) + '...'
                : skills.name}
            </p>
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
        {skills.skills.map((field, index) => (
          <tr>
            <td className={styles.field}>
              <p>{field.name}</p>
            </td>
            <p className={styles.mobileLevelHeader}>Level of experience</p>
            <td className={styles.radio}>
              {DATA.form.general.map(
                ({
                  title,
                  name,
                  isChecked,
                }: {
                  title: string;
                  name: string;
                  isChecked: string;
                }) => (
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
                ),
              )}
            </td>
            <td className={styles.years}>
              <p className={styles.mobileLevelHeader}>Years of experience</p>
              <Form.Group className={styles.otherDiv}>
                {possibleYears.map(({ description, displayValue }) => (
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
                ))}
              </Form.Group>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Section;
