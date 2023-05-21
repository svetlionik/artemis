import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Redux from 'react-redux';

import TechEvaluation from 'boxes/AppJourney/components/TechEvaluation/TechEvaluation';

import mockStore from 'test/mockStore';
import userEvent from '@testing-library/user-event';
let setShow = jest.fn();
describe('testing application journey', () => {
  it('Render Tech Evaluation Bubbles - Multiple', () => {
    let selectCurrentTestCode = jest.fn();
    let getAllTestsIds = jest.fn();
    let testStatus = jest.fn();
    render(
      <Provider store={mockStore}>
        <Router>
          <TechEvaluation setShow={setShow} />
        </Router>
      </Provider>,
    );
    expect(screen.getAllByTestId('techBubble')[0]).toBeInTheDocument();

    userEvent.click(screen.getAllByTestId('techBubble')[0]);
    selectCurrentTestCode();
    getAllTestsIds();
    testStatus();
  });
});

describe('testing application journey - Test', () => {
  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: () => jest.fn(),
  }));
  jest.mock('../../store/auth/selector.ts', () => ({
    baseSelector: jest.fn(),
  }));
  it('Render Tech Evaluation Bubbles', () => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      techRequirements: [
        {
          type: 'SKILLS',
          status: 'NOT_STARTED',
        },
      ],
      user: {
        hasPracticalTask: true,
      },
    });
    render(
      <Provider store={mockStore}>
        <Router>
          <TechEvaluation setShow={setShow} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Skill Matrix')).toBeInTheDocument();
    userEvent.click(screen.getByText('Skill Matrix'));

    expect(global.location.pathname).toBe('/skills');
  });

  it('Render Tech Evaluation Bubbles - None', () => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      techRequirements: [],
      user: {
        hasPracticalTask: true,
      },
    });
    render(
      <Provider store={mockStore}>
        <Router>
          <TechEvaluation setShow={setShow} />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText(
        /Tech Evaluations will be enabled soon and you will be notified via email./,
      ),
    ).toBeInTheDocument();
  });
  it('Render Tech Evaluation Bubbles - Multiple', () => {
    let selectCurrentTestCode = jest.fn();
    let getAllTestsIds = jest.fn();
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      techRequirements: [
        {
          type: 'SKILLS',
          status: 'NOT_STARTED',
        },
        {
          type: 'ADMISSION',
          status: 'NOT_STARTED',
          code: 'ADM',
          durationMinutes: 25,
          requestedAt: '2022-12-05T14:12:22.580271841',
        },
      ],
      user: {
        hasPracticalTask: true,
      },
    });
    render(
      <Provider store={mockStore}>
        <Router>
          <TechEvaluation setShow={setShow} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Skill Matrix')).toBeInTheDocument();
    expect(screen.getByText('Admission Test')).toBeInTheDocument();
    expect(screen.getAllByTestId('techBubble')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('techBubble')[1]).toBeInTheDocument();

    jest
      .spyOn(Redux, 'useDispatch')
      .mockImplementation(() => selectCurrentTestCode);
    jest.spyOn(Redux, 'useDispatch').mockImplementation(() => getAllTestsIds);
    userEvent.click(screen.getAllByTestId('techBubble')[1]);

    expect(global.location.pathname).toBe('/tests/information');
    console.log(global.location.pathname);
  });
});
