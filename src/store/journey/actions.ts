import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'shared/services/axiosConfig.service';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllStages = createAsyncThunk(
  'journey/getAllStages',
  async () => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/public/journey-stages`,
    );
    return data;
  },
);

export const getAllBenefits = createAsyncThunk(
  'journey/getAllBenefits',
  async (country: string) => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/admin/benefits/${country}`,
    );
    return data;
  },
);

export const getInterviewDetails = createAsyncThunk(
  'journey/interviewDetails',
  async () => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/public/journey-stages/hr-interviewer-details`,
    );
    return data;
  },
);

export const getStageDetails = createAsyncThunk(
  'journey/stageDetails',
  async (stage: string) => {
    const data = await axiosInstance.get(
      `${BASE_URL}/api/public/journey-stages/${stage}`,
    );
    return data;
  },
);

export const currentStageName = createAsyncThunk(
  'journey/currentStageName',
  (name: string) => {
    return name;
  },
);
