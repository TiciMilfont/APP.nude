import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ totalItens }) {
  return (
    <div className="card-header-navegacao">
      {/* LOGO OFICIAL */}
      <div className="logo-container-original">
        <div className="caixa-logo-vinho">
          <span className="texto-logo-lanchys">LANCHYS</span>
        </div>
        <span className="subtitulo-logo">the best hot-dog</span>
      </div>

      {/* MASCOTE DOG NO ESPAÇO CENTRAL */}
      <img 
        src="/imagem/dog.png" 
        alt="Mascote Hot-Dog" 
        className="img-mascote-header" 
      />

      {/* BOTÕES DE NAVEGAÇÃO ABAIXO */}
      <nav className="botoes-menu-horizontal">
        <Link to="/home" className="btn-nav">
          HOME
        </Link>
        <Link to="/" className="btn-nav">
          LOGIN
        </Link>
        <Link to="/carrinho" className="btn-nav btn-sacola">
          <img src="/imagem/sac.jpg" alt="sacola" className="img-sacola" />
          CARRINHO ({totalItens || 0})
        </Link>
        <Link to="/pedido" className="btn-nav btn-pedidos">
          PEDIDOS
        </Link>
      </nav>
    </div>
  );
}

export default Header;