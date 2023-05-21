import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'shared/services/axiosConfig.service';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const startPracticalTask = createAsyncThunk(
  'tech/startPractical',
  async ({ type, language }: { type: string; language: string }) => {
    const data = await axiosInstance.post(
      `${BASE_URL}/api/public/practical-tasks/${type}`,
      {
        language: language,
      },
    );
    return data;
  },
);

export const getPracticalTask = createAsyncThunk(
  'tech/getPracticalTask',
  async (type: string) => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/public/practical-tasks/${type}`,
    );
    return data;
  },
);

export const submitPracticalTask = createAsyncThunk(
  'tech/submitPracticalTask',
  async (type: string) => {
    const data = await axiosInstance.post(
      `${BASE_URL}/api/public/practical-tasks/submit/${type}`,
    );
    return data;
  },
);
