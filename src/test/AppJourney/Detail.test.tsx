import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as Redux from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Account } from 'boxes/Interview/components/Details/Account';

import mockStore from 'test/mockStore';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
describe('Testing Benefits', () => {
  beforeEach(() => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      interviewer: {
        name: 'John Doe',
        email: 'john@doe',
        photoURL: '',
        linkedinURL: 'https://www.linkedin.com/in/john-doe',
      },
      stageDetails: {
        interviewerDetails: {
          name: 'Dave Complete',
          email: 'dave.complete@artemis.com',
          photoUR: '',
          linkedinURL: 'https://www.linkedin.com/in/dave-complete',
        },
        userId: 'username',
        type: 'HR',
        status: 'ACTIVE',
        dateTime: '2022-12-05T15:45:16.386',
      },
    });
  });
  it('Page renders successfully', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <Account />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Dave Complete')).toBeInTheDocument();
    expect(screen.getByText('dave.complete@artemis.com')).toBeInTheDocument();
    expect(
      screen.getByText('https://www.linkedin.com/in/dave-complete'),
    ).toBeInTheDocument();
  });
});
