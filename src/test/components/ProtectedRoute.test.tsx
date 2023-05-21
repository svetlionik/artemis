import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ProtectedRoute } from 'components';

import mockStore from 'test/mockStore';

describe('Testing Protected Route component', () => {
  it('Testing Protected Route', () => {
    function NewComponent(params: any) {
      return <div>Hello</div>;
    }
    render(
      <Provider store={mockStore}>
        <Router>
          <ProtectedRoute component={NewComponent} path={'/'} exact={true} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
  });
});
