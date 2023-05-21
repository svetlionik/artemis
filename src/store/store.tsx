import { configureStore } from '@reduxjs/toolkit';

import skillMatrixSliceReducer from './skillsMatrix/reducer';
import projectSliceReducer from './projects/reducer';
import authSliceReducer from './auth/reducer';
import testsSliceReducer from './tests/reducer';
import journeySliceReducer from './journey/reducer';
import techSliceReducer from './tech/reducer';
import practicalSliceReducer from './practical/reducer';

const store = configureStore({
  reducer: {
    skillMatrix: skillMatrixSliceReducer,
    projects: projectSliceReducer,
    auth: authSliceReducer,
    tests: testsSliceReducer,
    journey: journeySliceReducer,
    tech: techSliceReducer,
    practical: practicalSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
