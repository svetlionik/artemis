import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { act } from 'react-dom/test-utils';

import { Table } from 'boxes/AppJourney/components/Table/Table';

import mockStore from 'test/mockStore';

describe('Testing scenarios with Active/Passed component in Journey page', () => {
  it('Render Table with Active component', () => {
    let handleClick = jest.fn();
    let activeComponent = {
      status: 'ACTIVE',
      startDate: '2022-12-19T11:26:00.795',
      applicationStep: 'TECHNICAL-TECHNICAL',
      step: '',
      detailKey: '',
      index: 2,
      meeting: 'some-meeting',
      meetingType: 'ONLINE',
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <Table
            status={activeComponent.status}
            startDate={activeComponent.startDate}
            applicationStep={activeComponent.applicationStep}
            step={activeComponent.step}
            detailKey={activeComponent.detailKey}
            index={activeComponent.index}
            handleClick={handleClick}
            meetingType={activeComponent.meetingType}
            meeting={activeComponent.meeting}
          />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Application step')).toBeInTheDocument();
    expect(screen.getAllByText('Technical Interview')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Technical Interview')[1]).toBeInTheDocument();
    expect(screen.getByText('When')).toBeInTheDocument();
    // expect(screen.getByText('19 Dec 2022 / 10:26 CET')).toBeInTheDocument();
    expect(screen.getByText('Where')).toBeInTheDocument();
    expect(screen.getByText('Join the meeting')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('Up to 2 hours')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();

    act(() => {
      screen.getByText('View').click();
    });

    expect(screen.getByText('Technical Interview Details')).toBeInTheDocument();
    expect(screen.getByText('Your Technical interviewer')).toBeInTheDocument();

    expect(
      screen.getByText(
        'You have reached the Technical Interview step of your journey! It will be conducted by one of our experienced interviewers and aims to assess your level of expertise.',
      ),
    ).toBeInTheDocument();
  });

  it('Render Table with Passed component', () => {
    let handleClick = jest.fn();
    let activeComponent = {
      status: 'PASSED',
      startDate: '2022-12-19T11:26:00.795',
      applicationStep: 'TECHNICAL-TECHNICAL',
      step: '',
      detailKey: '',
      index: 2,
      meeting: 'some-meeting',
      meetingType: 'ONLINE',
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <Table
            status={activeComponent.status}
            startDate={activeComponent.startDate}
            applicationStep={activeComponent.applicationStep}
            step={activeComponent.step}
            detailKey={activeComponent.detailKey}
            index={activeComponent.index}
            handleClick={handleClick}
            meeting={activeComponent.meeting}
            meetingType={activeComponent.meetingType}
          />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Application step')).toBeInTheDocument();
    expect(screen.getAllByText('Technical Interview')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Technical Interview')[1]).toBeInTheDocument();
    expect(screen.getByText('When')).toBeInTheDocument();
    // expect(screen.getByText('19 Dec 2022 / 10:26 CET')).toBeInTheDocument();
    expect(screen.getByText('Where')).toBeInTheDocument();
    expect(screen.getByText('Join the meeting')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('Up to 2 hours')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();

    act(() => {
      screen.getByText('View').click();
    });

    expect(screen.getByText('Technical Interview Details')).toBeInTheDocument();
    expect(screen.getByText('Your Technical interviewer')).toBeInTheDocument();
  });

  it('Render Table with Active component - HR', () => {
    let handleClick = jest.fn();
    let activeComponent = {
      status: 'ACTIVE',
      startDate: '2022-12-19T11:26:00.795',
      applicationStep: 'HR-HR',
      step: '',
      detailKey: '',
      index: 2,
      meeting: 'some-meeting',
      meetingType: 'ONLINE',
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <Table
            status={activeComponent.status}
            startDate={activeComponent.startDate}
            applicationStep={activeComponent.applicationStep}
            step={activeComponent.step}
            detailKey={activeComponent.detailKey}
            index={activeComponent.index}
            handleClick={handleClick}
            meeting={activeComponent.meeting}
            meetingType={activeComponent.meetingType}
          />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Application step')).toBeInTheDocument();
    expect(screen.getAllByText('HR Interview')[0]).toBeInTheDocument();
    expect(screen.getAllByText('HR Interview')[1]).toBeInTheDocument();
    expect(screen.getByText('When')).toBeInTheDocument();
    // expect(screen.getByText('19 Dec 2022 / 10:26 CET')).toBeInTheDocument();
    expect(screen.getByText('Where')).toBeInTheDocument();
    expect(screen.getByText('Join the meeting')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('40mins')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();

    act(() => {
      screen.getByText('View').click();
    });

    expect(screen.getByText('HR Interview Details')).toBeInTheDocument();
    expect(screen.getByText('Your HR interviewer')).toBeInTheDocument();
  });

  it('Render Table with interview in person', () => {
    let handleClick = jest.fn();
    let activeComponent = {
      status: 'ACTIVE',
      startDate: '2022-12-19T11:26:00.795',
      applicationStep: 'HR-HR',
      step: '',
      detailKey: '',
      index: 2,
      meeting: 'some-meeting',
      meetingType: 'OFFLINE',
      officeLocation: 'Sofia',
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <Table
            status={activeComponent.status}
            startDate={activeComponent.startDate}
            applicationStep={activeComponent.applicationStep}
            step={activeComponent.step}
            detailKey={activeComponent.detailKey}
            index={activeComponent.index}
            handleClick={handleClick}
            meeting={activeComponent.meeting}
            meetingType={activeComponent.meetingType}
            officeLocation={activeComponent.officeLocation}
          />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Application step')).toBeInTheDocument();
    expect(screen.getAllByText('HR Interview')[0]).toBeInTheDocument();
    expect(screen.getAllByText('HR Interview')[1]).toBeInTheDocument();
    expect(screen.getByText('When')).toBeInTheDocument();
    // expect(screen.getByText('19 Dec 2022 / 10:26 CET')).toBeInTheDocument();
    expect(screen.getByText('Where')).toBeInTheDocument();
    expect(screen.getByText('Office Sofia')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('40mins')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();

    act(() => {
      screen.getByText('View').click();
    });

    expect(screen.getByText('HR Interview Details')).toBeInTheDocument();
    expect(screen.getByText('Your HR interviewer')).toBeInTheDocument();
  });

  it('Render Table with Active component - OFFER', () => {
    let handleClick = jest.fn();
    let activeComponent = {
      status: 'ACTIVE',
      startDate: '2022-12-19T11:26:00.795',
      applicationStep: 'OFFER-OFFER',
      step: '',
      detailKey: '',
      index: 2,
      meeting: 'some-meeting',
      meetingType: 'ONLINE',
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <Table
            status={activeComponent.status}
            startDate={activeComponent.startDate}
            applicationStep={activeComponent.applicationStep}
            step={activeComponent.step}
            detailKey={activeComponent.detailKey}
            index={activeComponent.index}
            handleClick={handleClick}
            meeting={activeComponent.meeting}
            meetingType={activeComponent.meetingType}
          />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Application step')).toBeInTheDocument();
    expect(screen.getAllByText('Offer Details')[0]).toBeInTheDocument();
    // expect(screen.getAllByText('Offer Details')[1]).toBeInTheDocument();
    expect(screen.getByText('When')).toBeInTheDocument();
    // expect(screen.getByText('19 Dec 2022 / 12:26 CET')).toBeInTheDocument();
    expect(screen.queryByText('Where')).toBeNull();
    expect(screen.queryByText('Duration')).toBeNull();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();

    act(() => {
      screen.getByText('View').click();
    });

    expect(screen.getByText('Offer Details')).toBeInTheDocument();
  });

  it('Render Table with Passed component - Final stage', () => {
    let handleClick = jest.fn();
    let activeComponent = {
      status: 'PASSED',
      startDate: '2022-12-19T11:26:00.795',
      applicationStep: 'DONE-DONE',
      step: '',
      detailKey: '',
      index: 2,
      meeting: 'some-meeting',
      meetingType: 'ONLINE',
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <Table
            status={activeComponent.status}
            startDate={activeComponent.startDate}
            applicationStep={activeComponent.applicationStep}
            step={activeComponent.step}
            detailKey={activeComponent.detailKey}
            index={activeComponent.index}
            handleClick={handleClick}
            meeting={activeComponent.meeting}
            meetingType={activeComponent.meetingType}
          />
        </Router>
      </Provider>,
    );
    // expect(
    //   screen.getByText(
    //     'You have successfully joined our big family in Musala Soft!',
    //   ),
    // ).toBeInTheDocument();
    // expect(screen.getByText(`What's next`)).toBeInTheDocument();
    // expect(
    //   screen.getByText(
    //     'Please, if you have any questions contact your HR representative',
    //   ),
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByText(
    //     'Thank you, for your patience and following our application process!',
    //   ),
    // ).toBeInTheDocument();
  });
});
