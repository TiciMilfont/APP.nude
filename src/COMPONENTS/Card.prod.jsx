import React from 'react';
import './CardProd.css';

function CardProd({ nome, preco, imagem, quantidade, setQuantidade, destaque }) {
  return (
    <div className={`card-produto-retro ${destaque ? 'card-destaque' : ''}`}>
      <div className="card-imagem-container">
        {destaque && <span className="badge-categoria">Destaque</span>}
        <img src={imagem} alt={nome} className="img-produto-retro" />
      </div>

      <div className="card-info-retro">
        <div className="card-header-info">
          <h3 className="nome-produto-retro">{nome}</h3>
          <span className="preco-produto-retro">R$ {preco.toFixed(2)}</span>
        </div>

        <div className="card-acoes-retro">
          <div className="seletor-quantidade">
            <button 
              type="button" 
              className="btn-qtd" 
              onClick={() => setQuantidade(quantidade - 1)}
              disabled={quantidade === 0}
            >
              -
            </button>
            <span className="qtd-numero">{quantidade}</span>
            <button 
              type="button" 
              className="btn-qtd" 
              onClick={() => setQuantidade(quantidade + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProd;
