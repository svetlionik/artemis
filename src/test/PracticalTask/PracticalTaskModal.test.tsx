import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import SubmitPracticalTask from 'boxes/PracticalTask/components/SubmitTestModal/SubmitPracticalModal';

import mockStore from 'test/mockStore';
import userEvent from '@testing-library/user-event';

describe('Testing Practical task Modals', () => {
  it('Testing Submit Test Modal', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <SubmitPracticalTask code={''} show={true} handleClose={jest.fn()} />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(/You are about to submit practical task./),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Do you want to submit the task anyway?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit task')).toBeInTheDocument();
  });

  it('Testing Submit', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <SubmitPracticalTask code={''} show={true} handleClose={jest.fn()} />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(/You are about to submit practical task./),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Do you want to submit the task anyway?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit task')).toBeInTheDocument();
    userEvent.click(screen.getByText('Submit task'));
    expect(window.location.pathname).toBe('/practical/success');
  });
});
