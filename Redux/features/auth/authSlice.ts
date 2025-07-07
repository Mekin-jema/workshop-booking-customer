import { createSlice } from '@reduxjs/toolkit';

 interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | string; // Add more roles if needed
}


const initialState = {
  user: null as User | null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
