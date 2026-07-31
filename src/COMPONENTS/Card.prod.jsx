import React from 'react';
import Contador from './Contador';

function CardProd({ nome, preco, imagem, quantidade, setQuantidade }) {
  return (
    <div className="card-item-completo">
      <img src={imagem} alt={nome} className="img-lanche-card" />
      
      <div className="card-conteudo">
        <h3>{nome}</h3>
        <p className="preco-unitario">Preço unitário: R$ {preco}</p>
        
        {/* ATENÇÃO AQUI: setQuantidade={setQuantidade} precisa ser repassado */}
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


