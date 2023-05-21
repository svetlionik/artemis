import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { Relocation } from 'boxes/Relocation';
import { Table } from 'boxes/Relocation/components/Table/Table';
import { Template } from 'boxes/Relocation/components/RelocationDetails/Template';

import mockStore from 'test/mockStore';
import DATA from 'boxes/Relocation/details.json';

describe('Testing Relocation Container', () => {
  it('Render Relocation', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Relocation />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByText('Providing Documents')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Visa')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Migration Process')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Contract')[0]).toBeInTheDocument();
  });

  it('Render Table with Active component', () => {
    let handleClick = jest.fn();
    let activeComponent = {
      status: 'PASSED',
      startDate: '2022-12-19T11:26:00.795',
      completedDate: '2022-12-19T11:26:00.795',
      relocationStep: 'VISA',
      step: '',
      detailKey: '',
      index: 2,
    };
    render(
      <Provider store={mockStore}>
        <Router>
          <Table
            status={activeComponent.status}
            startDate={activeComponent.startDate}
            completedDate={activeComponent.completedDate}
            applicationStep={activeComponent.relocationStep}
            step={activeComponent.step}
            detailKey={activeComponent.detailKey}
            index={activeComponent.index}
            handleClick={handleClick}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Relocation step')).toBeInTheDocument();
    expect(screen.getAllByText('Visa')[0]).toBeInTheDocument();
    expect(screen.getByText('Requested on')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
  });
  it('Render Template component', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Template {...DATA} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Personal documents')).toBeInTheDocument();
    expect(screen.getByText('International Passport')).toBeInTheDocument();
    expect(screen.getByText('Academic documents')).toBeInTheDocument();
    expect(screen.getAllByText('Upload')[0]).toBeInTheDocument();

    userEvent.click(screen.getAllByText('Upload')[0]);
  });
});
