import React, { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export const useCarrinho = () => useContext(CarrinhoContext);

export const CarrinhoProvider = ({ children }) => {
  const [itens, setItens] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setItens((prev) => [...prev, produto]);
  };

  const removerDoCarrinho = (id) => {
    setItens((prev) => prev.filter(item => item._id !== id));
  };

  const limparCarrinho = () => setItens([]);

  return (
    <CarrinhoContext.Provider value={{ itens, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};
