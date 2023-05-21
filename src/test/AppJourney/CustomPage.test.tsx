import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { CustomPage } from 'components/index';

import mockStore from 'test/mockStore';
import * as Redux from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('testing application journey', () => {
  beforeEach(() => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      stages: {
        STARTED: {
          type: 'STARTED',
          status: 'PASSED',
          dateTime: '2022-12-19T11:26:00.795',
        },
        DONE: {
          type: 'DONE',
          status: 'FAILED',
          dateTime: '2022-12-19T11:26:00.795',
        },
      },
    });
  });
  it('Render Journey Started screen', () => {
    let oneStage = {
      DONE: {
        createdAt: '2023-06-13T15:00:00.000',
        completedAt: '2023-06-30T15:00:00.000',
        relocationStep: 'VISA',
        status: 'FAILED',
      },
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <CustomPage newStages={oneStage} />
        </Router>
      </Provider>,
    );
    expect(
      screen.getByText('Thank you, for applying in Musala Soft!'),
    ).toBeInTheDocument();
  });
});
describe('testing application journey - 2', () => {
  beforeEach(() => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      stages: {
        STARTED: {
          type: 'STARTED',
          status: 'PASSED',
          dateTime: '2022-12-19T11:26:00.795',
        },
      },
    });
  });

  it('Render Journey Started screen', () => {
    let oneStage = {
      STARTED: {
        createdAt: '2023-06-13T15:00:00.000',
        completedAt: '2023-06-30T15:00:00.000',
        relocationStep: 'VISA',
        status: 'PASSED',
      },
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <CustomPage newStages={oneStage} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Your journey awaits!')).toBeInTheDocument();
  });
});
