import React from 'react';
import Contador from './Contador'; // Importamos o contador para usar aqui dentro

function CardProd({ nome, preco, imagem, quantidade, setQuantidade }) {
  return (
    <div className="card-item-completo">
      <img src={imagem} alt={nome} className="img-lanche-card" />
      
      <div className="card-conteudo">
        <h3>{nome}</h3>
        <p className="preco-unitario">Preço unitário: R$ {preco}</p>
        
        {/* Chamamos o contador aqui dentro, passando o que ele precisa */}
        <Contador 
          nome={nome}
          preco={preco}
          quantidade={quantidade}
          setQuantidade={setQuantidade}
        />
      </div>
    </div>
  );
}

export default CardProd;


