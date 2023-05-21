import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import TestCard from 'boxes/Tests/components/TestCard/TestCard';

import mockStore from 'test/mockStore';

describe('Testing Test Card component', () => {
  it('Test Card renders successfully - NOT STARTED', () => {
    enum TestType {
      COGNITIVE = 'COGNITIVE',
      ADMISSION = 'ADMISSION',
      LANGUAGE = 'LANGUAGE',
    }
    let testObject = {
      title: 'ADMISSION-ADM',
      code: 'ADM',
      status: 'NOT_STARTED',
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
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Not Started')).toBeInTheDocument();
    expect(screen.getByText('Requested:')).toBeInTheDocument();
    expect(screen.getByText(`26/12/2022`)).toBeInTheDocument();
    expect(screen.getByTestId('testStatus')).toBeInTheDocument();
  });

  it('Test Card renders successfully - IN PROGRESS', () => {
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
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Requested:')).toBeInTheDocument();
    expect(screen.getByText(`26/12/2022`)).toBeInTheDocument();
    expect(screen.getByTestId('testStatus')).toBeInTheDocument();
  });

  it('Test Card renders successfully - COMPLETED', () => {
    enum TestType {
      COGNITIVE = 'COGNITIVE',
      ADMISSION = 'ADMISSION',
      LANGUAGE = 'LANGUAGE',
    }
    let testObject = {
      title: 'ADMISSION-ADM',
      code: 'ADM',
      status: 'SUBMITTED',
      type: TestType.ADMISSION,
      requestedAt: '2022-12-26T10:25:57.3793396',
      submittedAt: '2022-12-26T10:25:57.3793396',
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
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Submitted')).toBeInTheDocument();
    expect(screen.getByText('Requested:')).toBeInTheDocument();
    expect(screen.getByText(`26/12/2022`)).toBeInTheDocument();
    expect(screen.getByText('Submitted:')).toBeInTheDocument();
    expect(screen.getByText(`26/12/2022`)).toBeInTheDocument();
  });

  it('Test Card renders successfully - SKILL MATRIX - NOT STARTED', () => {
    enum TestType {
      COGNITIVE = 'COGNITIVE',
      ADMISSION = 'ADMISSION',
      LANGUAGE = 'LANGUAGE',
    }
    let testObject = {
      title: 'SKILLS-undefined',
      code: 'SKILLS',
      status: 'NOT_STARTED',
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

    expect(screen.getByText('Skill Matrix')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    // expect(screen.getByText('Not Started')).toBeInTheDocument();
    expect(screen.getByText('Requested:')).toBeInTheDocument();
    expect(screen.getByText(`26/12/2022`)).toBeInTheDocument();
    expect(screen.getByTestId('testStatus')).toBeInTheDocument();
  });

  it('Test Card renders successfully - SKILL MATRIX - COMPLETED', () => {
    enum TestType {
      COGNITIVE = 'COGNITIVE',
      ADMISSION = 'ADMISSION',
      LANGUAGE = 'LANGUAGE',
    }
    let testObject = {
      title: 'SKILLS-undefined',
      code: 'SKILLS',
      status: 'SUBMITTED',
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

    expect(screen.getByText('Skill Matrix')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Submitted')).toBeInTheDocument();
    expect(screen.getByText('Requested:')).toBeInTheDocument();
    expect(screen.getByText(`26/12/2022`)).toBeInTheDocument();
    expect(screen.getByTestId('testStatus')).toBeInTheDocument();
  });
});
