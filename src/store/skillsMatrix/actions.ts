import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const fieldHandler = createAction('handler');

export const toggleAdditionalSection = createAsyncThunk(
  'toggleSection',
  (section: string) => {
    return section;
  },
);
