import axios from "axios";

export const createVenda = async (token, venda) => {
  const response = await axios.post("https://backend-completo.vercel.app/app/venda", venda, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};