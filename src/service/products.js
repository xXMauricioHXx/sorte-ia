import api from "./api";

const mock = [
  {
    id: "lotofacil",
    name: "Lotofácil",
  },
  { id: "megasena", name: "Mega-Sena" },
  { id: "mega-virada", name: "Mega da Virada" },
];

export const getProducts = async () => {
  try {
    const result = await api.get("/products");
    const { data } = result;

    return data.map((item) => ({ id: item.id, name: item.name }));
  } catch (err) {
    console.log(`Failed to get products - ${err.message}`);
  }
};
