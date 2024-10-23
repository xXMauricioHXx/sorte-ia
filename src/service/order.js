import api from "./api";

export const getOrderById = async (id) => {
  try {
    const result = await api.get(`/orders/detail/${id}`);
    return result.data;
  } catch (err) {
    return null;
  }
};

export const getOrderByEmail = async (email) => {
  try {
    const result = await api.get(`/orders/${email}`);
    return result.data;
  } catch (err) {
    return null;
  }
};
