import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import Marks from 'components/Marks/Marks';

import DATA from 'data/form.json';

import { IMarks } from 'components/types';
import { ISkillMatrixInfo } from './types';

import styles from './SkillMatrix.module.scss';

const SkillMatrixInfo = ({ setIsCompleted }: ISkillMatrixInfo) => {
  const [marks, setMarks] = useState<IMarks[]>([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
  };
  const handleStartForm = () => {
    setIsCompleted(true);
  };
  const handleOpen = () => {
    window.innerWidth < 780 ? history.push('/skills/marks') : setOpen(true);
  };

  useEffect(() => {
    setMarks(DATA.form.general);
  }, [marks]);

  return (
    <Container className={`${styles.info}`}>
      <Marks evaluationMarks={marks} show={open} handleClose={handleClose} />
      <div className={styles.information}>
        <h1>Skill Matrix</h1>
        <p>
          Please share with us your level of expertise in some key areas and
          technologies in our field. Feel free to add more technologies you have
          experience with.
        </p>
        <p>This data helps us to improve your interview process.</p>
      </div>
      <div className={styles.marksButtonContainer}>
        <p>Take a look at our</p>
        <Button
          className={styles.marksBtn}
          onClick={handleOpen}
          data-testid="marksButton">
          Evaluation marks
        </Button>
      </div>
      <div className={styles.beginButtonContainer}>
        <p>Ready?</p>
        <Button
          className={styles.beginBtn}
          onClick={handleStartForm}
          data-testid="beginButton">
          Let's Begin
        </Button>
      </div>
      <p className={styles.infoFooter}>
        Completing the form should not take more than 15 minutes.
      </p>
    </Container>
  );
};
export default SkillMatrixInfo;
