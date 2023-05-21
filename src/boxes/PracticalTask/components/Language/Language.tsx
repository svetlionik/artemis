import React, { useState } from 'react';

import { ILanguage } from 'boxes/PracticalTask/types';

import ArrowUp from 'images/arrow-up.svg';
import ArrowDown from 'images/arrow-down.svg';

import styles from './Language.module.scss';

const Language = ({ language, setLanguage }: ILanguage) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const handleToggleMenu = () => {
    !open ? setOpen(true) : setOpen(false);
  };

  const handleChangeLanguage = (e: React.MouseEvent) => {
    setText('');
    setLanguage((e.target as HTMLInputElement).innerText);
    setOpen(false);
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value);
  };

  const handleOtherLanguage = () => {
    setLanguage('other');
    setOpen(false);
    setText('other');
  };

  const array = ['JavaScript', 'Java', 'Kotlin', 'C#', 'Typescript', 'Python'];
  return (
    <div className={styles.language}>
      <div className={styles.middleLine}></div>
      <div>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Language</h2>
          <p className={styles.output} onClick={handleToggleMenu}>
            {language === '' ? (
              <p className={styles.text}>Please select</p>
            ) : array.includes(language) ? (
              <p className={styles.text}>{language}</p>
            ) : (
              <p className={styles.text}>Other</p>
            )}
            {open ? (
              <div className={styles.menu}>
                {array.map((item: string) => (
                  <p className={styles.option} onClick={handleChangeLanguage}>
                    {item}
                  </p>
                ))}
                <p className={styles.option} onClick={handleOtherLanguage}>
                  Other
                </p>
              </div>
            ) : null}
            {!open ? (
              <img src={ArrowDown} alt="arrow down" />
            ) : (
              <img src={ArrowUp} alt="arrow up" />
            )}
          </p>
        </div>
      </div>
      {text === 'other' ? (
        <div className={styles.inputContainer}>
          <h2 className={styles.title}>Other Language</h2>
          <input
            type="text"
            className={styles.inputField}
            data-testid="languageInput"
            onChange={handleInputValue}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Language;
