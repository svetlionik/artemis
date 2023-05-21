import { axiosInstance } from '../../shared/services/axiosConfig.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from 'shared/services/auth.service';
import { UserProps, ResetPasswordPayload } from 'store/auth/types';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const profile = createAsyncThunk('auth/getProfile', async () => {
  const { data } = await axiosInstance.get(`${BASE_URL}/api/public/users/me`);
  return data;
});

export const updatePrivacy = createAsyncThunk(
  'auth/updatePrivacy',
  async (payload: { privacyChecked: boolean }) => {
    const { data } = await axiosInstance.patch(
      `${BASE_URL}/api/public/users/me`,
      payload,
    );
    return data;
  },
);

export const login = createAsyncThunk('auth/login', async (user: UserProps) => {
  const { username, password } = user;
  return await authService.signIn(username, password);
});

export const logout = createAsyncThunk('auth/logout', () => {
  return authService.signOut();
});

export const resetPassword = createAsyncThunk(
  'auth/reset',
  async ({ oldPassword, newPassword }: ResetPasswordPayload) => {
    return await authService.resetPassword({
      oldPassword,
      newPassword,
    });
  },
);
