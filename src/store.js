import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
// import { inventoryBaseApi } from './services/inventoryBaseApi';
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
import { prescriptionApi } from './services/prescriptionApi';
import { doctorApi } from './services/doctorApi';
import { groupApi } from './services/groupApi';
import { ledgerApi } from './services/ledgerApi';
import { transactionApi } from './services/transactionApi';
import userReducer from './services/userSlice';
import { salesBillApi } from './services/salesBillApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    // [inventoryBaseApi.reducerPath]: inventoryBaseApi.reducer,
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
    [prescriptionApi.reducerPath] : prescriptionApi.reducer,
    [doctorApi.reducerPath] : doctorApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [ledgerApi.reducerPath]: ledgerApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [salesBillApi.reducerPath] : salesBillApi.reducer,
     user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      // inventoryBaseApi.middleware,
      billApi.middleware,
      companyApi.middleware,
      storeApi.middleware,
      itemApi.middleware,
      hsnApi.middleware,
      rackApi.middleware,
      saltApi.middleware,
      unitApi.middleware,
      mfrApi.middleware,
      patientApi.middleware,
      prescriptionApi.middleware,
      doctorApi.middleware,
      groupApi.middleware,
      ledgerApi.middleware,
      transactionApi.middleware,
      salesBillApi.middleware,
    ),
}); 