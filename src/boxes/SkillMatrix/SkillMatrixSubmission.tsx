import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SectionProgress from './components/SectionProgress';
import Section from './components/Section';
import OtherSection from './components/OtherSection';
import { LoaderWrapper } from 'components/index';

import { axiosInstance } from 'shared/services/axiosConfig.service';

import { RootState } from 'store/store';

import { ISectionSkills } from './types';

import styles from './SkillMatrix.module.scss';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SkillMatrixSubmission = () => {
  const [fieldsToMap, setFieldsToMap] = useState<ISectionSkills[]>([]);
  const [additionalFieldsToMap, setAdditionalFieldsToMap] = useState([]);
  const [possibleYears, setPossibleYears] = useState([]);
  const [dateSubmit, setDateSubmit] = useState('');
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const result = await axiosInstance.get(
          `${BASE_URL}/api/public/skill-submissions`,
        );
        setFieldsToMap(result.data.skillGroups);
        setAdditionalFieldsToMap(result.data.additionalGroup.skills);
        setPossibleYears(result.data.possibleYears);
        setDateSubmit(result.data.submittedAt);
      } catch (err) {
        history.push('/errorpage');
      }
    };
    loadSkills();
  }, []);

  return (
    <Row
      className={`g-2 ${styles.formLayout} ${
        user && styles.noPrint
      } mx-0 px-0`}>
      {fieldsToMap.length === 0 || !additionalFieldsToMap ? (
        <LoaderWrapper loading={ true}/>
      ) : (
        <>
          <Col xl={{ order: 2, span: 3 }} className="d-none d-xl-block">
            <SectionProgress
              progressSkillGroups={fieldsToMap.map((field) => ({
                name: field.name,
                order: field.order,
                count: field.skills.length,
                completed: true,
              }))}
              additionalFieldsToMap={additionalFieldsToMap}
            />
          </Col>
          <Col
            xl={{ order: 1, span: 9 }}
            md={{ order: 1, span: 12 }}
            className={styles.col}>
            <div className={`h-auto bg-light ${styles.formComponent}`}>
              <h5 className={styles.formType}>
                Your form has been successfully submitted on:{' '}
                {dateSubmit.slice(0, 10)}
              </h5>
              {fieldsToMap.map((categories, index) => (
                <div
                  id={categories.name.toLowerCase().split(' ').join('')}
                  key={categories.name}>
                  <Section
                    skills={categories}
                    index={index}
                    possibleYears={possibleYears}
                  />
                </div>
              ))}
              <div id={additionalFieldsToMap?.length != 0 ? 'other' : ''}>
                <OtherSection
                  skills={additionalFieldsToMap}
                  index={fieldsToMap.length}
                  possibleYears={possibleYears}
                />
              </div>
            </div>
          </Col>
        </>
      )}
    </Row>
  );
};

export default SkillMatrixSubmission;
