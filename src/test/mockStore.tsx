import { configureStore } from '@reduxjs/toolkit';

import skillMatrixSliceReducer from '../store/skillsMatrix/reducer';
import projectSliceReducer from '../store/projects/reducer';
import authSliceReducer from '../store/auth/reducer';
import testsSliceReducer from '../store/tests/reducer';
import journeySliceReducer from '../store/journey/reducer';
import techSliceReducer from '../store/tech/reducer';
import { StageDetails } from 'store/journey/types';
import practicalSliceReducer from 'store/practical/reducer';

const mockStore = configureStore({
  reducer: {
    skillMatrix: skillMatrixSliceReducer,
    projects: projectSliceReducer,
    auth: authSliceReducer,
    tests: testsSliceReducer,
    journey: journeySliceReducer,
    tech: techSliceReducer,
    practical: practicalSliceReducer,
  },
  preloadedState: {
    auth: {
      user: {
        email: 'test@musala.com',
        username: 'test#8704',
        sub: 'asdasdasd',
        status: 'CONFIRMED',
        profile: 'QA',
        givenName: 'John',
        familyName: 'Doe',
        hasTestRequirement: true,
        hasSkillRequirement: true,
        hasPracticalTaskRequirement: true,
      },
      changePasswordStatus: 'idle',
      message: null,
      status: 'success',
    },
    journey: {
      stages: {
        STARTED: {
          type: 'STARTED',
          status: 'PASSED',
          dateTime: '2022-12-19T11:26:00.795',
          requestedAt: '',
        },
        HR: {
          type: 'HR',
          status: 'PASSED',
          dateTime: '2022-12-19T11:26:00.795',
          requestedAt: '',
        },
        TECHNICAL: {
          type: 'TECHNICAL',
          status: 'ACTIVE',
          dateTime: '2022-12-19T11:26:00.795',
          requestedAt: '',
        },
        OFFER: {
          type: 'OFFER',
          status: 'PASSED',
          dateTime: '2022-12-19T11:26:00.795',
          requestedAt: '',
        },
        DONE: {
          type: 'DONE',
          status: 'PASSED',
          dateTime: '2022-12-19T11:26:00.795',
          requestedAt: '',
        },
      },
      stagesStatus: 'success',
      benefits: [],
      benefitsStatus: 'idle',
      interviewer: {
        name: '',
        email: '',
        photoURL: '',
        linkedinURL: '',
      },
      interviewerStatus: 'idle',
      stageDetails: {} as StageDetails,
      stageDetailStatus: 'idle',
      currentStage: '',
    },
    tech: {
      techRequirements: [
        {
          type: 'SKILLS',
          status: 'SUBMITTED',
          submittedAt: '2022-12-20T15:48:48.6368783',
        },
        {
          type: 'PRACTICAL',
          status: 'NOT_STARTED',
          code: 'DEV_GATEWAYS',
          requestedAt: '2022-12-20T15:47:52.2205558',
        },
        {
          type: 'DUMMY',
          status: 'SUBMITTED',
          code: 'DUMMY',
          durationMinutes: 3,
          submittedAt: '2022-12-20T15:51:51.0341708',
          requestedAt: '2022-12-20T15:47:52.2205558',
        },
        {
          type: 'ADMISSION',
          status: 'NOT_STARTED',
          code: 'ADM',
          durationMinutes: 25,
          submittedAt: '2022-12-20T15:51:51.0341708',
          requestedAt: '2022-12-20T15:47:52.2205558',
        },
        {
          type: 'ADMISSION',
          status: 'IN_PROGRESS',
          code: 'ADM#QA',
          durationMinutes: 25,
          submittedAt: '2022-12-20T15:51:51.0341708',
          requestedAt: '2022-12-20T15:47:52.2205558',
        },
      ],
      skillMatrixExists: false,
      matrixInProgress: true,
      techRequirementStatus: 'success',
    },
    practical: {
      practicalTask: [],
      practicalTaskStatus: 'success',
      practicalTaskInfo: { url: 'asdasdasdasdasd' },
    },
  },
});

export type RootState = ReturnType<typeof mockStore.getState>;
export default mockStore;
