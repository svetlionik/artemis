import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { Success } from 'components';

import mockStore from 'test/mockStore';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

describe('Testing Success component', () => {
  it('Testing success from Tests', () => {
    const history = createMemoryHistory();
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    history.push('/tests/success', { from: 'questions' });
    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Success />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Your/i)).toBeInTheDocument();
    expect(screen.getByText(/is successfully submitted!/i)).toBeInTheDocument();
  });
  it('Testing success from Practical task', () => {
    const history = createMemoryHistory();
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    history.push('/practical/success', { from: '/practical' });
    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Success />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(/Your Practical task is successfully submitted!/i),
    ).toBeInTheDocument();
  });
  it('Testing success from Skill Matrix', () => {
    const history = createMemoryHistory();
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    history.push('/skills/success', { from: 'skills' });
    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Success />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(/Your Skill matrix is successfully submitted!/i),
    ).toBeInTheDocument();
  });
  it('Testing success from time up - Tests', () => {
    const history = createMemoryHistory();
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    history.push('/tests/success', { from: '/tests/timeup' });
    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Success />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Your/i)).toBeInTheDocument();
    expect(screen.getByText(/is successfully submitted!/i)).toBeInTheDocument();
  });
  it('Testing success from time up - Practical task', () => {
    const history = createMemoryHistory();
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    history.push('/practical/success', { from: '/practical/timeup' });
    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Success />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Your/i)).toBeInTheDocument();
    expect(screen.getByText(/is successfully submitted!/i)).toBeInTheDocument();
  });
  it('Testing redirect to homepage', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Success />
        </Router>
      </Provider>,
    );
  });
  it('Testing redirect to Tech Evaluations', () => {
    const history = createMemoryHistory();
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    history.push('/tests/success', { from: 'questions' });
    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <Success />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Back to Tech Evaluations/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Back to Tech Evaluations/i));
  });
});
