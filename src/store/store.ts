import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

import launchesReducer from './slices/launchesSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    launches: launchesReducer,
    theme: themeReducer,
  },
  devTools: false,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer()),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
