import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TestHeader from 'boxes/Tests/components/TestHeader/TestHeader';

import mockStore from 'test/mockStore';

describe('Testing Test Header component', () => {
  it('Render Test Header successfully', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <TestHeader />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Test Code :/i)).toBeInTheDocument();
    expect(screen.getByText(/Answered:/i)).toBeInTheDocument();
    expect(screen.getByTestId('submitTestButton')).toBeInTheDocument();
  });

  it('Click on Info icon in Test Header', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <TestHeader />
        </Router>
      </Provider>,
    );
    expect(screen.getByAltText(/info/i)).toBeInTheDocument();

    userEvent.click(screen.getByAltText('info'));

    expect(screen.getByText(/The test lasts/)).toBeInTheDocument();
    expect(screen.getByText('Okay')).toBeInTheDocument();
  });

  it('Click Submit Test from Test Header', () => {
    process.env.REACT_APP_DISABLE_JOURNEY_PAGE = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <TestHeader />
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId('submitTestButton')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('submitTestButton'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Submit test')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    // userEvent.click(screen.getByText('Submit test'));
  });
});
