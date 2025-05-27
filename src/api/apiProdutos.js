import axios from "axios";

const API = "https://backend-completo.vercel.app/app/produtos";

export const getProdutos = async (token, usuario) => {
  const url = `https://backend-completo.vercel.app/app/produtos/${usuario}`;
  const res  = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;          
};

export const createProduto = async (token, produto) => {
  const res = await axios.post(
    API,
    produto,
    { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
  );
  return res.data;
};

export const updateProduto = async (token, produto) => {
  const res = await axios.put(
    API,
    produto,
    { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
  );
  return res.data;
};

export const deleteProduto = async (token, id) => {
  const res = await axios.delete(
    API,
    { 
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      data: { id }  
    }
  );
  return res.data;
};
