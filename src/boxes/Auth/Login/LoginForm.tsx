import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ILoginFormProps } from '../types';

import styles from './Login.module.scss';

const LoginForm = ({ onSubmit, status }: ILoginFormProps) => {
  const { register, handleSubmit, errors, control, formState } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    reValidateMode: 'onBlur',
  });

  const currentYear = new Date().getFullYear();

  return (
    <Row className="g-1 d-flex justify-content-center">
      <Col
        xl={{ order: 1, span: 3 }}
        lg={{ order: 1, span: 5 }}
        md={{ order: 1, span: 6 }}
        xs={{ order: 1, span: 11 }}>
        <Form className={`${styles.form} bg-light  py-1`}>
          <Form.Group
            className={`${styles.formGroup} form-group col mb-2 mt-2 text-secondary`}
            controlId="formBasicEmail">
            <Form.Label
              className={`${styles.label} col-3 col-form-label h6 text-secondary text-start`}>
              Username:
            </Form.Label>

            <div className={`${styles.inputDiv} col-sm-8`}>
              <Controller
                name="username"
                control={control}
                render={({ onChange, value, name }) => (
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name={name}
                    className={`${styles.formControl}  text-secondary ${
                      errors.username || status !== '' ? styles.errorField : ''
                    }`}
                    value={value}
                    ref={register({
                      required: 'This field is required!',
                    })}
                    onChange={onChange}
                  />
                )}
              />
              <Form.Text className={styles.errorMsg}>
                {errors.username && errors.username.message}
              </Form.Text>
            </div>
          </Form.Group>
          <Form.Group
            className={`${styles.formGroup} form-group col mb-2 mt-2`}
            controlId="formBasicPassword">
            <Form.Label
              className={`${styles.label} col-3 col-form-label h6 text-secondary text-start`}>
              Password:
            </Form.Label>
            <div className={`${styles.inputDiv} col-sm-8`}>
              <Controller
                name="password"
                control={control}
                render={({ onChange, value, name }) => (
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name={name}
                    className={`${styles.formControl}  text-secondary ${
                      errors.password || status !== '' ? styles.errorField : ''
                    }`}
                    value={value}
                    ref={register({
                      required: 'This field is required!',
                    })}
                    onChange={onChange}
                  />
                )}
              />
              <Form.Text className={styles.errorMsg}>
                {errors.password && errors.password.message}
              </Form.Text>
            </div>
          </Form.Group>
          <div className=" text-center">
            <Button
              className={`${styles.loginBtn} btn bg-white text-primary mb-2 mt-2`}
              variant="primary"
              disabled={formState.isSubmitting}
              onClick={handleSubmit(onSubmit)}
              onKeyPress={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                  handleSubmit(onSubmit);
                }
              }}
              autoFocus
              type="submit"
              data-testid="loginButton">
              Login
            </Button>
          </div>

          <div className={`text-secondary ${styles.bottomText}`}>
            <p>© Musala Soft JSC {currentYear}</p>
            <br />
            <span>
              <Link
                className={styles.links}
                to={{ pathname: 'https://www.musala.com/policies/gdpr/' }}
                target="_blank">
                Privacy Policy
              </Link>
            </span>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;
