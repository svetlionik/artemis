import React from 'react';
import { Provider } from 'react-redux';
import mockStore from 'test/mockStore';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from 'boxes/Home/Home';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testing Home page', () => {
  it('Render Home page successfully', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Artemis allows you to share with Musala more about your level of expertise. During your interview process, you will receive email notifications (or get contacted by your HR representative) when more information is required of you. These topics will appear on the top menu.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Tests')).toBeInTheDocument();
  });

  it('Go to Skills', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Artemis allows you to share with Musala more about your level of expertise. During your interview process, you will receive email notifications (or get contacted by your HR representative) when more information is required of you. These topics will appear on the top menu.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Tests')).toBeInTheDocument();

    userEvent.click(screen.getByText('Skills'));

    expect(global.location.pathname).toBe('/skills');
  });

  it('Go to Tests', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Artemis allows you to share with Musala more about your level of expertise. During your interview process, you will receive email notifications (or get contacted by your HR representative) when more information is required of you. These topics will appear on the top menu.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Tests')).toBeInTheDocument();

    userEvent.click(screen.getByText('Tests'));

    expect(global.location.pathname).toBe('/tests');
  });
});
