import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ totalItens }) {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Pega o nome do usuário salvo no localStorage
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      const nomeFormatado = usuarioSalvo.charAt(0).toUpperCase() + usuarioSalvo.slice(1);
      setNomeUsuario(nomeFormatado);
    }
  }, []);

  // Função para deslogar o usuário
  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado"); // Limpa o usuário salvo
    setNomeUsuario(""); // Limpa o estado
    navigate("/"); // Redireciona para a tela de login
  };

  return (
    <div className="card-header-navegacao">
      {/* CARD ACIMA DA LOGO COM BOTÃO SAIR */}
      {nomeUsuario && (
        <div className="card-usuario-boasvindas">
          <span>Olá, {nomeUsuario}!</span>
          <button onClick={handleLogout} className="btn-logout">
            SAIR
          </button>
        </div>
      )}

      {/* LOGO OFICIAL */}
      <div className="logo-container-original">
        <div className="caixa-logo-vinho">
          <span className="texto-logo-lanchys">LANCHYS</span>
        </div>
        <span className="subtitulo-logo">the best hot-dog</span>
      </div>

      {/* MASCOTE DOG */}
      <img 
        src="/imagem/dog.png" 
        alt="Mascote Hot-Dog" 
        className="img-mascote-header" 
      />

      {/* BOTÕES DE NAVEGAÇÃO */}
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