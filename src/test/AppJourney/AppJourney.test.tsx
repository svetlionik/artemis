import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import AppJourney from '../../boxes/AppJourney/AppJourney';

import mockStore from 'test/mockStore';

describe('Testing AppJourney Container', () => {
  it('Render Table with Active component', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <AppJourney />
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
