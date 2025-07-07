// src/Redux/app/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../features/auth/authSlice';
import { apiSlice } from '../features/api/apiSlice';

// 1. Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// 2. Create persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only auth will be persisted
};

// 3. Wrap combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(apiSlice.middleware),
});

// 5. Export persistor
export const persistor = persistStore(store);

// 6. Typings
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
