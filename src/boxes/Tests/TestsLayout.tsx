import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import TestsQuestion from './components/TestQuestions/TestsQuestion';
import PromptModal from 'components/PromptModal/PromptModal';

import { userInformation } from 'store/auth/selector';

import { LocationState } from 'components/types';

import styles from './Tests.module.scss';

const TestsLayout = () => {
  const user = useSelector(userInformation);
  const location = useLocation<LocationState>();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith('/tests/')) {
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
    }
  }, [location.pathname]);

  return user.hasTestRequirement ? (
    <Container className={styles.testsLayout} fluid data-testid="testLayout">
      <PromptModal
        when={showPrompt}
        title="Leave this page"
        cancelText="Cancel"
        okText="Confirm"
        onOK={() => true}
        onCancel={() => false}
      />
      <TestsQuestion />
    </Container>
  ) : (
    <Redirect to="/home" />
  );
};

export default TestsLayout;
