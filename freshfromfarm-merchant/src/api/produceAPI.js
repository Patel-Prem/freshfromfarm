import api from './axiosInstance';

export const getAllProduce = async (params) => api.get(`/produce/getAllProduce`, { params });
export const getProduce = async (produceId) => api.get(`/produce/getProduce/${produceId}`);
export const addProduce = async (data) => api.post(`/produce/addProduce`, data);