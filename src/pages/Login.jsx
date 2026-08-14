import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../COMPONENTS/HEADER";
import "./Login.css";

function Login({ totalItens }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (usuario === "admin" && senha === "123") {
      navigate("/pedido"); 
    } else if (usuario === "cliente") {
      navigate("/home"); 
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="pagina-container-modelo">
      <div className="topo-grid-container">
        
        {/* LADO ESQUERDO: HEADER COM MENU */}
        <div className="bloco-banner-esquerda">
          <Header totalItens={totalItens} />
        </div>

        {/* LADO DIREITO: CARD DE LOGIN */}
        <div className="bloco-carrinho-modelo">
          <div className="card-login">
            <h2>Bem-vindo! Faça seu login</h2>

            <form className="form-login" onSubmit={handleLogin}>
              <div className="campo-grupo">
                <label>Usuário</label>
                <input 
                  type="text" 
                  placeholder="Digite seu usuário" 
                  value={usuario} 
                  onChange={(e) => setUsuario(e.target.value)} 
                  className="input-login"
                />
              </div>

              <div className="campo-grupo">
                <label>Senha</label>
                <input 
                  type="password" 
                  placeholder="Digite sua senha" 
                  value={senha} 
                  onChange={(e) => setSenha(e.target.value)} 
                  className="input-login"
                />
              </div>

              <button type="submit" className="btn-entrar">
                Entrar
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;