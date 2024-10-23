import api from "./api";

export const getPacks = async () => {
  try {
    const result = await api.get("/packs");
    const { data } = result;

    return data.map((item) => ({
      numOfGames: item.quantity,
      price: item.price,
      selected: false,
      bestSeller: item.quantity === 15,
      id: item.id,
    }));
  } catch (err) {
    console.log(`Failed to get packs - ${err.message}`);
  }
};
