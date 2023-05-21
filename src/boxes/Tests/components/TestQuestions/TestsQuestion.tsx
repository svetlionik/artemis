import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllQuestionsInfo,
  getQuestion,
  submitQuestionAnswer,
  testStatus,
} from 'store/tests/actions';
import { Redirect, useLocation } from 'react-router-dom';

import SelectQuestion from '../SelectQuestion/SelectQuestion';
import TestHeader from '../TestHeader/TestHeader';
import TestProgressSection from '../TestProgressSection/TestProgressSection';
import FinalQuestionModal from '../FinalQuestionModal/FinalQuestionModal';

import { LocationState } from 'components/types';
import { RootState } from 'store/store';
import { resetQuestionsScroll } from 'shared/services/common';

import { ReactComponent as PreviousQuestionButton } from 'images/arrow-test-right.svg';
import { ReactComponent as NextQuestionButton } from 'images/arrow-test-left.svg';

import styles from './TestQuestion.module.scss';

const TooltipWrapper = (props: any) => {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 150, hide: 400 }}
      overlay={<Tooltip>{props.message}</Tooltip>}>
      {props.children}
    </OverlayTrigger>
  );
};
const TestsQuestion = () => {
  const dispatch = useDispatch();
  const { questions, currentTest, currentQuestion, testsStatus, status } =
    useSelector((state: RootState) => state.tests);
  const location = useLocation<LocationState>();
  let newObject = Object.assign({}, questions.questions);
  let counter = Object.keys(newObject).length;
  const [count, setCount] = useState<number>(0);
  const [currentVal, setCurrentVal] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [clicked, setClicked] = useState([]);
  const [showFinalQuestionModal, setShowFinalQuestionModal] =
    useState<boolean>(false);

  // to prevent copy and paste in test page
  const disableCopyPaste = (e: any) => {
    e.preventDefault();
    return false;
  };

  const clearCurrentVal = () => {
    setCurrentVal([]);
    setClicked([]);
  };
  const toggleQuestions = (direction: string) => {
    direction === 'next'
      ? setCount(count === counter - 1 ? 0 : count + 1)
      : setCount(count === 0 ? counter - 1 : count - 1);
    clearCurrentVal();
    resetQuestionsScroll();
  };

  const handleSubmitQuestion = (e: React.MouseEvent) => {
    setCount(count === counter - 1 ? 0 : count + 1);
    dispatch(
      submitQuestionAnswer({
        id: currentId,
        code: questions.code,
        answer: currentVal,
        answerIndexes: clicked,
      }),
    );
    clearCurrentVal();

    // to trigger last question
    if (count + 1 == questions.questions.length) {
      setShowFinalQuestionModal((prev) => !prev);
    }
  };
  useLayoutEffect(() => {
    clearCurrentVal();
  }, [currentTest]);
  // automatically set questions from arrows
  useEffect(() => {
    setCurrentId(newObject[count]);
  }, [count, newObject]);

  // load first question from the test
  useEffect(() => {
    if (Boolean(currentId?.length)) dispatch(getQuestion(currentId));
    if (Boolean(currentTest.length)) dispatch(getAllQuestionsInfo(currentTest));
  }, [currentId, dispatch, currentTest]);

  // check status of the test on one minute timer
  useEffect(() => {
    const checkStatus = setInterval(() => {
      dispatch(testStatus(currentTest));
    }, 60000);
    return () => {
      clearInterval(checkStatus);
    };
  }, [currentTest, dispatch]);

  useEffect(() => {
    if (testsStatus === 'rejected' || status === 'SUBMITTED') {
      window.location.assign('/tech');
    }
  }, [testsStatus, status]);

  useEffect(() => {
    // Disable right-click
    document.addEventListener('contextmenu', disableCopyPaste);

    document.addEventListener('dragstart', disableCopyPaste);
    document.addEventListener('dropstart', disableCopyPaste);

    function ctrlShiftKey(e: any, keyCode: any) {
      return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
    }

    document.onkeydown = (e: any) => {
      // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
      if (
        e.keyCode === 123 ||
        ctrlShiftKey(e, 'I') ||
        ctrlShiftKey(e, 'J') ||
        ctrlShiftKey(e, 'C') ||
        (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
      )
        return false;
    };
    return () => {
      document.removeEventListener('contextmenu', disableCopyPaste);
      document.removeEventListener('dragstart', disableCopyPaste);
      document.removeEventListener('dropstart', disableCopyPaste);
    };
  }, []);

  return location?.state?.from === '/tests/information' ? (
    <div
      onPaste={disableCopyPaste}
      onCopy={disableCopyPaste}
      className={styles.testQuestionContainer}>
      <FinalQuestionModal
        show={showFinalQuestionModal}
        handleClose={() => setShowFinalQuestionModal((prev) => !prev)}
      />
      <TestHeader />
      <div className={styles.reversedContainer}>
        <div className={styles.questionsContainer}>
          <div className={styles.questionContainer}>
            <div className={styles.question}>
              <SelectQuestion
                count={count}
                question={currentQuestion}
                currentVal={currentVal}
                setCurrentVal={setCurrentVal}
                clicked={clicked}
                setClicked={setClicked}
              />

              <div className={styles.btnContainer}>
                <Button
                  data-testid="submitAnswerButton"
                  disabled={
                    currentVal.find((item) => item !== '') ? false : true
                  }
                  className={`${styles.btn} ${
                    currentVal.find((item) => item !== '')
                      ? ''
                      : styles.disabled
                  }`}
                  onClick={handleSubmitQuestion}>
                  Submit answer & Continue
                </Button>
                <span>
                  <TooltipWrapper message={'Previous question'}>
                    <Button
                      className={styles.arrowBtn}
                      onClick={() => toggleQuestions('previous')}
                      data-testid="prevQuestion">
                      <PreviousQuestionButton />
                    </Button>
                  </TooltipWrapper>
                  <TooltipWrapper message={'Next question'}>
                    <Button
                      className={styles.arrowBtn}
                      onClick={() => toggleQuestions('next')}
                      data-testid="nextQuestion">
                      <NextQuestionButton />
                    </Button>
                  </TooltipWrapper>
                </span>
              </div>
            </div>
          </div>
          <TestProgressSection
            questions={questions}
            count={count}
            setCount={setCount}
            clearCurrentVal={clearCurrentVal}
          />
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/tech" />
  );
};

export default TestsQuestion;
