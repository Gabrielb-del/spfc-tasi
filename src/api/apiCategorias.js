import axios from "axios";

const API = "https://backend-completo.vercel.app/app/categorias";

export const getCategorias = async (token) => {
  const res = await axios.get(API, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const createCategoria = async (token, nome) => {
  const res = await axios.post(
    API,
    { nome_categoria: nome },
    { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
  );
  return res.data;
};

export const updateCategoria = async (token, id, nome) => {
  const res = await axios.put(
    API, 
    { id, nome_categoria: nome },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
  return res.data;
};

export const deleteCategoria = async (token, id) => {
  const res = await axios.delete(API, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    data: { id }, 
  });
  return res.data;
};