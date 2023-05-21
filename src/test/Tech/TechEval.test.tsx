import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import TechEval from 'boxes/TechEval/TechEval';

import { InfoCard } from 'boxes/Tests/components/InfoCard/InfoCard';

import mockStore from 'test/mockStore';
import userEvent from '@testing-library/user-event';
import { Toasts } from 'components';

describe('Testing Error Page component', () => {
  it('Render Tech Evaluations', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <TechEval />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Tech Evaluations')).toBeInTheDocument();
    expect(
      screen.getByText(
        'In order to move forward in your interview, you must complete all assigned Tech Evaluations.',
      ),
    ).toBeInTheDocument();
  });

  it('Render Tech Evaluations with Skill Matrix Card', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <TechEval />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Tech Evaluations')).toBeInTheDocument();
    expect(screen.getByTestId('testCard0')).toBeInTheDocument();

    userEvent.click(screen.getAllByTestId('testStatus')[0]);
  });

  it('Render Tech Evaluations with Dummy Test', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <TechEval />
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('testCard2')).toBeInTheDocument();

    userEvent.click(screen.getAllByTestId('testStatus')[1]);
  });
});

describe('Testing Tests components', () => {
  it('Testing Info Card component', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <InfoCard />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/The test lasts/i)).toBeInTheDocument();
    expect(screen.getByText(/The test consists of /i)).toBeInTheDocument();
    expect(
      screen.getByText(/You can go back to the previous questions./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Please make sure you are not interrupted and have a stable Internet connection during the test, as the timer cannot be paused once started./i,
      ),
    ).toBeInTheDocument();
  });

  it('Testing already started test', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    let setShow = jest.fn();
    let show = true;
    render(
      <Provider store={mockStore}>
        <Router>
          <Toasts
            errorMsg={'Test already started'}
            show={show}
            handleClose={setShow}
          />
          <TechEval />
        </Router>
      </Provider>,
    );
    expect(screen.getAllByTestId('testStatus')[2]).toBeInTheDocument();
    userEvent.click(screen.getAllByTestId('testStatus')[2]);
    setShow();
    expect(screen.getByText(/Test already started/i)).toBeInTheDocument();
  });
});
