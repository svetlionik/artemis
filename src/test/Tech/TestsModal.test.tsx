import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import FinalQuestionModal from 'boxes/Tests/components/FinalQuestionModal/FinalQuestionModal';
import SubmitTestModal from 'boxes/Tests/components/SubmitTestModal/SubmitTestModal';

import mockStore from 'test/mockStore';

describe('Testing Test Modals', () => {
  it('Testing Final Modal Question', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <FinalQuestionModal show={true} handleClose={jest.fn()} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/You have answered 0 out of /)).toBeInTheDocument();
    expect(screen.getByText('Okay')).toBeInTheDocument();
  });

  it('Testing Submit Test Modal', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <SubmitTestModal show={true} handleClose={jest.fn()} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Looks like you have /)).toBeInTheDocument();
    expect(
      screen.getByText('Do you want to submit the test anyway?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit test')).toBeInTheDocument();
  });
});
