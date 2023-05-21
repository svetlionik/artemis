import React from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

import { ICustomRadioProps, IPossibleYear } from 'boxes/SkillMatrix/types';

import { upsert } from 'dexie/repositories/skills.repository';

import styles from './CustomRadio.module.scss';

const CustomRadioTwo = ({
  skill,
  savedSkills,
  possibleYears,
  updateProgressSkillGroups,
}: ICustomRadioProps) => {
  const { register, getValues } = useFormContext();
  const username = localStorage.getItem('username');

  return (
    <Form className={styles.radioContainer}>
      {possibleYears?.map(
        ({ displayValue, description }: IPossibleYear, index: number) => (
          <Form.Check key={`${username}.year.${index}`} className="px-0 mx-0">
            <Form.Check.Label>
              <Form.Check.Input
                key={skill.id}
                type="radio"
                name={`skills.${skill.id}.years`}
                defaultChecked={
                  !savedSkills
                    ? false
                    : !savedSkills[skill.id]
                    ? false
                    : description === savedSkills[skill.id].years
                }
                ref={register({
                  required: true,
                })}
                value={description}
                onChange={() => {
                  const level = getValues(`skills.${skill.id}.level`) as string;

                  const newSkill = {
                    years: description,
                    level: level ? parseInt(level) : undefined,
                    key: skill.id,
                    username: username || '',
                    isAdditional: false,
                  };

                  upsert(newSkill, skill.id);

                  if (level) updateProgressSkillGroups([skill.id]);
                }}
              />
              <span title={description}>{displayValue}</span>
            </Form.Check.Label>
          </Form.Check>
        ),
      )}
    </Form>
  );
};

export default CustomRadioTwo;
