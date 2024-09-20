import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchLaunchesService, fetchRocketDetails } from '../../services/spaceXService';
import { Launch, Rocket } from '../../types/Launch';

interface LaunchState {
  launches: Launch[];
  rockets: { [key: string]: Rocket };
  loading: boolean;
  loadingRockets: boolean;
  error: string | null;
  isFetchingMore: boolean;
  page: number;
}

const initialState: LaunchState = {
  launches: [],
  rockets: {},
  loading: false,
  loadingRockets: false,
  error: null,
  isFetchingMore: false,
  page: 1,
};

export const fetchLaunches = createAsyncThunk(
  'launches/fetchLaunches',
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await fetchLaunchesService(page, limit);
    return { data: response, page };
  }
);

export const fetchRocket = createAsyncThunk('launches/fetchRocket', async (rocketId: string) => {
  const response = await fetchRocketDetails(rocketId);
  return { rocketId, rocket: response };
});

const launchesSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.error = null;
        if (state.page > 1) {
          state.isFetchingMore = true;
        } else {
          state.loading = true;
        }
      })

      .addCase(fetchLaunches.fulfilled, (state, action) => {
        const { data, page } = action.payload;

        if (page === 1) {
          state.launches = data;
        } else {
          state.launches = [...state.launches, ...data];
        }

        state.loading = false;
        state.isFetchingMore = false;
        state.loadingRockets = true;
      })

      .addCase(fetchLaunches.rejected, (state, action) => {
        state.loading = false;
        state.isFetchingMore = false;
        state.error = action.error.message || 'Erro ao buscar lançamentos';
      })

      .addCase(fetchRocket.fulfilled, (state, action) => {
        const { rocketId, rocket } = action.payload;
        state.rockets[rocketId] = rocket;

        const allRocketsLoaded = state.launches.every((launch) => state.rockets[launch.rocket]);

        if (allRocketsLoaded) {
          state.loadingRockets = false;
        }
      })

      .addCase(fetchRocket.rejected, (state, action) => {
        state.loadingRockets = false;
        state.error = action.error.message || 'Erro ao buscar detalhes do foguete';
      });
  },
});

export default launchesSlice.reducer;
