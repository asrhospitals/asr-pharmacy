import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { inventoryBaseApi } from './services/inventoryBaseApi';
import { billApi } from './services/billApi';
import { companyApi } from './services/companyApi';
import { storeApi } from './services/storeApi';
import { itemApi } from './services/itemApi';
import { hsnApi } from './services/hsnApi';
import { rackApi } from './services/rackApi';
import { saltApi } from './services/saltApi';
import { unitApi } from './services/unitApi';
import { mfrApi } from './services/mfrApi';
import { patientApi } from './services/patientApi';
import userReducer from './services/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [inventoryBaseApi.reducerPath]: inventoryBaseApi.reducer,
    [billApi.reducerPath]: billApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [hsnApi.reducerPath]: hsnApi.reducer,
    [rackApi.reducerPath]: rackApi.reducer,
    [saltApi.reducerPath]: saltApi.reducer,
    [unitApi.reducerPath]: unitApi.reducer,
    [mfrApi.reducerPath]: mfrApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      inventoryBaseApi.middleware,
      billApi.middleware,
      companyApi.middleware,
      storeApi.middleware,
      itemApi.middleware,
      hsnApi.middleware,
      rackApi.middleware,
      saltApi.middleware,
      unitApi.middleware,
      mfrApi.middleware,
      patientApi.middleware
    ),
}); 