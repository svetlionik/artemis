import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import MarksMobile from 'components/Marks/MarksMobile';

import mockStore from 'test/mockStore';

describe('Testing benefits page', () => {
  it('Page renders successfully', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    global.innerWidth = 589;
    let handleRedirect = jest.fn();
    render(
      <Provider store={mockStore}>
        <Router>
          <MarksMobile />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Skill Matrix')).toBeInTheDocument();
    expect(screen.getByText('Evaluation marks')).toBeInTheDocument();
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Very strong experience in the field - Guru, Master or God (one of these is enough).',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Strong experience in the field - you can teach other team members in the field.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'One or two projects at a minimum, in which the technology has been applied extensively.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Some practical experience - self-practice or small project.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'You have read materials, but have no practical experience.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'You may know what the abbreviation means, but you do not know anything further.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Okay')).toBeInTheDocument();

    userEvent.click(screen.getByText('Okay'));

    handleRedirect();

    expect(global.location.pathname).toBe('/skills');
  });
  it('Close Evaluation Marks from header', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    global.innerWidth = 589;
    let handleRedirect = jest.fn();
    render(
      <Provider store={mockStore}>
        <Router>
          <MarksMobile />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Skill Matrix')).toBeInTheDocument();
    expect(screen.getByText('Evaluation marks')).toBeInTheDocument();
    expect(screen.getByText('Okay')).toBeInTheDocument();

    userEvent.click(screen.getByText('Skill Matrix'));

    handleRedirect();

    expect(global.location.pathname).toBe('/skills');
  });
});
