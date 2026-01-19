import api from './axiosInstance';

// export const getOrders = async () => {
//     const res = await api.get(`/order/getOrders`);
//     return res.data.merchantOrders; // ✅ return the actual orders array
// }; 
export const getOrders = async () => api.get(`/order/getOrders`);
export const checkOut = async (data) => api.put(`/order/checkOut`, data);
export const changeStatus = async (movingItemId, updatedStatus) => api.put(`/order/${movingItemId}/changeStatus`, updatedStatus);