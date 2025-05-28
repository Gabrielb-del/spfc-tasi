import React, { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export const useCarrinho = () => useContext(CarrinhoContext);

export const CarrinhoProvider = ({ children }) => {
  const [itens, setItens] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setItens((prev) => {
      const existe = prev.find(p => p._id === produto._id);
      if (existe) {
        // aumenta quantidade se já existir
        return prev.map(p =>
          p._id === produto._id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      // adiciona com quantidade 1
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const alterarQuantidade = (id, delta) => {
    setItens((prevItens) =>
      prevItens.map((item) =>
        item._id === id
          ? {
            ...item,
            quantidade: Math.max(1, item.quantidade + delta),
          }
          : item
      )
    );
  };

  const removerDoCarrinho = (id) => {
    setItens((prev) => prev.filter(item => item._id !== id));
  };

  const limparCarrinho = () => setItens([]);


  return (
    <CarrinhoContext.Provider value={{
      itens, adicionarAoCarrinho, removerDoCarrinho,
      alterarQuantidade, limparCarrinho
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
};


