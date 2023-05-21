import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import TestsQuestion from 'boxes/Tests/components/TestQuestions/TestsQuestion';

import mockStore from 'test/mockStore';

describe('Testing Test Question container', () => {
  it('Testing Test Question', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <TestsQuestion />
        </Router>
      </Provider>,
    );
    // expect(screen.getByTestId('submitAnswerButton')).toBeInTheDocument();
  });
});
