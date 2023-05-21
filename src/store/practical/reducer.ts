import { createSlice } from '@reduxjs/toolkit';

import {
  getPracticalTask,
  startPracticalTask,
  submitPracticalTask,
} from './actions';

import { IPracticalState } from './types';

const initialState: IPracticalState = {
  practicalTask: [],
  practicalTaskStatus: 'idle',
  practicalTaskInfo: {
    url: '',
  },
};

export const practicalSliceReducer = createSlice({
  name: 'practical',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitPracticalTask.fulfilled, (state, action) => {
        state.practicalTask = action.payload.data;
        state.practicalTaskStatus = 'success';
      })
      .addCase(submitPracticalTask.pending, (state, action) => {
        state.practicalTaskStatus = 'loading';
      })
      .addCase(submitPracticalTask.rejected, (state, action) => {
        state.practicalTaskStatus = 'failed';
      });
    builder
      .addCase(startPracticalTask.fulfilled, (state, action) => {
        state.practicalTask = action.payload.data;
        state.practicalTaskInfo = action.payload.data;
        state.practicalTaskStatus = 'success';
      })
      .addCase(startPracticalTask.pending, (state, action) => {
        state.practicalTaskStatus = 'loading';
      })
      .addCase(startPracticalTask.rejected, (state, action) => {
        state.practicalTaskStatus = 'failed';
      });
    builder
      .addCase(getPracticalTask.fulfilled, (state, action) => {
        state.practicalTaskInfo = action.payload.data;
        state.practicalTaskStatus = 'success';
      })
      .addCase(getPracticalTask.pending, (state, action) => {
        state.practicalTaskStatus = 'loading';
      })
      .addCase(getPracticalTask.rejected, (state, action) => {
        state.practicalTaskStatus = 'failed';
      });
  },
});

export default practicalSliceReducer.reducer;
