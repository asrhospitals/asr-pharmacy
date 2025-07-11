import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { inventoryBaseApi } from './services/inventoryBaseApi';
import { billApi } from './services/billApi';
import userReducer from './services/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [inventoryBaseApi.reducerPath]: inventoryBaseApi.reducer,
    [billApi.reducerPath]: billApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      inventoryBaseApi.middleware,
      billApi.middleware
    ),
}); 