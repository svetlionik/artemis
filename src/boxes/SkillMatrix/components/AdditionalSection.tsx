import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table } from 'react-bootstrap';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { userInformation } from 'store/auth/selector';
import { deleteOne, upsert } from 'dexie/repositories/skills.repository';
import {
  IAdditionalSectionProps,
  IPossibleYear,
  RadioButtonProps,
} from '../types';
import { toggleAdditionalSection } from 'store/skillsMatrix/actions';

import DATA from 'data/form.json';

import styles from '../SkillMatrix.module.scss';

const AdditionalSection = ({
  sectionLength,
  savedSkills,
  possibleYears,
}: IAdditionalSectionProps): JSX.Element => {
  const username = localStorage.getItem('username');
  const user = useSelector(userInformation);
  const [newSkill, setNewSkill] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const { register, errors, control, getValues } = useFormContext();
  const dispatch = useDispatch();

  const handleNewAddSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(e.target.value);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'test',
  });

  const handleNewField = (e: any) => (event: any) => {
    if (fields.length < 50) {
      if (
        event.code === 'Enter' ||
        event.code === 'NumpadEnter' ||
        event.type === 'blur'
      ) {
        if (/\S/.test(e.name) && e.key !== 'Enter') {
          setNewSkill(e.name.trim().substring(0, 30));
          setIsOpen(false);
          setNewSkill('');
          append({ key: e.name });

          upsert(
            {
              key: e.name,
              username: username || '',
              isAdditional: true,
            },
            e.name,
          );
        }
      }
    } else {
      setIsOpen(false);
    }
  };

  useLayoutEffect(() => {
    if (fields.length !== 0) {
      dispatch(toggleAdditionalSection('yes'));
    } else {
      dispatch(toggleAdditionalSection('no'));
    }
  }, [fields, dispatch]);

  useEffect(() => {
    if (savedSkills) {
      append(savedSkills);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table className={styles.table}>
      <thead>
        <tr>
          <th>
            <p data-testid="category">{sectionLength + 1}. Other</p>
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
        {fields.map((field, index) => (
          <tr
            key={field.key}
            className={
              !errors.test
                ? ''
                : errors.test[`${index}`]
                ? `${styles.emptyField}`
                : `${styles.notEmpty}`
            }>
            <td className={`${styles.field} ${styles.textInput}`}>
              <Form.Group
                className={styles.formGroupExtend}
                data-testid="subcategory">
                <h6
                  onClick={() => {
                    remove(index);

                    deleteOne(field.key);
                  }}
                  data-testid="removeSubcategory">
                  x
                </h6>
                {field.key}
              </Form.Group>
            </td>
            <p className={styles.mobileLevelHeader}>Level of experience</p>
            <td className={styles.radio}>
              {DATA.form.general.map(
                ({ name, val, title }: RadioButtonProps) => (
                  <label>
                    <input
                      key={field.key}
                      type="radio"
                      name={`test[${index}].level`}
                      defaultChecked={val === parseFloat(fields[index].level)}
                      ref={register({
                        required: 'This field is required!',
                        valueAsNumber: true,
                      })}
                      // defaultValue={field.value}
                      value={val}
                      onChange={(e) => {
                        const years = getValues(
                          `test[${index}].years`,
                        ) as string;

                        upsert(
                          {
                            level: val,
                            key: field.key,
                            username: username || '',
                            years: years,
                            isAdditional: true,
                          },
                          field.key,
                        );
                      }}
                    />
                    <span>{name}</span>
                  </label>
                ),
              )}
            </td>
            <td className={styles.years}>
              <p>Years of experience</p>
              <div className={styles.otherDiv}>
                {possibleYears?.map(
                  ({ displayValue, description }: IPossibleYear) => (
                    <label>
                      <input
                        key={field.key}
                        type="radio"
                        name={`test[${index}].years`}
                        defaultChecked={description === fields[index].years}
                        ref={register({
                          required: true,
                        })}
                        value={description}
                        onChange={() => {
                          const level = getValues(
                            `test[${index}].level`,
                          ) as string;

                          upsert(
                            {
                              years: description,
                              level: level ? parseInt(level) : undefined,
                              key: field.key,
                              username: username || '',
                              isAdditional: true,
                            },
                            field.key,
                          );
                        }}
                      />
                      <span>{displayValue}</span>
                    </label>
                  ),
                )}
              </div>
            </td>
          </tr>
        ))}

        {isOpen && fields.length < 50 ? (
          <tr>
            <td className={`${styles.field} ${styles.textInput}`}>
              <Form.Group className={styles.formGroup}>
                <Form.Control
                  className={styles.formInput}
                  placeholder="Your answer"
                  maxLength={30}
                  value={newSkill}
                  onChange={handleNewAddSkill}
                  onBlur={handleNewField({
                    name: newSkill,
                  })}
                  onKeyPress={handleNewField({
                    name: newSkill,
                  })}
                  data-testid="newSubcategoryInput"
                />
              </Form.Group>
            </td>
            <p className={styles.mobileLevelHeader}>Level of experience</p>

            <td className={styles.radio}>
              {DATA.form.general.map(
                ({ id, name, val, title }: RadioButtonProps) => (
                  <label>
                    <input key={id} type="radio" disabled readOnly />
                    <span>{name}</span>
                  </label>
                ),
              )}
            </td>
            <td className={styles.years}>
              <p>Years of experience</p>
              <div className={styles.otherDiv}>
                {DATA.form[
                  user.profile === 'UIUX' ? 'experienceUIUX' : 'experience'
                ].map(({ id, name, val, title }: RadioButtonProps) => (
                  <label>
                    <input key={id} type="radio" disabled readOnly />
                    <span>{name}</span>
                  </label>
                ))}
              </div>
            </td>
          </tr>
        ) : null}
      </tbody>

      <tfoot>
        <tr className="border-0">
          <td colSpan={3} className="border-0">
            <Button
              className={styles.addBtn}
              data-testid="addMoreButton"
              onClick={() => {
                setIsOpen(true);
              }}
              disabled={isOpen || newSkill.length >= 1 || fields.length >= 50}>
              Add more
            </Button>
            {fields.length >= 50 ? (
              <p>You have reached the maximum skills allowed</p>
            ) : null}
          </td>
        </tr>
      </tfoot>
    </Table>
  );
};

export default AdditionalSection;
