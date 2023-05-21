import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';

import { SkillGroup } from './components/SkillGroup';
import AdditionalSection from './components/AdditionalSection';
import Finish from './components/Finish';
import SectionProgress from './components/SectionProgress';
import { LoaderWrapper } from 'components/index';

import { userInformation } from 'store/auth/selector';
import loadSavedSkills from 'boxes/SkillMatrix/utils/loadSavedSkills.service';
import { axiosInstance } from 'shared/services/axiosConfig.service';

import { ISavedSkill, ISkillGroup, IProgressSkillGroup } from './types';

import styles from './SkillMatrix.module.scss';
import './SkillMatrix.style.scss';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SkillMatrixForm = () => {
  const user = useSelector(userInformation);

  const history = useHistory();

  const methods = useForm({
    reValidateMode: 'onBlur',
  });

  const [skillGroups, setSkillGroups] = useState<ISkillGroup[]>([]);
  const [progressSkillGroups, setProgressSkillGroups] = useState<
    IProgressSkillGroup[]
  >([]);
  const [savedSkills, setSavedSkills] = useState<ISavedSkill>();
  const [updatedProgressKeys, setUpdatedProgressKeys] = useState<string[]>([]);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const result = await axiosInstance.get<ISkillGroup[]>(
          `${BASE_URL}/api/public/skill-groups`,
        );

        setSkillGroups(result.data);

        if (result.data.length === 0) {
          history.push('/errorpage');
        }
      } catch (err) {
        history.push('/errorpage');
      }
    };

    const getSkillList = async () => {
      const savedSkillList = await loadSavedSkills();

      if (savedSkillList) {
        setSavedSkills(
          savedSkillList.reduce((a, v) => ({ ...a, [v.key]: v }), {}),
        );
      }
    };

    loadSkills();

    getSkillList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const savedSkillKeys = savedSkills
      ? Object.values(savedSkills)
          .filter(
            (savedSkill) =>
              Boolean(savedSkill.level || 1) && Boolean(savedSkill.years),
          )
          .map((savedSkill) => savedSkill.key)
      : [];

    setProgressSkillGroups(
      skillGroups.map((skillGroup) => ({
        order: skillGroup.order,
        name: skillGroup.name,
        count: skillGroup.skills.length,
        completed: skillGroup.skills.every((skill) =>
          savedSkillKeys.includes(skill.id),
        ),
      })),
    );
  }, [savedSkills, skillGroups]);

  const updateProgressSkillGroups = (keys: string[]) => {
    let savedSkillKeys = savedSkills
      ? [
          ...Object.values(savedSkills)
            .filter(
              (savedSkill) =>
                Boolean(savedSkill.level || 1) && Boolean(savedSkill.years),
            )
            .map((savedSkill) => savedSkill.key),
          ...updatedProgressKeys,
          ...keys,
        ]
      : [];

    setUpdatedProgressKeys([...keys, ...updatedProgressKeys]);

    savedSkillKeys = [...new Set(savedSkillKeys)];

    setProgressSkillGroups(
      skillGroups.map((skillGroup) => ({
        order: skillGroup.order,
        name: skillGroup.name,
        count: skillGroup.skills.length,
        completed: skillGroup.skills.every((skill) =>
          savedSkillKeys.includes(skill.id),
        ),
      })),
    );
  };

  return (
    <Row
      className={`g-2 ${styles.formLayout} ${
        user && styles.noPrint
      } mx-0 px-0`}>
      {skillGroups.length ? (
        <>
          <Col
            xl={{
              order: 2,
              span: 3,
            }}
            className={`d-none d-xl-block`}>
            <SectionProgress
              progressSkillGroups={progressSkillGroups}
              newSkills={
                savedSkills
                  ? Object.entries(savedSkills)
                      .filter(([key, value]) => value.isAdditional)
                      .map(([key, value]) => ({
                        ...value,
                      }))
                  : undefined
              }
            />
          </Col>
          <Col
            xl={{
              order: 1,
              span: 9,
            }}
            md={{
              order: 1,
              span: 12,
            }}
            className={styles.col}>
            <FormProvider {...methods}>
              <form
                onSubmit={(e: any) => e.preventDefault()}
                className={`h-auto bg-light ${styles.formComponent}`}
                id="form">
                <h5 className={styles.formType} id="top">
                  Form Type: {user.profile}
                </h5>
                {skillGroups.map((group: ISkillGroup, index: number) => (
                  <SkillGroup
                    key={group.order}
                    group={group}
                    index={index}
                    savedSkills={savedSkills}
                    updateProgressSkillGroups={updateProgressSkillGroups}
                  />
                ))}
                <div id="other">
                  <AdditionalSection
                    sectionLength={skillGroups.length}
                    savedSkills={
                      savedSkills
                        ? Object.entries(savedSkills)
                            .filter(([key, value]) => value.isAdditional)
                            .map(([key, value]) => ({
                              ...value,
                            }))
                        : undefined
                    }
                    possibleYears={skillGroups[0].possibleYears}
                  />
                </div>
                <Finish />
              </form>
            </FormProvider>
          </Col>
        </>
      ) : (
          <LoaderWrapper loading={true} />
      )}
    </Row>
  );
};

export default SkillMatrixForm;
