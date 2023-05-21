import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from 'boxes/Auth/Login/Login';
import LoginForm from 'boxes/Auth/Login/LoginForm';
import Toasts from 'components/Toasts/Toasts';
import authService from '../../shared/services/auth.service';
import { Provider } from 'react-redux';
import mockStore from 'test/mockStore';
import { act } from 'react-dom/test-utils';

let status = '';
const handleLogin = jest.fn();
const handleChange = jest.fn();
let fieldValue = jest.fn();
const onSubmit = jest.fn();
const handleSubmit = jest.fn().mockImplementation();

let mockOnSuccess = jest.fn();

jest.mock('amazon-cognito-identity-js', () => ({
  ...jest.requireActual('amazon-cognito-identity-js'),
  authenticateUser: () => ({
    onSuccess: mockOnSuccess,
  }),
}));

describe('Testing login', () => {
  // beforeEach(async () => {

  // });
  it('Initial screen loads successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/welcome to/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue('');
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('Test form with input values', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <LoginForm onSubmit={onSubmit} status={status} />
        </Router>
      </Provider>,
    );
    // act(() => {
    userEvent.type(screen.getByPlaceholderText(/username/i), 'asd');

    userEvent.type(screen.getByPlaceholderText(/password/i), 'bsd');
    userEvent.click(screen.getByText('Login'));
    // });
    // expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(
      (screen.getByPlaceholderText(/username/i) as HTMLInputElement).value,
    ).toEqual('asd');
    expect(
      (screen.getByPlaceholderText(/password/i) as HTMLInputElement).value,
    ).toEqual('bsd');
    expect(window.location.pathname).toBe('/');
  });

  it('Test sign in method from auth service.', async () => {
    authService.signIn = jest.fn().mockImplementation();
    render(
      <Provider store={mockStore}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );
    act(() => {
      userEvent.click(screen.getByText('Login'));
      // authService.signIn = jest.fn().mockImplementation();
    });
    // let logSomethingHere = jest.fn(
    //   await authService.signIn('asdasdsad', 'asdasd'),
    // );
    // expect(handleSubmit).toHaveBeenCalled();
    // console.log(logSomethingHere);
    expect(window.location.pathname).toBe('/');
  });
});

describe('Possible situation after clicked on login button', () => {
  it('Show Notifications for incorrect username or password', async () => {
    let errorMsg = 'Please Enter Username and Password';
    let show = true;
    let handleClose = jest.fn();
    render(
      <Provider store={mockStore}>
        <Toasts handleClose={handleClose} show={show} errorMsg={errorMsg} />
        <Router>
          <Login />
        </Router>
      </Provider>,
    );
    fireEvent.change(screen.getByLabelText(/username:/i), 'chuck');
    fireEvent.change(screen.getByLabelText(/password:/i), 'noris');
    userEvent.click(screen.getByText('Login'));

    expect(
      await screen.findByText('Please Enter Username and Password'),
    ).toBeInTheDocument();
  });
  it('Show Notifications for empty username or password', async () => {
    let errorMsg = 'Please Enter Username and Password';
    let show = true;
    let handleClose = jest.fn();
    render(
      <Provider store={mockStore}>
        <Toasts handleClose={handleClose} show={show} errorMsg={errorMsg} />
        <Router>
          <Login />
        </Router>
      </Provider>,
    );
    userEvent.type(screen.getByLabelText(/username:/i), '');

    fireEvent.change(screen.getByLabelText(/password:/i), '');
    userEvent.click(screen.getByText('Login'));
    expect(
      await screen.findByText('Please Enter Username and Password'),
    ).toBeInTheDocument();
  });
});
