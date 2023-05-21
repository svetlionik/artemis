import { createSlice } from '@reduxjs/toolkit';

import {
  currentStageName,
  getAllBenefits,
  getAllStages,
  getInterviewDetails,
  getStageDetails,
} from './actions';
import { JourneyState, StageDetails } from './types';

const initialState: JourneyState = {
  stages: {},
  stagesStatus: 'idle',
  benefits: [],
  benefitsStatus: 'idle',
  interviewer: { name: '', email: '' },
  interviewerStatus: 'idle',
  stageDetails: {} as StageDetails,
  stageDetailStatus: 'idle',
  currentStage: '',
};

export const journeySliceReducer = createSlice({
  name: 'journey',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStages.fulfilled, (state, action) => {
        state.stagesStatus = 'success';
        state.stages = action.payload.data;
      })
      .addCase(getAllStages.pending, (state) => {
        state.stagesStatus = 'loading';
      })
      .addCase(getAllStages.rejected, (state) => {
        state.stagesStatus = 'rejected';
      });
    builder.addCase(getAllBenefits.fulfilled, (state, action) => {
      state.benefits = action.payload.data;
      state.benefitsStatus = 'success';
    });
    builder
      .addCase(getInterviewDetails.fulfilled, (state, action) => {
        state.interviewer = action.payload.data;
        state.interviewerStatus = 'success';
      })
      .addCase(getInterviewDetails.pending, (state) => {
        state.interviewerStatus = 'loading';
      })
      .addCase(getInterviewDetails.rejected, (state) => {
        state.interviewerStatus = 'rejected';
      });
    builder
      .addCase(getStageDetails.fulfilled, (state, action) => {
        state.stageDetails = action.payload.data;
        state.stageDetailStatus = 'success';
      })
      .addCase(getStageDetails.pending, (state) => {
        state.stageDetailStatus = 'loading';
      })
      .addCase(getStageDetails.rejected, (state) => {
        state.stageDetailStatus = 'rejected';
      });
    builder.addCase(currentStageName.fulfilled, (state, action) => {
      state.currentStage = action.payload;
    });
  },
});

export default journeySliceReducer.reducer;
