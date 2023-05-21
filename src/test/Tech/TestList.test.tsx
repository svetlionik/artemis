import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import * as Selectors from '@reduxjs/toolkit';
import TestList from 'boxes/Tests/components/TestList/TestList';

import mockStore from 'test/mockStore';
import { LoaderWrapper } from 'components/index';
import { userInformation } from 'store/auth/selector';
import TestCard from 'boxes/Tests/components/TestCard/TestCard';
import userEvent from '@testing-library/user-event';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  createSelector: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  // useDispatch: jest.fn(),
}));
describe('Testing Test Question container', () => {
  const getTestsRequirements = jest.fn();
  beforeEach(() => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'true';
    getTestsRequirements.mockImplementation();
    jest.spyOn(Selectors, 'createSelector').mockReturnValue(userInformation);
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      requirements: [
        {
          type: 'DUMMY',
          status: 'SUBMITTED',
          code: 'DUMMY',
          durationMinutes: 3,
          submittedAt: '2022-12-20T15:51:51.0341708',
          requestedAt: '2022-12-20T15:47:52.2205558',
        },
        {
          type: 'ADMISSION',
          status: 'NOT_STARTED',
          code: 'ADM',
          durationMinutes: 25,
          submittedAt: '2022-12-20T15:51:51.0341708',
          requestedAt: '2022-12-20T15:47:52.2205558',
        },
        {
          type: 'ADMISSION',
          status: 'IN_PROGRESS',
          code: 'ADM#QA',
          durationMinutes: 25,
          submittedAt: '2022-12-20T15:51:51.0341708',
          requestedAt: '2022-12-20T15:47:52.2205558',
        },
      ],
      user: {
        hasTestRequirement: true,
      },
    });
  });
  it('Testing Test Question - Test', () => {
    jest.spyOn(Redux, 'useDispatch').mockReturnValue(getTestsRequirements);
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      requirements: [],
    });
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'true';
    getTestsRequirements();
    render(
      <Provider store={mockStore}>
        <Router>
          <TestList />
        </Router>
      </Provider>,
    );
    expect(global.location.pathname).toBe('/home');
  });

  it('Testing Test Question - Wrapper', () => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      requirements: [],
    });
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'true';
    getTestsRequirements();
    render(
      <Provider store={mockStore}>
        <Router>
          <LoaderWrapper children={undefined} loading={true} />
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Testing Test Question - Card', () => {
    enum TestType {
      COGNITIVE = 'COGNITIVE',
      ADMISSION = 'ADMISSION',
      LANGUAGE = 'LANGUAGE',
    }
    let testObject = {
      title: 'ADMISSION-ADM',
      code: 'ADM',
      status: 'IN_PROGRESS',
      type: TestType.ADMISSION,
      requestedAt: '2022-12-26T10:25:57.3793396',
      submittedAt: null,
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <TestCard
            code={testObject.code}
            status={testObject.status}
            title={testObject.title}
            type={testObject.type}
            questions={[]}
            requestedAt={testObject.requestedAt}
            submittedAt={''}
            onClick={jest.fn()}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Admission Test')).toBeInTheDocument();
    userEvent.click(screen.getByText('Admission Test'));
    // jest.spyOn(Redux, 'useDispatch').mockImplementation();
  });
});
