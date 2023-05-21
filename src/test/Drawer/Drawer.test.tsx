import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Drawer from '../../components/Drawer/Drawer';
import { Provider } from 'react-redux';
import mockStore from 'test/mockStore';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Testing Drawer', () => {
  const currentWidth = 763;
  it('Drawer loads successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>{currentWidth < 900 ? <Drawer /> : null}</Router>
      </Provider>,
    );
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByAltText('menu')).toBeInTheDocument();
  });

  it('Drawer menu loads succssfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Drawer />
        </Router>
      </Provider>,
    );

    fireEvent.click(screen.getByAltText('menu'));
    expect(screen.getByAltText('closeIcon')).toBeInTheDocument();
    expect(screen.getByText('Interview Journey')).toBeInTheDocument();
    expect(screen.getByText('Tech Evaluations')).toBeInTheDocument();
    expect(screen.getByText('test#8704')).toBeInTheDocument();
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('Open and close Drawer menu', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Drawer />
        </Router>
      </Provider>,
    );
    expect(screen.getByAltText('menu')).toBeInTheDocument();
    userEvent.click(screen.getByAltText('menu'));
    expect(screen.getByAltText('closeIcon')).toBeInTheDocument();
    userEvent.click(screen.getByAltText('closeIcon'));
    expect(screen.getByAltText('menu')).toBeInTheDocument();
  });
});

describe('Testing Drawer menu links', () => {
  it('Logout and redirect to login', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Drawer />
        </Router>
      </Provider>,
    );
    expect(screen.getByAltText('menu')).toBeInTheDocument();
    userEvent.click(screen.getByAltText('menu'));
    expect(screen.getByText('Logout')).toBeInTheDocument();
    userEvent.click(screen.getByText('Logout'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/login');
  });
});

describe('Testing menu links', () => {
  it('Redirect to Journey page', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Drawer />
        </Router>
      </Provider>,
    );
    expect(screen.getByAltText('menu')).toBeInTheDocument();
    userEvent.click(screen.getByAltText('menu'));
    expect(screen.getByText('Interview Journey')).toBeInTheDocument();
    userEvent.click(screen.getByText('Interview Journey'));
    expect(window.location.pathname).toBe('/home');
  });

  it('Redirect to Tech Evaluations page', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Drawer />
        </Router>
      </Provider>,
    );
    expect(screen.getByAltText('menu')).toBeInTheDocument();
    userEvent.click(screen.getByAltText('menu'));
    expect(screen.getByText('Tech Evaluations')).toBeInTheDocument();
    userEvent.click(screen.getByText('Tech Evaluations'));
    expect(window.location.pathname).toBe('/tech');
  });
});
