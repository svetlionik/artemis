import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import mockStore from 'test/mockStore';
import { Router } from 'react-router-dom';
import PracticalTaskTimer from 'boxes/PracticalTask/components/Timer/Timer';
import { createMemoryHistory } from 'history';

describe('Testing Practical Task page', () => {
  it('Render Practical Task successfully', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <PracticalTaskTimer firstDate={'2023-04-02T15:11:00.210Z'} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('09')).toBeInTheDocument();
    expect(screen.getByText('23')).toBeInTheDocument();
    expect(screen.getByText('59')).toBeInTheDocument();
    expect(screen.getByText('Days')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
  });
});
