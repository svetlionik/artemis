import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { UnderConstruction } from 'components';

import mockStore from 'test/mockStore';

describe('Testing Under Construction component', () => {
  it('Page renders successfully', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <UnderConstruction />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByText('This page is still under construction'),
    ).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeInTheDocument();
  });
  it('Click on link to go to homepage', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <UnderConstruction />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Go back')).toBeInTheDocument();
    userEvent.click(screen.getByText('Go back'));
    expect(global.location.pathname).toBe('/');
  });
});
