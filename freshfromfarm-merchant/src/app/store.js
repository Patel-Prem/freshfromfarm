import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    theme: themeReducer,
  }
});

export default store;
