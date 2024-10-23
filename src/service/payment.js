import api from "./api";

export const createPayment = async (orderId, email, packId, productId) => {
  try {
    const result = await api.post("/orders", {
      email,
      order_id: orderId,
      pack_id: packId,
      product_id: productId,
    });

    return result.data;
  } catch (err) {
    console.log(`Failed to create order - ${err.message}`);
  }
};
