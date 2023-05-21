import { createAsyncThunk } from '@reduxjs/toolkit';
import { count } from 'dexie/repositories/skills.repository';
import { axiosInstance } from 'shared/services/axiosConfig.service';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const username: any = localStorage.getItem('username');

export const checkSkillMatrix = createAsyncThunk(
  'tech/checkMatrix',
  async () => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/public/skill-submissions/exists`,
    );
    return data;
  },
);

export const getTechRequirements = createAsyncThunk(
  'tech/requirements',
  async () => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/public/technical-evaluations`,
    );
    return data;
  },
);

export const checkPractical = createAsyncThunk('tech/practical', async () => {
  const data = await axiosInstance.get(`${BASE_URL}/`);
  return data;
});

export const skillMatrixInProgress = createAsyncThunk(
  'tech/inProgressMatrix',
  async () => {
    const data = await count(username);
    return data;
  },
);
