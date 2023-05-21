import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'shared/services/axiosConfig.service';
import { resetQuestionsScroll } from 'shared/services/common';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllTestsIds = createAsyncThunk(
  'tests/allQuestionsIds',
  async (code: string) => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/public/tests/${code}`,
    );
    return data;
  },
);

export const submitQuestionAnswer = createAsyncThunk(
  'tests/submitQuestion',
  async (questionAnswer: any) => {
    let { id, code, answer, answerIndexes } = questionAnswer;
    const data = axiosInstance.post(
      `${BASE_URL}/api/public/question-submissions`,
      {
        questionId: id,
        testCode: code,
        answers: answer,
      },
    );
    let response = await data;
    const finalData = { ...response.data, answerIndexes };
    data.then(() =>{
      resetQuestionsScroll();
    });

    return finalData;
  },
);

export const startTest = createAsyncThunk(
  'tests/startTest',
  async (code: string) => {
    const data = await axiosInstance.post(
      `${BASE_URL}/api/public/test-submissions/${code}/start`,
    );
    return data;
  },
);

export const testStatus = createAsyncThunk(
  'tests/testStatus',
  async (code: string) => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/public/test-submissions/${code.replace('#', '%23')}`,
    );
    return data;
  },
);

export const submitTest = createAsyncThunk(
  'tests/submitTest',
  async (code: string, { rejectWithValue }) => {
    try {
      const data = await axiosInstance.post(
        `${BASE_URL}/api/public/test-submissions/${code}/submit`,
      );
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  },
);

export const getQuestionsInfo = createAsyncThunk(
  'tests/questionsInfo',
  async (code: any) => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/public/question-submissions/${code}`,
    );
    return data.data;
  },
);

export const getTestsRequirements = createAsyncThunk(
  'tests/testsRequirements',
  async () => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/public/test-submissions/requirements`,
    );
    return data;
  },
);

export const selectCurrentTestCode = createAsyncThunk(
  'tests/current-test',
  (testCode: string) => {
    return testCode;
  },
);

export const getQuestion = createAsyncThunk(
  'tests/getQuestion',
  async (questionId: string) => {
    const data = await axiosInstance.get(
      `${process.env.REACT_APP_BASE_URL}/api/public/questions/${questionId}`,
    );
    return data;
  },
);

export const getAllQuestionsInfo = createAsyncThunk(
  'tests/allQuestionsInfo',
  async (code: string) => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/public/question-submissions?testCode=${code}`,
    );
    return data;
  },
);
