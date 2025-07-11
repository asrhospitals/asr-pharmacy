import { createSlice } from '@reduxjs/toolkit';

// Rehydrate from localStorage
const persistedUser = localStorage.getItem('user');
const persistedToken = localStorage.getItem('token');

const initialState = {
  user: persistedUser ? JSON.parse(persistedUser) : null,
  token: persistedToken || null,
  isAuthenticated: !!persistedUser && !!persistedToken,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Normalize role to lowercase string for RBAC
      const user = { ...action.payload.user };
      if (user.role && typeof user.role === 'string') {
        user.role = user.role.toLowerCase();
      }
      state.user = user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Remove from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer; 