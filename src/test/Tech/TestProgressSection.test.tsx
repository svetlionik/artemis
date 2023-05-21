import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import mockStore from 'test/mockStore';
import TestProgressSection from 'boxes/Tests/components/TestProgressSection/TestProgressSection';

describe('Testing Test Progress Section', () => {
  it('Testing Progress Section in Tests', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <TestProgressSection
            questions={{
              title: 'Admission Test',
              code: 'ADM',
              durationMinutes: 25,
              questions: ['1', '2'],
              type: '',
            }}
            count={2}
            setCount={jest.fn()}
            clearCurrentVal={jest.fn()}
          />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
  });
});
