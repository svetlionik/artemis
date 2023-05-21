import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import mockStore from 'test/mockStore';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import TestsLayout from 'boxes/Tests/TestsLayout';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    pathname: '/tests/',
    location: {
      state: { from: 'questions' },
    },
  }),
  useLocation: () => ({
    pathname: '/tests/',
    location: {
      state: { from: 'questions' },
    },
  }),
}));

describe('Testing Test', () => {
  process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'true';
  it('Test List renders successfully', () => {
    console.log(window.location.pathname);
    render(
      <Provider store={mockStore}>
        <Router>
          <TestsLayout />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('testLayout')).toHaveClass('testsLayout');
  });
});
