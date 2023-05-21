import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import Header from '../../components/Header/Header';
import { DropDownMenu } from 'components';

import mockStore from 'test/mockStore';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Testing Header', () => {
  it('Header loads successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Header />
        </Router>
      </Provider>,
    );
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Interview Journey')).toBeInTheDocument();
    expect(screen.getByText('Tech Evaluations')).toBeInTheDocument();
  });

  it('Dropdown menu opens succssfully', () => {
    let handleOpen = jest.fn();
    let handleClose = jest.fn();
    let open = true;
    let currentUser = 'test#8842';
    render(
      <Provider store={mockStore}>
        <Router>
          <DropDownMenu
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
            currentUser={currentUser}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  describe('Testing dropdown menu links', () => {
    it('Logout and redirect to login', () => {
      render(
        <Provider store={mockStore}>
          <Router>
            <Header />
          </Router>
        </Provider>,
      );
      userEvent.click(screen.getByText('test#8704'));
      expect(screen.getByText('Log out')).toBeInTheDocument();
      userEvent.click(screen.getByText('Log out'));
      expect(mockHistoryPush).toHaveBeenCalledWith('/login');
    });

    it('Redirect to reset password page', () => {
      render(
        <Provider store={mockStore}>
          <Router>
            <Header />
          </Router>
        </Provider>,
      );

      userEvent.click(screen.getByText('test#8704'));
      expect(screen.getByText('Change Password')).toBeInTheDocument();
      userEvent.click(screen.getByText('Change Password'));
      expect(window.location.pathname).toBe('/reset');
    });
  });

  describe('Testing header menu links', () => {
    it('Redirect to Journey page', () => {
      render(
        <Provider store={mockStore}>
          <Router>
            <Header />
          </Router>
        </Provider>,
      );
      userEvent.click(screen.getByText('Interview Journey'));
      expect(window.location.pathname).toBe('/home');
    });
    it('Redirect to  Tech Evaluations page', () => {
      render(
        <Provider store={mockStore}>
          <Router>
            <Header />
          </Router>
        </Provider>,
      );
      userEvent.click(screen.getByText('Tech Evaluations'));
      expect(window.location.pathname).toBe('/tech');
    });
  });
});
