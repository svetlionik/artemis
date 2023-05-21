import { Provider } from 'react-redux';
import { Router, MemoryRouter, useHistory } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import mockStore from 'test/mockStore';
import TimeUpPage from 'components/TimeUpPage/TimeUpPage';
import { createMemoryHistory } from 'history';

describe('Testing Error Page component', () => {
  it('Testing time up component - Tests', () => {
    process.env.REACT_APP_DISABLE_PRACTICAL_TASK = 'false';
    const history = createMemoryHistory();
    history.push('/tests/timeup', { from: '/tests/questions' });
    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <TimeUpPage />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText('whoops…looks like your time is up.'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Thank you for your time/i)).toBeInTheDocument();
  });
  it('Testing time up component - Practical task', () => {
    process.env.REACT_APP_DISABLE_PRACTICAL_TASK = 'false';
    const history = createMemoryHistory();
    history.push('/practical/timeup', { from: '/practical' });
    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <TimeUpPage />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText('whoops…looks like your time is up.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Your Practical task will be submitted automatically./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Thank you for your time/i)).toBeInTheDocument();
  });
});
