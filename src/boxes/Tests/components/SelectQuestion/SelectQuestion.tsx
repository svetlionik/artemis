import { useLayoutEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { LoaderWrapper } from 'components';

import { RootState } from 'store/store';
import { QuestionInfo, SelectQuestionProps } from 'boxes/Tests/interfaces';

import styles from './SelectQuestion.module.scss';

const SelectQuestion = ({
  question,
  currentVal,
  setCurrentVal,
  clicked,
  setClicked,
  count,
}: SelectQuestionProps) => {
  const { questionStatus, currentQuestionsInfo, currentQuestion } = useSelector(
    (state: RootState) => state.tests,
  );
  const tests = useSelector((state: RootState) => state.tests);
  let answerIndexes = tests.currentAnswers.find(
    (item: QuestionInfo) => item.questionId === currentQuestion.id,
  )?.answerIndexes;

  useLayoutEffect(() => {
    setClicked(answerIndexes || []);
  }, [answerIndexes, setClicked]);

  useLayoutEffect(() => {
    if (currentQuestionsInfo.length === 0) {
      return;
    } else if (
      currentQuestionsInfo.find(
        (quest: QuestionInfo) => quest.questionId === question?.id,
      ) === undefined
    ) {
      return;
    } else if (
      currentQuestionsInfo.find(
        (quest: QuestionInfo) => quest.questionId === question?.id,
      ).answers
    ) {
      setCurrentVal(
        currentQuestionsInfo.find(
          (quest: QuestionInfo) => quest.questionId === question?.id,
        ).answers,
      );
    } else {
      return;
    }
  }, [currentQuestionsInfo, setCurrentVal, question?.id]);

  const submitQuestion = (val: QuestionInfo, index: number) => {
    if (question?.correctAnswersCount === 1) {
      setCurrentVal([val]);
      setClicked([index]);
    } else {
      let isAnswerExist = currentVal.some(
        (answer: QuestionInfo) => answer === val,
      );
      if (isAnswerExist) {
        setCurrentVal(
          currentVal.filter((answer: QuestionInfo) => answer !== val),
        );
        setClicked(clicked.filter((item: any) => item !== index));
      } else {
        setClicked((prev: string[]) => [...prev, index]);
        setCurrentVal((prev: string[]) => [...prev, val]);
      }
    }
  };
  let questionNumber = count + 1;

  if (question?.answerType === 'CHOICE') {
    return questionStatus === 'loading' ? (
      <LoaderWrapper loading={true} />
    ) : (
      <div className={styles.table}>
        <h5 className={styles.title}>
          {questionNumber}. {question?.title}
        </h5>
        {question?.description ? (
          <p className={styles.description}>{question?.description}</p>
        ) : null}
        <h6 className={styles.subtitle}>
          Pick {question?.correctAnswersCount === 1 ? 'ONE' : 'TWO'} option:
        </h6>
        <img src={question?.imageUrl} alt="" />
        <Form key={question.id}>
          {question?.answers.map((answer, index: number) => (
            <div
              className={
                styles.radioGroup +
                ' ' +
                (clicked.some((item: any) => item === index)
                  ? styles.clicked
                  : '') +
                ' ' +
                (currentVal.length === 0
                  ? styles.notChecked
                  : currentVal === undefined
                  ? 'here'
                  : currentVal.includes(answer)
                  ? styles.checked
                  : styles.notChecked)
              }>
              <label className={`w-100`}>
                <input
                  data-testid="choicesQuestionInput"
                  type="radio"
                  value={answer}
                  name={question?.id}
                  className={
                    currentVal.length === 0
                      ? styles.notChecked
                      : currentVal === undefined
                      ? 'here'
                      : currentVal.includes(answer)
                      ? styles.checked
                      : styles.notChecked
                  }
                  // values from answer
                  onClick={() => submitQuestion(answer, index)}
                />
                <span
                  className={`${
                    question?.correctAnswersCount !== 1 && styles.multipleChoice
                  }`}></span>
                <p>{answer}</p>
              </label>
            </div>
          ))}
        </Form>
      </div>
    );
  } else if (
    question?.answerType === 'FILL_IN' ||
    question?.answerType === 'SUBJECTIVE'
  ) {
    return questionStatus === 'loading' ? (
      <LoaderWrapper loading={true} />
    ) : (
      <div className={styles.inputGroup}>
        <h5 className={styles.title}>
          {questionNumber}. {question?.title}
        </h5>
        <p>{question?.description}</p>
        <img src={question?.imageUrl} alt="" />
        {question?.answerType === 'FILL_IN' ? (
          <input
            onDrop={(e) => e.preventDefault()}
            autoComplete="off"
            data-testid="fillInQuestionInput"
            className={`${styles.input} ${styles.smallWidth}`}
            value={currentVal}
            type="text"
            placeholder="Your answer…"
            name={question?.id}
            onChange={(e) => setCurrentVal([e.target.value.trimStart()])}
          />
        ) : (
          <textarea
            onDrop={(e) => e.preventDefault()}
            autoComplete="off"
            data-testid="fillInQuestionTextArea"
            value={currentVal}
            placeholder="Your answer…"
            name={question?.id}
            onChange={(e) => setCurrentVal([e.target.value.trimStart()])}
            cols={40}
            rows={3}></textarea>
        )}
      </div>
    );
  } else {
    return <LoaderWrapper loading={false} />;
  }
};

export default SelectQuestion;
