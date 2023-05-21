import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import mockStore from 'test/mockStore';
import { BrowserRouter as Router } from 'react-router-dom';
import PracticalTask from 'boxes/PracticalTask/PracticalTask';
import userEvent from '@testing-library/user-event';
import { InfoCard } from 'boxes/PracticalTask/components/InfoCard/InfoCard';
import Language from 'boxes/PracticalTask/components/Language/Language';

describe('Testing Practical Task page', () => {
  it('Render Practical Task successfully', () => {
    console.log(window.location.pathname);
    render(
      <Provider store={mockStore}>
        <Router>
          <PracticalTask />
        </Router>
      </Provider>,
    );
  });
  it('Render Info Card', () => {
    // process.env.REACT_APP_DISABLE_PRACTICAL_TASK = 'false';
    render(
      <Provider store={mockStore}>
        <Router>
          <InfoCard />
        </Router>
      </Provider>,
    );

    expect(
      screen.getByText(
        /Once the task is started you will receive access to a dedicated Git repository that you can clone and push your solution to./,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Please note that the task duration is 10 days from the moment you click "Let's Begin". If you fail to submit the task before the 10 days expire, the task will be closed, and you will not be able to make any changes after that./,
      ),
    ).toBeInTheDocument();
  });
  it('Render Language component successfully', () => {
    process.env.REACT_APP_DISABLE_PRACTICAL_TASK = 'false';
    console.log(window.location.pathname);
    render(
      <Provider store={mockStore}>
        <Router>
          <Language setLanguage={() => jest.fn()} language={''} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Please select')).toBeInTheDocument();
    userEvent.click(screen.getByText('Please select'));
    // expect(screen.getByText('Java')).toBeInTheDocument();
    // userEvent.click(screen.getByText('Java'));
    expect(screen.getByText('Other')).toBeInTheDocument();
    userEvent.click(screen.getByText('Other'));
    expect(screen.getByText('Other Language')).toBeInTheDocument();
    userEvent.type(screen.getByTestId('languageInput'), 'GO');
  });
});
