import { createSlice } from '@reduxjs/toolkit';
import {
  getAllTestsIds,
  getQuestionsInfo,
  getTestsRequirements,
  selectCurrentTestCode,
  submitQuestionAnswer,
  testStatus,
  submitTest,
  getQuestion,
  getAllQuestionsInfo,
  startTest,
} from './actions';

type AuthState = {
  questions: any;
  answers: any;
  timer: number;
  status: string;
  questionsInfo: any;
  requirements: any;
  currentTest: string;
  currentAnswers: any;
  testInfoStatus: string;
  currentQuestion: any;
  questionStatus: string;
  currentQuestionsInfo: any;
  questionInfoStatus: string;
  testsStatus: string;
};
const initialState: AuthState = {
  questions: {},
  answers: [],
  timer: 0,
  status: '',
  questionsInfo: [],
  requirements: [],
  currentTest: '',
  currentAnswers: [],
  testInfoStatus: 'idle',
  currentQuestion: {},
  questionStatus: 'idle',
  currentQuestionsInfo: [],
  questionInfoStatus: 'idle',
  testsStatus: 'idle',
};

export const testsSliceReducer = createSlice({
  name: 'tests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTestsIds.fulfilled, (state, action) => {
        state.testInfoStatus = 'success';
        state.questions = action.payload.data;
      })
      .addCase(getAllTestsIds.pending, (state) => {
        state.testInfoStatus = 'loading';
      })
      .addCase(getAllTestsIds.rejected, (state) => {
        state.testInfoStatus = 'rejected';
      });
    builder
      .addCase(submitQuestionAnswer.fulfilled, (state, action: any) => {
        let questionAnswer = action.payload;
        let oldCurrentAnswers = state.currentAnswers;
        let isQuestionAnswerExist = oldCurrentAnswers.find(
          (item: any) => item.questionId === questionAnswer.questionId,
        );
        state.answers = questionAnswer;
        if (isQuestionAnswerExist) {
          let filteredQuestionsAnswers = oldCurrentAnswers.filter(
            (item: any) =>
              item.questionId !== isQuestionAnswerExist?.questionId,
          );
          state.currentAnswers = [
            ...filteredQuestionsAnswers,
            { ...questionAnswer },
          ];
        } else {
          state.currentAnswers = [...oldCurrentAnswers, { ...questionAnswer }];
        }
      })
      .addCase(submitQuestionAnswer.rejected, (state) => {
        state.testsStatus = 'rejected';
      });
    builder.addCase(submitTest.fulfilled, (state) => {
      state.currentAnswers = [];
      state.currentQuestionsInfo = [];
      state.currentQuestion = null;
      state.questionStatus = 'idle';
      state.testInfoStatus = 'idle';
      state.questionInfoStatus = 'idle';
    });
    builder.addCase(testStatus.fulfilled, (state, action) => {
      state.timer = action.payload.data.seconds;
      state.status = action.payload.data.status;
    });
    builder.addCase(getQuestionsInfo.fulfilled, (state, action) => {
      state.questionsInfo = action.payload;
    });
    builder
      .addCase(getTestsRequirements.fulfilled, (state, action) => {
        state.requirements = action.payload.data;
      })
      .addCase(getTestsRequirements.pending, (state) => {
        state.requirements = [];
      });
    builder.addCase(selectCurrentTestCode.fulfilled, (state, action) => {
      state.currentTest = action.payload;
      state.requirements = [];
    });
    builder
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.currentQuestion = action?.payload?.data;
        state.questionStatus = 'success';
      })
      .addCase(getQuestion.pending, (state) => {
        state.questionStatus = 'loading';
      })
      .addCase(getQuestion.rejected, (state) => {
        state.questionStatus = 'rejected';
      });
    builder
      .addCase(getAllQuestionsInfo.fulfilled, (state, action) => {
        state.currentQuestionsInfo = action?.payload?.data;
        state.currentAnswers = action?.payload.data;
        state.questionInfoStatus = 'success';
      })
      .addCase(getAllQuestionsInfo.pending, (state) => {
        state.questionInfoStatus = 'loading';
      })
      .addCase(getAllQuestionsInfo.rejected, (state) => {
        state.questionInfoStatus = 'rejected';
      });
    builder.addCase(startTest.rejected, (state) => {
      state.testsStatus = 'rejected';
    });
  },
});

export default testsSliceReducer.reducer;
