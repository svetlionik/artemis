import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CustomRadio, CustomRadioTwo } from 'components/index';

import { ISavedSkill, ISkillGroupItemProps } from '../types';
import { Skill } from 'dexie/models/Skill';

import { ExperienceLevel } from '../enums';

import '../SkillMatrix.style.scss';
import styles from '../SkillMatrix.module.scss';

const SkillGroupItem = ({
  skill,
  savedSkills,
  possibleYears,
  updateProgressSkillGroups,
}: ISkillGroupItemProps): JSX.Element => {
  const { errors } = useFormContext();

  const [savedSkillsCopy, setSavedSkillsCopy] = useState<ISavedSkill>({
    ...savedSkills,
  });

  const updateSavedSkill = (savedSkill: Skill, key: string) => {
    setSavedSkillsCopy({ ...savedSkillsCopy, [key]: savedSkill });
  };

  function getExperienceLevel(skillName: string): JSX.Element | null {
    if (savedSkillsCopy) {
      const skillItemLevel = savedSkillsCopy[skillName]
        ? savedSkillsCopy[skillName].level || null
        : null;

      return skillItemLevel ? (
        <p className={styles.label}>{ExperienceLevel[skillItemLevel]}</p>
      ) : null;
    }

    return null;
  }

  return (
    <tr
      key={skill.id}
      className={
        !errors.skills
          ? ''
          : errors.skills[`${skill.id}`]
          ? `${styles.emptyField}`
          : `${styles.notEmpty}`
      }>
      <td className={styles.field} data-testid="subcategory">
        <p>{skill.name} </p>
        <h6 className={styles.description}>{skill.description}</h6>
      </td>

      <p className={styles.mobileLevelHeader}>Level of experience</p>
      <td className={styles.radio}>
        <CustomRadio
          updateSavedSkill={updateSavedSkill}
          skill={skill}
          savedSkills={savedSkills}
          possibleYears={possibleYears}
          updateProgressSkillGroups={updateProgressSkillGroups}
        />
      </td>
      <p className={styles.mobileLevelHeader}>{getExperienceLevel(skill.id)}</p>
      <td className={styles.years}>
        {' '}
        <p>Years of experience</p>
        <CustomRadioTwo
          // updateSavedSkill={updateSavedSkill}
          skill={skill}
          savedSkills={savedSkills}
          possibleYears={possibleYears}
          updateProgressSkillGroups={updateProgressSkillGroups}
        />
      </td>
    </tr>
  );
};

export default SkillGroupItem;
