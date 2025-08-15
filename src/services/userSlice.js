import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  activeCompany: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.activeCompany = action.payload.user?.activeCompany || null;
      state.loading = false;
      state.error = null;
    },
    setActiveCompany: (state, action) => {
      state.activeCompany = action.payload;
      
      if (state.user) {
        state.user.activeCompany = action.payload;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateUserCompanies: (state, action) => {
      if (state.user) {
        state.user.companies = action.payload;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.activeCompany = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setUser,
  setActiveCompany,
  setLoading,
  setError,
  updateUser,
  updateUserCompanies,
  logout,
  clearError
} = userSlice.actions;

export default userSlice.reducer; 