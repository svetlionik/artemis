import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Benefits } from 'boxes/OfferDetails/components/Benefits/Benefits';

import mockStore from 'test/mockStore';

describe('Testing Benefits', () => {
  it('Page renders successfully', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <Benefits
            benefits={[
              {
                name: 'First Benefit',
                description: 'First Benefit Description',
              },
            ]}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('First Benefit')).toBeInTheDocument();
    expect(screen.getByText('First Benefit Description')).toBeInTheDocument();
  });
});
