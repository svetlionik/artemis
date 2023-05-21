import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Section from './components/Section';
import OtherSection from './components/OtherSection';
import { LoaderWrapper } from 'components/index';

import { RootState } from 'store/store';

import { ISectionSkills } from './types';

import styles from './SkillMatrix.module.scss';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SkillMatrixAnnonymous = () => {
  const [fieldsToMap, setFieldsToMap] = useState<ISectionSkills[]>([]);
  const [possibleYears, setPossibleYears] = useState([]);
  const [additionalFieldsToMap, setAdditionalFieldsToMap] = useState([]);
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadSkills = async () => {
      let pathname = window.location.pathname;
      let userSub = pathname.split('/').pop();
      try {
        const result = await axios.get(
          `${BASE_URL}/api/public/skill-submissions/anonymous/${userSub}`,
        );
        setFieldsToMap(result.data.skillGroups);
        setPossibleYears(result.data.possibleYears);
        setAdditionalFieldsToMap(result.data.additionalGroup.skills);
      } catch (err) {
        history.push('/errorpage');
      }
    };
    loadSkills();
  }, [history]);

  return (
    <Row
      className={`g-2 ${styles.formLayout} ${
        user && styles.noPrint
      } mx-0 px-0`}>
      {fieldsToMap.length === 0 ? (
        <LoaderWrapper loading={true} />
      ) : (
        <>
          <Col
            xl={{ order: 1, span: 12 }}
            md={{ order: 1, span: 12 }}
            className={styles.col}>
            <div className={`h-auto bg-light ${styles.formComponent}`}>
              {fieldsToMap.map((categories, index: number) => (
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
              <div id="other">
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

export default SkillMatrixAnnonymous;
