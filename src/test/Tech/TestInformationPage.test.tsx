import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestsInformationPage from 'boxes/Tests/components/TestInformationPage/TestsInformationPage';
import NewPage from 'boxes/Tests/components/TestInformationPage/NewPage';
import ContinuePage from 'boxes/Tests/components/TestInformationPage/ContinuePage';

import mockStore from 'test/mockStore';

describe('Testing Test Information page', () => {
  it('Render Test Information page successfully', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <NewPage />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /You can start the test by pressing the button below. Before that, here are some tips for better performance:/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/The test lasts/i)).toBeInTheDocument();
    expect(screen.getByText(/The test consists of/i)).toBeInTheDocument();
    expect(
      screen.getByText(/You can go back to the previous questions./i),
    ).toBeInTheDocument();
    expect(screen.getByTestId('beginButton')).toBeInTheDocument();
  });

  it('Start new Test', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <NewPage />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /You can start the test by pressing the button below. Before that, here are some tips for better performance:/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/The test lasts/i)).toBeInTheDocument();
    expect(screen.getByText(/The test consists of/i)).toBeInTheDocument();
    expect(
      screen.getByText(/You can go back to the previous questions./i),
    ).toBeInTheDocument();
    expect(screen.getByTestId('beginButton')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('beginButton'));
  });

  it('Render Continue Test Information page successfully', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <ContinuePage />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /You can continue the test by pressing the button below./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Please, be aware that when you left the test the timer did not stop!/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /If you don't continue your test, when it is up it will be submitted automatically./i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId('beginButton')).toBeInTheDocument();
    expect(screen.getByTestId('instructionsButton')).toBeInTheDocument();
  });

  it('Continue Test', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <ContinuePage />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /You can continue the test by pressing the button below./i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId('beginButton')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('beginButton'));
  });
});
