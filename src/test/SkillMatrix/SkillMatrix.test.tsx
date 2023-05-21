import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import SkillMatrix from '../../boxes/SkillMatrix/SkillMatrix';
import SkillMatrixInfo from 'boxes/SkillMatrix/SkillMatrixInfo';
import SkillMatrixForm from 'boxes/SkillMatrix/SkillMatrixForm';
import SkillMatrixAnnonymous from 'boxes/SkillMatrix/SkillMatrixAnonymous ';
import SkillMatrixSubmission from 'boxes/SkillMatrix/SkillMatrixSubmission';

import mockStore from 'test/mockStore';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useFormContext: () => ({
    handleSubmit: () => jest.fn(),
    getValues: () => jest.fn(),
    errors: () => jest.fn(),
    register: () => jest.fn(),
  }),
  useForm: () => ({
    control: () => jest.fn(),
    register: () => jest.fn(),
  }),
  useFieldArray: () => ({
    fields: [{ id: 'asdadasdasd', key: 'First Additional Skill' }],
    append: () => jest.fn(),
    remove: () => jest.fn(),
  }),
}));

describe('Testing skill matrix page', () => {
  it('Page renders successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SkillMatrixInfo />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Skill Matrix')).toBeInTheDocument();
    expect(screen.getByTestId('beginButton')).toBeInTheDocument();
    expect(screen.getByTestId('marksButton')).toBeInTheDocument();
  });

  it('Click on Begin Button to start a Skill Matrix', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SkillMatrix />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Skill Matrix')).toBeInTheDocument();
    expect(screen.getByTestId('beginButton')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('beginButton'));

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Click to view Evaluation Marks', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SkillMatrix />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Skill Matrix')).toBeInTheDocument();
    expect(screen.getByTestId('marksButton')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('marksButton'));

    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByText('Theoretical knowledge')).toBeInTheDocument();
    expect(screen.getByText('Some experience')).toBeInTheDocument();
    expect(screen.getByText('Significant experience')).toBeInTheDocument();
    expect(screen.getByText('Expertise')).toBeInTheDocument();
    expect(screen.getByText('Advanced skills')).toBeInTheDocument();
  });
});

describe('Testing Skill Matrix Form', () => {
  it('Form renders successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SkillMatrixForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Anonymous link renders successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SkillMatrixAnnonymous />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Submission renders successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <SkillMatrixSubmission />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});

// describe('New testing', () => {
//   // ERROR EPIPE
//   it('Click to open and close Evaluation Marks', () => {
//     render(
//       <Provider store={mockStore}>
//         <Router>
//           <SkillMatrix />
//         </Router>
//       </Provider>,
//     );
//     expect(screen.getByText('Skill Matrix')).toBeInTheDocument();
//     expect(screen.getByTestId('marksButton')).toBeInTheDocument();

//     userEvent.click(screen.getByTestId('marksButton'));

//     expect(screen.getByText('None')).toBeInTheDocument();

//     expect(screen.getByText('Okay')).toBeInTheDocument();
//   });
// });
