import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchLaunchesService, fetchRocketDetails } from '../../services/spaceXService';
import { Launch, Rocket } from '../../types/Launch';

type LaunchState = {
  launches: Launch[];
  rockets: { [key: string]: string };
  loading: boolean;
  error: string | null;
  page: number;
  isFetchingMore: boolean;
};

const initialState: LaunchState = {
  launches: [],
  rockets: {},
  loading: false,
  error: null,
  page: 1,
  isFetchingMore: false,
};

export const fetchLaunches = createAsyncThunk<Launch[], { page: number }>(
  'launches/fetchLaunches',
  async ({ page }) => {
    const response = await fetchLaunchesService(page);
    return response;
  }
);

export const fetchRocket = createAsyncThunk<{ rocketId: string; rocketName: string }, string>(
  'launches/fetchRocket',
  async (rocketId) => {
    const rocketData: Rocket = await fetchRocketDetails(rocketId);
    return { rocketId, rocketName: rocketData.name };
  }
);

const launchesSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.loading = true;
        } else {
          state.isFetchingMore = true;
        }
        state.error = null;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.launches = action.payload;
        } else {
          state.launches = [...state.launches, ...action.payload];
        }
        state.loading = false;
        state.isFetchingMore = false;
      })
      .addCase(fetchLaunches.rejected, (state, action) => {
        state.loading = false;
        state.isFetchingMore = false;
        state.error = action.error.message || 'Failed to fetch launches';
      })
      .addCase(fetchRocket.fulfilled, (state, action) => {
        const { rocketId, rocketName } = action.payload;
        state.rockets[rocketId] = rocketName;
      });
  },
});

export default launchesSlice.reducer;
