import { createSlice } from '@reduxjs/toolkit';

import {
  checkSkillMatrix,
  getTechRequirements,
  skillMatrixInProgress,
} from './actions';
import { TechState } from './types';

const initialState: TechState = {
  skillMatrixExists: false,
  matrixInProgress: false,
  techRequirements: [],
  techRequirementStatus: 'idle',
};

export const techSliceReducer = createSlice({
  name: 'tech',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkSkillMatrix.fulfilled, (state, action) => {
      state.skillMatrixExists = action.payload.data;
    });
    builder
      .addCase(getTechRequirements.fulfilled, (state, action) => {
        state.techRequirements = action.payload.data;
        state.techRequirementStatus = 'success';
      })
      .addCase(getTechRequirements.pending, (state, action) => {
        state.techRequirementStatus = 'loading';
      })
      .addCase(getTechRequirements.rejected, (state, action) => {
        state.techRequirementStatus = 'failed';
      });
    builder
      .addCase(skillMatrixInProgress.fulfilled, (state, action) => {
        if (action.payload > 0) {
          state.matrixInProgress = true;
        }
      })
      .addCase(skillMatrixInProgress.rejected, (state, action) => {
        state.matrixInProgress = false;
      });
  },
});

export default techSliceReducer.reducer;
