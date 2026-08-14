import React from "react";
import Header from "../COMPONENTS/HEADER";
import "./Carrinho.css";

function Carrinho({ lanches, quantidades, alterarQtd, esvaziarSacola, totalItens, valorTotalPedido, pedidos = [] }) {
  
  // Função para identificar em qual etapa o pedido está
  const obterEtapaStatus = (status) => {
    switch (status) {
      case "Recebido":
      case "Pedido enviado":
        return 1;
      case "Preparando":
      case "Pedido sendo preparado":
        return 2;
      case "Pronto":
      case "Pedido saiu para a entrega":
        return 3;
      default:
        return 1;
    }
  };

  return (
    <div className="pagina-container-modelo">
      <div className="topo-grid-container">
        
        {/* LADO ESQUERDO: HEADER / MENU */}
        <div className="bloco-banner-esquerda">
          <Header totalItens={totalItens} />
        </div>

        {/* LADO DIREITO: CARRINHO E ACOMPANHAMENTO DE PEDIDOS */}
        <div className="bloco-carrinho-modelo">
          <div className="card-total-geral">
            <h2>CARRINHO DE COMPRAS</h2>
            <p className="total-itens-texto">Total de itens no carrinho: {totalItens}</p>
            <hr />

            {/* SEÇÃO DE ACOMPANHAMENTO DOS PEDIDOS REALIZADOS */}
            {pedidos.length > 0 && (
              <div className="lista-acompanhamento-pedidos">
                <h3 className="titulo-meus-pedidos">SEUS PEDIDOS EM ANDAMENTO</h3>
                
                {pedidos.map((ped) => {
                  const etapaAtual = obterEtapaStatus(ped.status);
                  return (
                    <div key={ped.id} className="painel-status-cliente">
                      <div className="topo-card-pedido-cliente">
                        <h4>Pedido #{String(ped.id).padStart(3, "0")}</h4>
                        <span className="horario-pedido">{ped.horario}</span>
                      </div>

                      {/* Resumo simples dos itens deste pedido */}
                      <div className="resumo-itens-pedido">
                        {ped.itens.map((item, idx) => (
                          <span key={idx} className="tag-item-resumo">
                            {item.qtd}x {item.nome}
                          </span>
                        ))}
                      </div>

                      {/* Régua de progresso do status */}
                      <div className="etapas-status-container">
                        <div className={`etapa-item ${etapaAtual >= 1 ? "ativo" : ""}`}>
                          <div className="circulo-etapa">1</div>
                          <span>Pedido enviado</span>
                        </div>

                        <div className={`linha-progresso ${etapaAtual >= 2 ? "ativo" : ""}`}></div>

                        <div className={`etapa-item ${etapaAtual >= 2 ? "ativo" : ""}`}>
                          <div className="circulo-etapa">2</div>
                          <span>Pedido sendo preparado</span>
                        </div>

                        <div className={`linha-progresso ${etapaAtual >= 3 ? "ativo" : ""}`}></div>

                        <div className={`etapa-item ${etapaAtual >= 3 ? "ativo" : ""}`}>
                          <div className="circulo-etapa">3</div>
                          <span>Pedido saiu para a entrega</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <hr />
              </div>
            )}

            {/* TABELA DE ITENS QUE AINDA ESTÃO NO CARRINHO (NÃO FINALIZADOS) */}
            <div className="tabela-carrinho-container">
              {totalItens > 0 ? (
                <table className="tabela-carrinho">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Qtde</th>
                      <th>Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lanches.map((produto) => {
                      const qtd = quantidades[produto.id] || 0;
                      if (qtd === 0) return null;
                      return (
                        <tr key={produto.id}>
                          <td>{produto.nome}</td>
                          <td>
                            <button onClick={() => alterarQtd(produto.id, qtd - 1)}>-</button>
                            {" "}{qtd}{" "}
                            <button onClick={() => alterarQtd(produto.id, qtd + 1)}>+</button>
                          </td>
                          <td>R$ {(produto.preco * qtd).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                pedidos.length === 0 && <p className="carrinho-vazio-texto">Nenhum item selecionado</p>
              )}
            </div>

            {totalItens > 0 && (
              <>
                <hr />
                <h1 className="total-geral-preco">Total: R$ {valorTotalPedido.toFixed(2)}</h1>

                <div className="botoes-resumo">
                  <button className="btn-esvaziar" onClick={esvaziarSacola}>
                    Limpar Carrinho
                  </button>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Carrinho;