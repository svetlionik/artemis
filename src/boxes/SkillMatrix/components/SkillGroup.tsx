import { useFormContext } from 'react-hook-form';
import { Table } from 'react-bootstrap';

import { ISkill, ISkillGroupProps } from '../types';
import SkillGroupItem from './SkillGroupItem';

import { bulkUpsert } from 'dexie/repositories/skills.repository';

import SkipIcon from 'images/skip-icon.svg';

import styles from '../SkillMatrix.module.scss';
import '../SkillMatrix.style.scss';

export function SkillGroup({
  group,
  index,
  savedSkills,
  updateProgressSkillGroups,
}: ISkillGroupProps): JSX.Element | null {
  const { setValue } = useFormContext();
  const username = localStorage.getItem('username');

  const handleSkip = () => {
    group.skills.forEach((skill: ISkill) => {
      setValue(`skills.${skill.id}.level`, '0');
      setValue(`skills.${skill.id}.years`, group?.possibleYears[0].description);
    });

    bulkUpsert(
      group.skills.map((skill) => ({
        level: 0,
        key: skill.id,
        username: username || '',
        years: group?.possibleYears[0].description,
        isAdditional: false,
      })),
      group.skills.map((skill) => skill.id),
    );

    updateProgressSkillGroups(group.skills.map((skill) => skill.id));
  };

  function formattedGroupName(groupName: string) {
    return groupName.length > 30
      ? groupName.substring(0, 30) + '...'
      : groupName;
  }

  return group.skills[0].type === 'STANDARD' ? (
    <div id={group.name.toLowerCase().split(' ').join('')}>
      <Table className={styles.table}>
        <thead>
          <tr>
            <th>
              <p data-testid="category">
                {index + 1}. {formattedGroupName(group.name)}
              </p>
              {group.skippable ? (
                <p className={styles.skipButton} onClick={handleSkip}>
                  <img src={SkipIcon} alt="skip-icon" />
                  Skip
                </p>
              ) : null}
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
          {group.skills.map((skill: ISkill) => (
            <SkillGroupItem
              key={skill.id}
              skill={skill}
              groupName={group.name}
              savedSkills={savedSkills}
              possibleYears={group.possibleYears}
              updateProgressSkillGroups={updateProgressSkillGroups}
            />
          ))}
        </tbody>
      </Table>
    </div>
  ) : null;
}
