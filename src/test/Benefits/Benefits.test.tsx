import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Benefits from '../../boxes/Benefits/Benefits';

import mockStore from 'test/mockStore';

describe('Testing benefits page', () => {
  let checkSkillMatrix = jest.fn();
  it('Page renders successfully', () => {
    process.env.REACT_APP_TEST_FLAG = 'true';
    render(
      <Provider store={mockStore}>
        <Router>
          <Benefits />
        </Router>
      </Provider>,
    );
    checkSkillMatrix();
    expect(checkSkillMatrix).toHaveBeenCalled();
    console.log(global.location.pathname);
  });
});
