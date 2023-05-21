import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

import { IResetPasswordProps } from '../types';

import styles from './ResetPassword.module.scss';

const ResetPasswordForm = ({ onSubmit, status }: IResetPasswordProps) => {
  const { register, handleSubmit, errors, control, trigger, getValues } =
    useForm({
      defaultValues: {
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
      },
      reValidateMode: 'onBlur',
    });

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Row className="g-1 d-flex justify-content-center">
      <Col
        xl={{ order: 1, span: 3 }}
        lg={{ order: 1, span: 5 }}
        md={{ order: 1, span: 6 }}
        xs={{ order: 1, span: 11 }}>
        <Form
          className={`${styles.form} h-100  py-1`}
          onKeyPress={(e) => {
            e.key === 'Enter' ? handleSubmit(onSubmit) : void null;
          }}>
          <Form.Group
            className={`${styles.formGroup} form-group col`}
            controlId="formBasicPassword">
            <Form.Label
              className={`${styles.label} col-3 col-form-label h6 text-start`}>
              Current Password:
            </Form.Label>
            <div className={`${styles.inputDiv} col-sm-8`}>
              <Controller
                name="oldPassword"
                control={control}
                render={({ onChange, value, name }) => (
                  <Form.Control
                    type="password"
                    placeholder="Current Password"
                    name={name}
                    className={`${styles.formControl} ${
                      errors.oldPassword || status === 'rejected'
                        ? styles.errorField
                        : ''
                    }`}
                    value={value}
                    ref={register({
                      required: 'This field is required!',
                      minLength: {
                        value: 8,
                        message: 'Password minimum - 8 characters.',
                      },
                      maxLength: {
                        value: 50,
                        message: 'Password limitation - 50 characters.',
                      },
                    })}
                    onChange={onChange}
                  />
                )}
              />
              <Form.Text className={styles.errorMsg}>
                {errors.oldPassword && errors.oldPassword.message}
              </Form.Text>
            </div>
          </Form.Group>
          <div className={styles.middleLine}></div>
          <Form.Group
            className={`${styles.formGroup} form-group col`}
            controlId="formBasicPassword">
            <Form.Label
              className={`${styles.label} col-3 col-form-label h6 text-start`}>
              New Password:
            </Form.Label>
            <div className={`${styles.inputDiv} col-sm-8`}>
              <Controller
                name="newPassword"
                control={control}
                render={({ onChange, value, name }) => (
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name={name}
                    className={`${styles.formControl} ${
                      errors.newPassword || status === 'rejected'
                        ? styles.errorField
                        : ''
                    }`}
                    value={value}
                    ref={register({
                      required: 'This field is required!',
                      minLength: {
                        value: 8,
                        message: 'Password minimum - 8 characters.',
                      },
                      maxLength: {
                        value: 50,
                        message: 'Password limitation - 50 characters.',
                      },
                    })}
                    onChange={onChange}
                  />
                )}
              />
              <Form.Text className={styles.errorMsg}>
                {errors.newPassword && errors.newPassword.message}
              </Form.Text>
            </div>
          </Form.Group>
          <Form.Group
            className={`${styles.formGroup} form-group col`}
            controlId="formBasicPassword">
            <Form.Label
              className={`${styles.label} col-3 col-form-label h6 text-start`}>
              Repeat Password:
            </Form.Label>
            <div className={`${styles.inputDiv} col-sm-8`}>
              <Controller
                name="repeatPassword"
                control={control}
                render={({ onChange, value, name }) => (
                  <Form.Control
                    type="password"
                    placeholder="Repeat Password"
                    name={name}
                    className={`${styles.formControl} ${
                      errors.repeatPassword || status === 'rejected'
                        ? styles.errorField
                        : ''
                    }`}
                    value={value}
                    ref={register({
                      required: 'This field is required!',
                      minLength: {
                        value: 8,
                        message: 'Password minimum - 8 characters.',
                      },
                      maxLength: {
                        value: 50,
                        message: 'Password limitation - 50 characters.',
                      },
                      validate: (v: string) =>
                        v === getValues().newPassword ||
                        'Passwords do not match.',
                    })}
                    onChange={onChange}
                  />
                )}
              />
              <Form.Text className={styles.errorMsg}>
                {errors.repeatPassword && errors.repeatPassword.message}
              </Form.Text>
            </div>
          </Form.Group>
          <div className=" text-center">
            <Button
              className={`${styles.resetBtn} btn mb-2 mt-2`}
              disabled={status === 'loading'}
              onClick={handleSubmit(onSubmit)}
              type="submit"
              data-testid="resetButton">
              Change
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default ResetPasswordForm;
