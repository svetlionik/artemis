import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { ISubmittedAnswer, ITestResult, Score } from 'boxes/Tests/interfaces';

import Correct from 'images/check-circle-outline.svg';
import Wrong from 'images/cancel.svg';

import styles from './TestsAnonymous.module.scss';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const DEFAULT = 'DEFAULT';

const TestsAnonymous = () => {
  const [testResults, setTestResults] = useState<ITestResult>();
  const [testScore, setTestScore] = useState<Score | any>({});
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  let pathname = window.location.pathname;
  let subId_TestId = pathname.split('/').pop();
  let hash = encodeURIComponent(window.location.hash);

  const history = useHistory();

  const loadTestSubmission = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/api/public/test-submissions/anonymous/${
          subId_TestId + hash
        }`,
      );
      if (result.data.submittedAt) {
        setTestResults(result.data);
        setTestScore(result.data?.score);
      } else {
        throw Error;
      }
    } catch (err) {
      history.push('/errorpage');
    }
  };

  useLayoutEffect(() => {
    loadTestSubmission();
  }, []);

  useEffect(() => {
    let newMinutes: number;
    let newSeconds: number;
    if (testResults) {
      newMinutes = Math.floor(testResults?.finishedSeconds / 60);
      newSeconds = testResults?.finishedSeconds % 60;
      setMinutes(newMinutes);
      setSeconds(newSeconds);
    }
  }, [testResults]);

  return (
    <Container className={`g-2 ${styles.testsLayout}`}>
      <div className={styles.title}>
        <span>
          <h2>Total Score</h2>
          <h5>{testScore?.DEFAULT?.percentage}%</h5>
        </span>
        <span>
          <h2> Time Spent </h2>
          <h5>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}min
          </h5>
        </span>
      </div>
      <div className={styles.divider}></div>
      <span className={styles.scoreContainer}>
        {Object.keys(testScore).length > 0 &&
          Object.keys(testScore).map((key, index) => {
            if (key != DEFAULT)
              return (
                <div key={index}>
                  <p
                    className={`${
                      testScore[key].percentage > 25 &&
                      testScore[key].percentage < 75
                        ? styles.middle
                        : testScore[key].percentage > 75
                        ? styles.high
                        : styles.low
                    }`}>
                    {key}: {testScore[key].percentage}%
                  </p>
                </div>
              );
          })}
      </span>
      {testResults?.answers.map((item: ISubmittedAnswer, index: number) => {
        let isCorrectAnswer =
          item.answerType == 'CHOICE'
            ? JSON.stringify(item.correctAnswers) ==
              JSON.stringify(item.userAnswers)
            : JSON.stringify(item.correctAnswers).replace(/ /g, '') ==
              JSON.stringify(item.userAnswers).replace(/ /g, '');
        return item.answerType == 'CHOICE' ? (
          <Container
            className={`${styles.testQuestionCard} ${
              isCorrectAnswer ? styles.correct : styles.wrong
            }`}>
            <h5>
              {index + 1}. {item.title}
            </h5>
            <p>{item.description}</p>
            <div className={styles.imgContainer}>
              <img src={item?.imageUrl} className={styles.questionImg} alt="" />
            </div>
            <Form key={item.id}>
              {item.answers.map((answer, index: number) => {
                let inputStyle = item?.userAnswers?.includes(answer)
                  ? styles.checked
                  : styles.notChecked;
                let correctStyle =
                  item?.userAnswers?.includes(answer) ===
                  item?.correctAnswers.includes(answer)
                    ? styles.correctOne
                    : '';
                let wrongStyle =
                  item?.userAnswers?.includes(answer) !==
                  item?.correctAnswers.includes(answer)
                    ? styles.wrongOne
                    : '';
                return (
                  <div
                    className={`${styles.radioGroup} ${inputStyle} ${correctStyle} ${wrongStyle}`}>
                    <label className={`w-100`}>
                      <input disabled type="radio" className={inputStyle} />
                      <span className={styles.radioSpan}></span>
                      <p>{answer}</p>
                      {item?.correctAnswers?.includes(answer) && (
                        <div className={styles.imgContainer}>
                          <img src={Correct} width="32px" height={'32px'} />
                        </div>
                      )}
                      {item?.userAnswers !== null &&
                      item?.userAnswers?.includes(answer) !==
                        item?.correctAnswers?.includes(answer) &&
                      !item?.correctAnswers?.includes(answer) ? (
                        <div className={styles.imgContainer}>
                          <img src={Wrong} width="32px" height={'32px'} />
                        </div>
                      ) : null}
                    </label>
                  </div>
                );
              })}
            </Form>
          </Container>
        ) : (
          <Container
            className={`${styles.testQuestionCard} ${
              isCorrectAnswer ? styles.correct : styles.wrong
            }`}>
            <h5>
              {index + 1}. {item.title}
            </h5>
            <p>{item.description}</p>
            <div className={styles.imgContainer}>
              <img src={item?.imageUrl} className={styles.questionImg} alt="" />
            </div>
            <div className={styles.fillInAnswersContainer}>
              <p onClick={() => console.log(item)}>Answer : </p>
              {item.userAnswers?.map((item: string[], index: number) => {
                return <p key={index}>{item}</p>;
              })}
            </div>
            <div className={styles.fillInAnswersContainer}>
              <p>Correct Answer : </p>
              {item.correctAnswers?.map((item: string[], index: number) => {
                return <p key={index}>{item}</p>;
              })}
            </div>
          </Container>
        );
      })}
    </Container>
  );
};

export default TestsAnonymous;
