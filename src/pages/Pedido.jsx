import React from 'react';
import { useNavigate } from 'react-router-dom';

function Pedido({ pedidos = [], alterarStatusPedido }) {
  const navigate = useNavigate();

  return (
    <div className="pagina-container-modelo">
      {/* HEADER / CABEÇALHO */}
      <header className="header-cozinha">
        <button 
          className="btn-voltar-produtos" 
          onClick={() => navigate('/home')} 
          title="Voltar para os Produtos"
        >
          ← Voltar aos Produtos
        </button>

        <h1>LANCHYS</h1>
        <p>Painel da Cozinha</p>
      </header>

      {/* CONTEÚDO PRINCIPAL: PAINEL DA COZINHA */}
      <main className="secao-cozinha-pagina">
        <h2 className="titulo-pagina-cozinha">PEDIDOS PARA A COZINHA</h2>

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

                {/* PAINEL DE CONTROLE DE STATUS */}
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
  );
}

export default Pedido;