import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../COMPONENTS/HEADER';
import "./Pedidos.css";

function Pedido({ pedidos = [], alterarStatusPedido, totalItens, tipoUsuario }) {
  const navigate = useNavigate();

  // Trava de segurança: se não for admin, bloqueia o acesso
  useEffect(() => {
    if (tipoUsuario !== "admin") {
      alert("Acesso restrito à funcionários, acompanhe seu pedido na aba Carrinho");
      navigate("/carrinho");
    }
  }, [tipoUsuario, navigate]);

  // Se não for admin, não renderiza o painel da cozinha enquanto redireciona
  if (tipoUsuario !== "admin") {
    return null;
  }

  return (
    <div className="pagina-container-modelo">
      <div className="topo-grid-container">
        <div className="bloco-banner-esquerda">
          <Header totalItens={totalItens} />
        </div>

        <div className="bloco-carrinho-modelo">
          <main className="secao-cozinha-pagina">
            <h2 className="titulo-pagina-cozinha">PEDIDOS PARA A COZINHA (STAFF)</h2>

            <div className="container-pedidos-cozinha">
              {pedidos.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                  Nenhum pedido recebido no momento.
                </p>
              ) : (
                pedidos.map((pedido) => (
                  <article className="card-pedido-cozinha" key={pedido.id}>
                    <div className="topo-pedido">
                      <h3>PEDIDO #{String(pedido.id).padStart(3, '0')}</h3>
                      <p><strong>Mesa:</strong> {pedido.mesa || 'Balcão'}</p>
                      <p><strong>Horário:</strong> {pedido.horario}</p>
                    </div>

                    <hr />

                    <div className="itens-pedido-cozinha">
                      {pedido.itens.map((item, index) => (
                        <p key={index}>
                          <strong>{item.qtd}x</strong> {item.nome}
                        </p>
                      ))}
                    </div>

                    <hr />

                    <div className="status-pedido-container">
                      <span className="status-titulo">
                        STATUS ATUAL: <strong>{pedido.status || 'Recebido'}</strong>
                      </span>

                      <div className="botoes-status-grupo">
                        <button
                          type="button"
                          className={`btn-status ${pedido.status === 'Recebido' ? 'ativo-recebido' : ''}`}
                          onClick={() => alterarStatusPedido(pedido.id, 'Recebido')}
                        >
                          Recebido
                        </button>

                        <button
                          type="button"
                          className={`btn-status ${pedido.status === 'Preparando' ? 'ativo-preparando' : ''}`}
                          onClick={() => alterarStatusPedido(pedido.id, 'Preparando')}
                        >
                          Preparando
                        </button>

                        <button
                          type="button"
                          className={`btn-status ${pedido.status === 'Pronto' ? 'ativo-pronto' : ''}`}
                          onClick={() => alterarStatusPedido(pedido.id, 'Pronto')}
                        >
                          Pronto
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Pedido;