import React, { useState } from 'react'; // 1. Importe o useState
import Header from '../Components/HEADER';
import CardProd from '../Components/Card.prod';
import Funcionario from '../Components/Funcionario';
import AlertaPopup from '../Components/AlertaPopup'; // 2. Importe o AlertaPopup

function Home({ 
  lanches, 
  quantidades, 
  alterarQtd, 
  esvaziarSacola, 
  finalizarPedido, 
  totalItens, 
  valorTotalPedido, 
  dadosFuncionarios 
}) {
  // 3. Estado local para saber qual produto disparou o alerta
  const [produtoAlerta, setProdutoAlerta] = useState(null);

  // 4. Função intermediária para checar se a quantidade AUMENTOU
  const lidarComAlteracaoQtd = (produto, novaQtd) => {
    const qtdAtual = quantidades[produto.id] || 0;

    // Se a nova quantidade for maior, abre o pop-up
    if (novaQtd > qtdAtual) {
      setProdutoAlerta(produto);
    }

    // Chama a função global do App.jsx para atualizar o valor no carrinho
    alterarQtd(produto.id, novaQtd);
  };

  return (
    <div className="pagina-container-modelo">

      {/* 5. POP-UP DE ALERTA (Só renderiza se produtoAlerta não for null) */}
      {produtoAlerta && (
        <AlertaPopup 
          produto={produtoAlerta} 
          onClose={() => setProdutoAlerta(null)} 
        />
      )}

      {/* 1. TOPO: HEADER (ESQUERDA) + CARRINHO (DIREITA) */}
      <div className="topo-grid-container">
        <div className="bloco-banner-esquerda">
          <Header totalItens={totalItens} />
        </div>

        
        {/* CARRINHO DE COMPRAS NO TOPO */}
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
                          <td>{qtd}</td>
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
                Finalizar
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

      {/* 2. CATEGORIA: DOGS */}
      <div className="secao-carrossel-bloco">
        <h2 className="titulo-secao-modelo">DOGS</h2>
        <div className="carrossel-scroll-horizontal">
          {lanches
            .filter((p) => p.categoria === "Dogs")
            .map((produto) => (
              <CardProd
                key={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                imagem={produto.imagem}
                quantidade={quantidades[produto.id] || 0}
                // Usando a nova função manipuladora
                setQuantidade={(novaQtd) => lidarComAlteracaoQtd(produto, novaQtd)}
                destaque={produto.nome === "Hot-Dog Cósmico"}
              />
            ))}
        </div>
      </div>

      {/* 3. CATEGORIA: DRINKS */}
      <div className="secao-carrossel-bloco">
        <h2 className="titulo-secao-modelo">DRINKS</h2>
        <div className="carrossel-scroll-horizontal">
          {lanches
            .filter((p) => p.categoria === "Drinks")
            .map((produto) => (
              <CardProd
                key={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                imagem={produto.imagem}
                quantidade={quantidades[produto.id] || 0}
                // Usando a nova função manipuladora
                setQuantidade={(novaQtd) => lidarComAlteracaoQtd(produto, novaQtd)}
                destaque={false}
              />
            ))}
        </div>
      </div>

      {/* 4. NOSSA EQUIPE */}
      <div className="bloco-equipe-modelo">
        <h2 className="titulo-secao-modelo">Nossa Equipe</h2>
        <div className="container-funcionarios-horizontal">
          {dadosFuncionarios.map((func) => (
            <Funcionario 
              key={func.id} 
              nome={func.nome} 
              cargo={func.cargo} 
              imagem={func.imagem}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;