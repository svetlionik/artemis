import { Fragment, useRef } from 'react';
import { Container, Figure } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { RootState } from 'store/store';
import { IProgressSection, QuestionInfo } from 'boxes/Tests/interfaces';
import { resetQuestionsScroll } from 'shared/services/common';

import styles from './TestProgressSection.module.scss';

const TestProgressSection = (props: IProgressSection) => {
  const { currentAnswers } = useSelector((state: RootState) => state.tests);
  const { setCount, count, clearCurrentVal } = props;
  const horzLineRef = useRef<any>(null);

  const navigateToQuestion = (index: number) => {
    setCount(index);
    clearCurrentVal();
    resetQuestionsScroll();
  };
  return (
    <div className={styles.progressSectionContainer}>
      <Container ref={horzLineRef} className={`${styles.sectionProgress}`}>
        {props.questions?.questions?.map((section: string, index: any) => (
          <Fragment>
            <div
              className={styles.horzLine}
              style={{ height: horzLineRef.current?.scrollHeight - 12 }}></div>
            <Figure
              onClick={() => navigateToQuestion(index)}
              className={`${
                currentAnswers.some(
                  (item: QuestionInfo) => item.questionId === section,
                )
                  ? styles.active
                  : styles.notActive
              } ${count !== index || styles.current} d-flex`}
              key={section}>
              <p></p>
              <Figure.Caption className="caption">
                <a>
                  {(index + 1).toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                </a>
              </Figure.Caption>
            </Figure>
          </Fragment>
        ))}
      </Container>
    </div>
  );
};

export default TestProgressSection;
