import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Progress, ProgressMobile } from 'components/index';

import mockStore from 'test/mockStore';

let activeStep: any = {
  STARTED: {
    type: 'STARTED',
    status: 'PASSED',
    dateTime: '2022-12-19T11:26:00.795',
  },
};
let userSteps = [
  { type: 'STARTED', name: 'Application Review' },
  { type: 'HR', name: 'HR interview' },
  { type: 'TECHNICAL', name: 'Technical Interview' },
  { type: 'OFFER', name: 'Your offer' },
  { type: 'DONE', name: 'Final Stage' },
];
describe('testing application journey', () => {
  it('Progress bar renders successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Progress activeStep={activeStep} userSteps={userSteps} />
        </Router>
      </Provider>,
    );
    expect(screen.getAllByText('Application Review')[0]).toBeInTheDocument();
    expect(screen.getAllByText('HR interview')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Technical Interview')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Your offer')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Final Stage')[0]).toBeInTheDocument();
  });

  it('Progress mobile bar renders successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <ProgressMobile activeStep={activeStep} userSteps={userSteps} />
        </Router>
      </Provider>,
    );
    expect(screen.getAllByText('Application Review')[0]).toBeInTheDocument();
    expect(screen.getByText('01/05')).toBeInTheDocument();
  });
});
