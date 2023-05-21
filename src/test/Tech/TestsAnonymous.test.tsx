import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import TestsAnonymous from 'boxes/Tests/components/TestsAnonymousPage/TestsAnonymous';

import mockStore from 'test/mockStore';

describe('Testing Test Question container', () => {
  let loadTestSubmission = jest.fn();

  it('Testing Test Question', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <TestsAnonymous />
        </Router>
      </Provider>,
    );
    loadTestSubmission();
    expect(loadTestSubmission).toHaveBeenCalled();
    expect(screen.getByText('Total Score')).toBeInTheDocument();
    expect(screen.getByText('Time Spent')).toBeInTheDocument();
  });
});
