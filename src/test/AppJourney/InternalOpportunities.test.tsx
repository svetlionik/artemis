import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Redux from 'react-redux';

import mockStore from 'test/mockStore';

import { InternalOpportunities } from 'boxes/OfferDetails/components/InternalOpportunities/InternalOpportunities';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  createSelector: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Testing Relocation to Sofia', () => {
  beforeEach(() => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      email: 'test@musala.com',
      username: 'test#8704',
      sub: 'asdasdasd',
      workLocation: 'Relocation to Sofia',
      status: 'CONFIRMED',
      profile: 'QA',
      givenName: 'John',
      familyName: 'Doe',
      hasTestRequirement: true,
      hasSkillRequirement: true,
      hasPracticalTaskRequirement: true,
    });
  });
  it('Page renders successfully - Test 2', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <InternalOpportunities />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByText('Internal career mobility options'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'While you are within the company you may take advantage of a range of short-term development experiences or apply for other positions internally.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Knowledge-sharing initiatives'),
    ).toBeInTheDocument();
    // expect(
    //   screen.getByText(
    //     'We organize different knowledge-sharing initiatives where you can learn about modern technologies, develop new skills, or even participate as a speaker and tutor',
    //   ),
    // ).toBeInTheDocument();
    expect(screen.getByText('Employee Referral Program')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Our employees are our most valuable assets and best ambassadors, and we rely very much on referrals. For each successful referral, there are monetary awards. (Conditions apply.).',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Corporate mobile phone subscription'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'If you like to join our corporate mobile group Musala Soft will cover the subscription plan.',
      ),
    ).toBeInTheDocument();
  });
});

describe('Testing BG', () => {
  beforeEach(() => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      email: 'test@musala.com',
      username: 'test#8704',
      sub: 'asdasdasd',
      workLocation: 'BG',
      status: 'CONFIRMED',
      profile: 'QA',
      givenName: 'John',
      familyName: 'Doe',
      hasTestRequirement: true,
      hasSkillRequirement: true,
      hasPracticalTaskRequirement: true,
    });
  });
  it('Page renders successfully - BG', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <InternalOpportunities />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByText('Internal career mobility options'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'While you are within the company you may take advantage of a range of short-term development experiences or apply for other positions internally.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Knowledge-sharing initiatives'),
    ).toBeInTheDocument();
    // expect(
    //   screen.getByText(
    //     'We organize different knowledge-sharing initiatives where you can learn about modern technologies, develop new skills, or even participate as a speaker and tutor',
    //   ),
    // ).toBeInTheDocument();
    expect(screen.getByText('Employee Referral Program')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Our employees are our most valuable assets and best ambassadors, and we rely very much on referrals. For each successful referral, there are monetary awards. (Conditions apply.).',
      ),
    ).toBeInTheDocument();
  });
});

describe('Testing MK', () => {
  beforeEach(() => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue({
      email: 'test@musala.com',
      username: 'test#8704',
      sub: 'asdasdasd',
      workLocation: 'MK',
      status: 'CONFIRMED',
      profile: 'QA',
      givenName: 'John',
      familyName: 'Doe',
      hasTestRequirement: true,
      hasSkillRequirement: true,
      hasPracticalTaskRequirement: true,
    });
  });
  it('Page renders successfully - MK', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <InternalOpportunities />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByText('Internal career mobility options'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'While you are within the company you may take advantage of a range of short-term development experiences or apply for other positions internally.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Knowledge-sharing initiatives'),
    ).toBeInTheDocument();
    // expect(
    //   screen.getByText(
    //     'We organize different knowledge-sharing initiatives where you can learn about modern technologies, develop new skills, or even participate as a speaker and tutor.',
    //   ),
    // ).toBeInTheDocument();
    expect(screen.getByText('Employee Referral Program')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Our employees are our most valuable assets and best ambassadors, and we rely very much on referrals. For each successful referral, there are monetary awards. (Conditions apply.).',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Mid candidate - 1000 EUR')).toBeInTheDocument();
    expect(screen.getByText('Senior candidate - 1500 EUR')).toBeInTheDocument();
    expect(screen.getByText('Recognition program')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Our Praise a colleague program allows all employees to be recognized for their achievements by their peers, direct manager, or more senior leaders within the organization.',
      ),
    ).toBeInTheDocument();
  });
});
