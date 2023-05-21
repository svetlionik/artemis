import { createSlice } from '@reduxjs/toolkit';

import { toggleAdditionalSection } from './actions';

import { SkillMatrixState } from './types';

const initialState: SkillMatrixState = {
  activeSection: 'no',
};

export const skillMatrixSlice = createSlice({
  name: 'skillMatrix',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleAdditionalSection.fulfilled, (state, action) => {
      state.activeSection = action.payload;
    });
  },
});
export default skillMatrixSlice.reducer;
