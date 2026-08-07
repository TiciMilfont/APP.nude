import React from 'react';
import './CardProd.css';

function CardProd({ nome, preco, imagem, quantidade, setQuantidade }) {
  return (
    <div className="card-produto-retro">
      {/* Área Destaque da Imagem */}
      <div className="card-imagem-container">
        <span className="badge-categoria">Destaque</span>
        <img src={imagem} alt={nome} className="img-produto-retro" />
      </div>

      {/* Área de Texto / Informações */}
      <div className="card-info-retro">
        <div className="card-header-info">
          <h3 className="nome-produto-retro">{nome}</h3>
          <span className="preco-produto-retro">R$ {preco.toFixed(2)}</span>
        </div>

        {/* Controles de Quantidade */}
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

