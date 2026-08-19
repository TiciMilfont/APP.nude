import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../COMPONENTS/Header";
import "./Login.css";

function Login({ totalItens, setTipoUsuario }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (usuario === "admin" && senha === "123") {
      localStorage.setItem("usuarioLogado", "admin");
      setTipoUsuario("admin");
      navigate("/pedido");
    } else if (usuario === "cliente" && senha === "123") { 
      localStorage.setItem("usuarioLogado", "cliente");
      setTipoUsuario("cliente");
      navigate("/home");
    } else {
      alert("Usuário ou Senha inexistente");
    }
  };


  return (
    <div className="pagina-container-modelo">
      <div className="topo-grid-container">
        {/* LADO ESQUERDO: MENU botões */}
        <div className="bloco-banner-esquerda">
          <Header totalItens={totalItens} />
        </div>

        {/* LADO DIREITO: CARD DE LOGIN ESTILIZADO */}
        <div className="bloco-carrinho-modelo">
          <div className="card-login-container">
            <div className="login-header">
              <h2>ÁREA DE ACESSO</h2>
              <p>Bem-vindo! Faça seu login para continuar</p>
            </div>

            <form className="form-login" onSubmit={handleLogin}>
              <div className="campo-grupo">
                <label htmlFor="usuario">Usuário</label>
                <input
                  id="usuario"
                  type="text"
                  placeholder="Ex: cliente ou admin"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="input-login"
                  required
                />
              </div>

              <div className="campo-grupo">
                <label htmlFor="senha">Senha</label>
                <input
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="input-login"
                  required
                />
              </div>

              <button type="submit" className="btn-entrar-login">
                ENTRAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;