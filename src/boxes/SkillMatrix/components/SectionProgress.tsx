import { Container, Figure } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Loader } from 'components';

import { RootState } from 'store/store';

import {
  IAdditionalSavedSkill,
  IAdditionalSubbmitedSkill,
  IProgressSkillGroup,
} from '../types';

import styles from '../SkillMatrix.module.scss';

const SectionProgress = ({
  progressSkillGroups,
  additionalFieldsToMap,
  newSkills,
}: {
  progressSkillGroups: IProgressSkillGroup[];
  additionalFieldsToMap?: IAdditionalSubbmitedSkill[];
  newSkills?: IAdditionalSavedSkill[];
}) => {
  const number = progressSkillGroups.length;
  const { activeSection } = useSelector(
    (state: RootState) => state.skillMatrix,
  );

  return progressSkillGroups.length === 0 ? (
    <Loader />
  ) : (
    <>
      <h5 className={styles.sectionTitle}>Categories</h5>
      <Container
        className={`my-2 ${styles.sectionProgress} ${styles.borderLine} d-flex flex-direction-column justify-content-between`}>
        {progressSkillGroups.map(
          (section: IProgressSkillGroup, index: number) => (
            <Figure
              className={`${section.completed ? styles.active : styles.inactive}
         d-flex flex-direction-row`}
              key={section.order}>
              <p></p>

              <Figure.Caption className={styles.sectionCaption}>
                <h6>
                  {index + 1}.{' '}
                  <a
                    href={`#${section.name.toLowerCase().split(' ').join('')}`}>
                    {section.name}
                  </a>
                </h6>
              </Figure.Caption>
            </Figure>
          ),
        )}
        {additionalFieldsToMap?.length !== 0 ? (
          <Figure
            className={`${
              activeSection === 'yes' ? styles.active : styles.inactive
            }
       d-flex flex-direction-row`}>
            <p></p>

            <Figure.Caption className={styles.sectionCaption}>
              <h6>
                {number + 1}. <a href={`#other`}>Other</a>
              </h6>
            </Figure.Caption>
          </Figure>
        ) : null}
      </Container>
    </>
  );
};

export default SectionProgress;
