import { createSlice } from '@reduxjs/toolkit';
import {
  profile,
  updatePrivacy,
  login,
  logout,
  resetPassword,
} from './actions';
import { AuthState } from './types';

const initialState: AuthState = {
  user: null,
  changePasswordStatus: 'idle',
  message: '',
  status: 'idle',
};

export const authSliceReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.user = null;
        state.status = 'loading';
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';
      })
      .addCase(profile.rejected, (state) => {
        state.user = null;
        state.status = 'rejected';
      });
    builder
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.status = 'rejected';
        state.message = action.error.message;
      })
      .addCase(login.pending, (state, action) => {
        state.user = null;
        state.status = 'loading';
        state.message = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = 'success';
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.message = null;
      state.status = 'idle';
      state.changePasswordStatus = 'idle';
    });
    builder
      .addCase(resetPassword.rejected, (state, action) => {
        state.message = action.error.message;
        state.changePasswordStatus = 'rejected';
      })
      .addCase(resetPassword.pending, (state) => {
        state.changePasswordStatus = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.changePasswordStatus = 'success';
        state.message = null;
      });
    builder
      .addCase(updatePrivacy.pending, (state) => {
        state.user = null;
        state.status = 'loading';
      })
      .addCase(updatePrivacy.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';
      })
      .addCase(updatePrivacy.rejected, (state) => {
        state.user = null;
        state.status = 'rejected';
      });
  },
});

export default authSliceReducer.reducer;
