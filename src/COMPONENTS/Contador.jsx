import React from 'react';

// O Contador RECEBE quantidade e setQuantidade do App.jsx através das props
function Contador({ preco, quantidade, setQuantidade }) {
  
  const adicionar = () => {
    setQuantidade(quantidade + 1);
  };

  const remover = () => {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
    }
  };

  return (
    <div className="bloco-contador">
      <p className="quantidade-texto">Quantidade: {quantidade}</p>
      <p className="subtotal-texto">Subtotal: R$ {preco * quantidade}</p>
      
      <div className="botoes-container">
        <button onClick={adicionar}>Adicionar</button>
        <button onClick={remover}>Remover</button>
      </div>
    </div>
  );
}

export default Contador;