import React from "react";
import Header from "../COMPONENTS/HEADER";
import "./Carrinho.css"; // garanta que os estilos da página estejam importados

function Carrinho({ lanches, quantidades, alterarQtd, esvaziarSacola, finalizarPedido, totalItens, valorTotalPedido }) {
  return (
    <div className="pagina-container-modelo">
      <div className="topo-grid-container">
        
        {/* LADO ESQUERDO: HEADER / MENU COM O MASCOTE */}
        <div className="bloco-banner-esquerda">
          <Header totalItens={totalItens} />
        </div>

        {/* LADO DIREITO: CORPO DO CARRINHO */}
        <div className="bloco-carrinho-modelo">
          <div className="card-total-geral">
            <h2>CARRINHO DE COMPRAS</h2>
            <p className="total-itens-texto">Total de itens: {totalItens}</p>
            <hr />

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
                <p className="carrinho-vazio-texto">Nenhum item selecionado</p>
              )}
            </div>

            <hr />
            <h1 className="total-geral-preco">Total: R$ {valorTotalPedido.toFixed(2)}</h1>

            <div className="botoes-resumo">
              <button className="btn-finalizar" onClick={finalizarPedido}>
                Finalizar Pedido
              </button>
              {totalItens > 0 && (
                <button className="btn-esvaziar" onClick={esvaziarSacola}>
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Carrinho;