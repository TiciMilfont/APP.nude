import { useState } from "react";
import Header from "./COMPONENTS/HEADER";
import Login from "./COMPONENTS/login";
import Funcionario from "./COMPONENTS/Funcionario";
import CardProd from "./COMPONENTS/Card.prod";
import "./App.css";

function App() {
  // 1. Estrutura de produtos igual ao padrão do professor
  const lanches = [
    { id: 1, nome: "Hot-Dog Tradicional", preco: 20, categoria: "Dogs", imagem: "/imagem/tradi.png" },
    { id: 2, nome: "Hot-Dog Especial", preco: 28, categoria: "Dogs", imagem: "/imagem/espe.png" },
    { id: 3, nome: "Hot-Dog Cósmico", preco: 35, categoria: "Dogs", imagem: "/imagem/cosm.png" },
    { id: 4, nome: "Coca-Cola", preco: 7, categoria: "Drinks", imagem: "/imagem/coca.jpg" },
    { id: 5, nome: "Água", preco: 5, categoria: "Drinks", imagem: "/imagem/agua.jpg" },
    { id: 6, nome: "Suco", preco: 10, categoria: "Drinks", imagem: "/imagem/suco.jpg" },
  ];

  // 2. Estado único para gerenciar as quantidades de todos os itens pelo ID
  const [quantidades, setQuantidades] = useState({
    1: 0, // Hot-Dog Tradicional
    2: 0, // Hot-Dog Especial
    3: 0, // Hot-Dog Cósmico
    4: 0, // Coca-Cola
    5: 0, // Água
    6: 0  // Suco
  });

  // Função auxiliar para atualizar a quantidade de um item específico
  const atualizarQuantidade = (id, novaQtd) => {
    setQuantidades((prev) => ({
      ...prev,
      [id]: Math.max(0, novaQtd) // Garante que não fique menor que 0
    }));
  };

  // Lista estática da equipe de funcionários
  const dadosFuncionarios = [
    { id: 1, nome: "Maria", cargo: "Gerente", imagem: "/imagem/dog3.jpg" },
    { id: 2, nome: "João", cargo: "Atendente", imagem: "/imagem/dog2.jpg" },
    { id: 3, nome: "Carlos", cargo: "Chapeiro", imagem: "/imagem/dod1.jpg" }
  ];

  // 3. Cálculo dinâmico do total do pedido percorrendo a lista
  const valorTotalPedido = lanches.reduce((total, item) => {
    return total + item.preco * (quantidades[item.id] || 0);
  }, 0);

  // Cálculo do total de itens no carrinho
  const totalItens = Object.values(quantidades).reduce((acc, qtd) => acc + qtd, 0);

  return (
    <>
      <Header titulo="LANCHYS" subtitulo="the best hot-dog" />
      <Login />

      {/* SEÇÃO DE DOGS */}
<h2 className="titulo-categoria">🌭 Dogs</h2>
<div className="menu-produtos">
  {lanches
    .filter((produto) => produto.categoria === "Dogs")
    .map((produto) => (
      <CardProd
        key={produto.id}
        nome={produto.nome}
        preco={produto.preco}
        imagem={produto.imagem}
        quantidade={quantidades[produto.id] || 0}
        setQuantidade={(novaQtd) => atualizarQuantidade(produto.id, novaQtd)}
      />
    ))}
</div>

{/* SEÇÃO DE DRINKS */}
<h2 className="titulo-categoria">🥤 Drinks</h2>
<div className="menu-produtos">
  {lanches
    .filter((produto) => produto.categoria === "Drinks")
    .map((produto) => (
      <CardProd
        key={produto.id}
        nome={produto.nome}
        preco={produto.preco}
        imagem={produto.imagem}
        quantidade={quantidades[produto.id] || 0}
        setQuantidade={(novaQtd) => atualizarQuantidade(produto.id, novaQtd)}
      />
    ))}
</div>

      {/* Seção do Resumo do Pedido */}
      <div className="card-total-geral">
        <h2>Resumo do Pedido</h2>
        <p className="total-itens-texto">
          Total de itens: {totalItens}
        </p>

        <hr />

        <div className="lista-resumo-itens">
          {lanches.map((produto) => {
            const qtd = quantidades[produto.id] || 0;
            if (qtd === 0) return null;
            return (
              <p key={produto.id}>
                <strong>{qtd}x</strong> {produto.nome}
              </p>
            );
          })}

          {/* Mensagem exibida apenas quando o carrinho está vazio */}
          {totalItens === 0 && (
            <p className="carrinho-vazio-texto">Nenhum item selecionado</p>
          )}
        </div>

        <hr />

        <h1 className="total-geral-preco">Total Geral: R$ {valorTotalPedido}</h1>
        <button className="btn-finalizar">Finalizar Compra</button>
      </div>

      {/* Seção da Equipe de Funcionários */}
      <div className="secao-equipe">
        <hr />
        <h2>Nossa Equipe</h2>
        
        <div className="container-funcionarios">
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
    </>
  );
}

export default App;