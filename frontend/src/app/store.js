import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import adminReducer from '../features/adminauth/adminAuthSlice';

const middleware = [...getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
})];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    adminAuth: adminReducer
  },
  middleware
});
