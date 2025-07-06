import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkshopState {
  favorites: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WorkshopState = {
  favorites: [],
  status: 'idle',
  error: null,
};

const workshopSlice = createSlice({
  name: 'workshops',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { addFavorite, removeFavorite, setStatus, setError, clearError } = workshopSlice.actions;
export default workshopSlice.reducer;
