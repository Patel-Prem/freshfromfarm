import api from './axiosInstance';

export const logIn = async (data) => api.post(`/auth/login`, data);
export const signUp = async (data) => api.post(`/auth/signup`, data);
export const signOut = async () => api.post(`/auth/logout`);
export const refreshToken = async () => api.post(`/auth/refresh`);
export const verifyOtp = (data) => api.post(`/auth/verifyOtp`, data);
export const forgetPassword = (data) => api.post(`/auth/forgetPassword`, data);
export const resetPassword = (token, data) => api.post(`/auth/resetPassword/${token}`, data);