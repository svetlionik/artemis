import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResetPassword } from 'boxes/Auth/ResetPassword/ResetPassword';
import ResetPasswordForm from '../../boxes/Auth/ResetPassword/ResetPasswordForm';
import authService from '../../shared/services/auth.service';
import { Provider } from 'react-redux';
import mockStore from 'test/mockStore';
import { act } from 'react-dom/test-utils';

const onSubmit = jest.fn();
let status = '';
const handleResetPassword = jest.fn();
const handleChange = jest.fn();
const handleSubmit = jest.fn();

describe('Testing reset password', () => {
  it('Reset password page loads successfully', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <ResetPassword />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Change your password.')).toBeInTheDocument();
    expect(screen.getByLabelText('Current Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Repeat Password:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Current Password')).toHaveValue('');
    expect(screen.getByLabelText('New Password:')).toHaveValue('');

    expect(screen.getByText('Change')).toBeInTheDocument();
  });

  it('Test form with input values', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <ResetPasswordForm onSubmit={onSubmit} status={status} />
        </Router>
      </Provider>,
    );
    // act(() => {
    userEvent.type(screen.getByPlaceholderText('Current Password'), 'norris');

    userEvent.type(screen.getByPlaceholderText('Password'), 'lee');

    userEvent.type(screen.getByPlaceholderText('Repeat Password'), 'lee');

    userEvent.click(screen.getByText('Change'));
    // });
    // expect(handleSubmit).toHaveBeenCalledTimes(1);
    // expect(
    //   (screen.getByPlaceholderText('Current Password') as HTMLInputElement)
    //     .value,
    // ).toEqual('norris');
    // expect(
    //   (screen.getByPlaceholderText('Password') as HTMLInputElement).value,
    // ).toEqual('lee');
    // expect(
    //   (screen.getByPlaceholderText('Repeat Password') as HTMLInputElement)
    //     .value,
    // ).toEqual('lee');
    // expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(
      (screen.getByPlaceholderText('Current Password') as HTMLInputElement)
        .value,
    ).toEqual('norris');
    expect(
      (screen.getByPlaceholderText('Password') as HTMLInputElement).value,
    ).toEqual('lee');
    expect(
      (screen.getByPlaceholderText('Repeat Password') as HTMLInputElement)
        .value,
    ).toEqual('lee');
    expect(window.location.pathname).toBe('/login');
  });
  it('Test reset password method from auth service', () => {
    // authService.resetPassword = jest.fn();
    let onSubmit = jest.fn();
    let resetPassword = jest.fn();
    let status = 'success';
    render(
      <Provider store={mockStore}>
        <Router>
          <ResetPasswordForm onSubmit={onSubmit} status={status} />
        </Router>
      </Provider>,
    );
    userEvent.click(screen.getByText('Change'));
    // expect(resetPassword).toHaveBeenCalledTimes(1);
    expect(window.location.pathname).toBe('/login');
  });
});
