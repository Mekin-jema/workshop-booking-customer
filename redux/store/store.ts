import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { workshopApi } from './api/workshopApi';
import { bookingApi } from './api/bookingApi';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import workshopReducer from './slices/workshopSlice';

// Persist configuration for auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user'],
};

// Persist configuration for workshop slice
const workshopPersistConfig = {
  key: 'workshops',
  storage,
  whitelist: ['favorites'],
};

export const store = configureStore({
  reducer: {
    [workshopApi.reducerPath]: workshopApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    auth: persistReducer(authPersistConfig, authReducer),
    workshops: persistReducer(workshopPersistConfig, workshopReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(workshopApi.middleware, bookingApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
