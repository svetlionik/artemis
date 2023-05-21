import React from 'react';
import { Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

import { upsert } from 'dexie/repositories/skills.repository';

import { ICustomRadioProps } from 'boxes/SkillMatrix/types';
import { IRadioButton } from 'components/types';

import DATA from 'data/form.json';

import 'boxes/SkillMatrix/SkillMatrix.style.scss';

const CustomRadio = ({
  skill,
  savedSkills,
  possibleYears,
  updateSavedSkill,
  updateProgressSkillGroups,
}: ICustomRadioProps) => {
  const { register, setValue, getValues } = useFormContext();
  const username = localStorage.getItem('username');

  return (
    <Form className="radioContainer">
      {DATA.form.general.map(
        ({ id, val, title, name }: IRadioButton, index: number) => (
          <Form.Check key={id} className="px-0 mx-0">
            <Form.Check.Label>
              <Form.Check.Input
                key={skill.id}
                type="radio"
                name={`skills.${skill.id}.level`}
                defaultValue={val}
                defaultChecked={
                  !savedSkills
                    ? false
                    : !savedSkills[skill.id]
                    ? false
                    : val === savedSkills[skill.id].level
                }
                value={val}
                onClick={(e) => {
                  if ((e.target as HTMLInputElement).defaultValue === '0') {
                    setValue(
                      `skills.${skill.id}.years`,
                      possibleYears![0].description,
                    );
                  }
                }}
                ref={register({ required: true })}
                onChange={(e) => {
                  const years = getValues(`skills.${skill.id}.years`) as string;

                  const newSkill = {
                    level: val,
                    key: skill.id,
                    username: username || '',
                    years:
                      e.target.defaultValue === '0'
                        ? possibleYears![0].description
                        : years,
                    isAdditional: false,
                  };

                  upsert(newSkill, skill.id);

                  if (years) updateProgressSkillGroups([skill.id]);

                  if (updateSavedSkill) {
                    updateSavedSkill(newSkill, skill.id);
                  }
                }}
              />
              <span title={title}>{name}</span>
            </Form.Check.Label>
          </Form.Check>
        ),
      )}
    </Form>
  );
};

export default CustomRadio;
