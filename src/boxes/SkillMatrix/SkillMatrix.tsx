import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import SkillMatrixInfo from './SkillMatrixInfo';
import SkillMatrixForm from './SkillMatrixForm';
import SkillMatrixSubmission from './SkillMatrixSubmission';

import { axiosInstance } from 'shared/services/axiosConfig.service';
import { userInformation } from 'store/auth/selector';

import styles from './SkillMatrix.module.scss';
import { Redirect } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const SkillMatrix = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const user = useSelector(userInformation);

  useEffect(() => {
    const loadSkills = async () => {
      const result = await axiosInstance.get(
        `${BASE_URL}/api/public/skill-submissions/exists`,
      );
      if (result.data === true) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(false);
      }
    };
    loadSkills();
  }, []);

  return user.hasSkillRequirement ? (
    <Container className={` ${styles.form}`} fluid>
      {!isCompleted && !isSubmitted ? (
        <SkillMatrixInfo setIsCompleted={setIsCompleted} />
      ) : !isCompleted && isSubmitted ? (
        <SkillMatrixSubmission />
      ) : (
        <SkillMatrixForm />
      )}
    </Container>
  ) : (
    <Redirect to="/home" />
  );
};

export default SkillMatrix;
