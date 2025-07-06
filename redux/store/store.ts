// src/Redux/app/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { workshopApi } from './api/workshopApi';
import { bookingApi } from './api/bookingApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import workshopReducer from './slices/workshopSlice';

// 1. Individual persist configs
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

const workshopPersistConfig = {
  key: 'workshops',
  storage,
  whitelist: ['favorites'],
};

// 2. Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  workshops: persistReducer(workshopPersistConfig, workshopReducer),
  [workshopApi.reducerPath]: workshopApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
});

// 3. Root persist config (optional, not needed here since we persist slices individually)
const persistedReducer = rootReducer;

// 4. Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(workshopApi.middleware, bookingApi.middleware),
});


setupListeners(store.dispatch);

// 6. Export persistor
export const persistor = persistStore(store);

// 7. Typings
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
