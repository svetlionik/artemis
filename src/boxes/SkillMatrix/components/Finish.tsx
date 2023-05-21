import { useEffect, useState } from 'react';
import { Button, Container, Table, Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { Loader, Toasts } from 'components/index';
import { axiosInstance } from 'shared/services/axiosConfig.service';
import loadSavedSkills from '../utils/loadSavedSkills.service';
import deleteSavedSkills from '../utils/deleteSavedSkills.service';

import styles from '../SkillMatrix.module.scss';

import {
  ISkillsPostRequestBody,
  ISkillsPostRequestBodyAdditionalSkill,
  ISkillsPostRequestBodySkills,
} from '../types';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Finish = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const { handleSubmit, trigger, errors } = useFormContext();

  const handleOpen = async () => {
    const savedSkills = await loadSavedSkills();
    trigger();
    setIsLoading(true);

    let skills: ISkillsPostRequestBodySkills = {};
    let additionalSkills: ISkillsPostRequestBodyAdditionalSkill[] = [];

    if (savedSkills && savedSkills.length) {
      savedSkills.forEach((skill) => {
        if (skill.isAdditional) {
          additionalSkills.push({
            name: skill.key,
            level: skill.level || 0,
            years: skill.years || '',
          });
        } else {
          skills[skill.key] = {
            level: skill.level || 0,
            years: skill.years || '',
          };
        }
      });
    }

    try {
      await axiosInstance
        .post<ISkillsPostRequestBody>(
          `${BASE_URL}/api/public/skill-submissions`,
          {
            skills: skills,
            additionalSkills: additionalSkills,
          },
        )
        .then(() => {
          deleteSavedSkills();
        });

      setIsSuccess(true);
      setIsError(false);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
      setIsSuccess(false);
      setErrorMessage('Please try again after some time.');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsError(false);
  };

  const toggleIsCheck = () => {
    !isChecked ? setIsChecked(true) : setIsChecked(false);
  };

  useEffect(() => {
    if (isSuccess) {
      history.push('/skills/success', { from: 'skills' });
    }
  }, [history, isSuccess]);

  return (
    <>
      <Toasts
        errorMsg={errorMessage}
        show={isError}
        handleClose={handleClose}
      />
      {isLoading ? <Loader /> : null}
      <Table className={styles.row}>
        <thead>
          <tr>
            <th>
              <p>Submit</p>
            </th>
          </tr>
        </thead>
      </Table>
      <Container className={styles.finishDiv}>
        <h6>
          Looks like you are done with the Skill Form.
          <br />—
        </h6>
        <p>Before you go…</p>
        <div className={styles.start}>
          <p className={styles.first}>
            Do you want to take a final look at your answers?
          </p>
          <p className={styles.link}>
            Yes, take me <a href="#top">to the beginning</a> of the form
          </p>
        </div>
        <div className={styles.submit}>
          <p className={styles.text}>No, I would like to submit the form</p>
          <Container className={styles.policy}>
            <Form.Check className={styles.formCheck}>
              <Form.Check.Input
                type="checkbox"
                checked
                readOnly
                className={`${styles.formCheckInput} ${styles.default}`}
              />
              <Form.Check.Label className={styles.formCheckLabel}>
                I acknowledge that the data submitted by me can be sent to a
                third party for job opportunities.
              </Form.Check.Label>
            </Form.Check>
            <Form.Check className={styles.formCheck}>
              <Form.Check.Input
                type="checkbox"
                onClick={toggleIsCheck}
                className={styles.formCheckInput}
                id="policyCheck"
              />
              <Form.Check.Label className={styles.formCheckLabel}>
                I have read and agree to the{' '}
                <Link
                  className={styles.policyLink}
                  to={{
                    pathname: 'https://www.musala.com/policies/gdpr/',
                  }}
                  target="_blank">
                  Musala Soft Privacy Policy
                </Link>
                .
              </Form.Check.Label>
            </Form.Check>
          </Container>
          <Button
            data-testid="submitButton"
            className={styles.submitBtn}
            onClick={handleSubmit(handleOpen)}
            disabled={!isChecked}>
            Submit
          </Button>
          <Form.Control.Feedback
            className={styles.submitError}
            data-testid="emptyFields">
            {Object.keys(errors).length === 0
              ? null
              : ' Empty fields in the form!'}
          </Form.Control.Feedback>
        </div>
      </Container>
    </>
  );
};

export default Finish;
