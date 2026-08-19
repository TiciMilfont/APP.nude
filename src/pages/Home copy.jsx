import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react_router_dom"; // se der erro de sintaxe use 'react-router-dom'
import Carrinho from "./pages/Carrinho.js";
import Pedido from "./pages/Pedido.js";
import AlertaPopup from "./COMPONENTS/AlertaPopup.js";
import "./App.css";
import Carrinho from "./pages/Carrinho.js";




function Home () {

    const lanches = [
    { id: 1, nome: "Hot-Dog Tradicional", preco: 20, categoria: "Dogs", imagem: "/imagem/tradi.png" },
    { id: 2, nome: "Hot-Dog Especial", preco: 28, categoria: "Dogs", imagem: "/imagem/espe.png" },
    { id: 3, nome: "Hot-Dog Cósmico", preco: 35, categoria: "Dogs", imagem: "/imagem/cosm.png" },
    { id: 4, nome: "Coca-Cola", preco: 7, categoria: "Drinks", imagem: "/imagem/coca.jpg" },
    { id: 5, nome: "Água", preco: 5, categoria: "Drinks", imagem: "/imagem/agua.jpg" },
    { id: 6, nome: "Suco", preco: 10, categoria: "Drinks", imagem: "/imagem/suco.jpg" },
  ];

  const [quantidades, setQuantidades] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  const [produtoAlerta, setProdutoAlerta] = useState(null);

  const [pedidosCozinha, setPedidosCozinha] = useState([
    {
      id: 1,
      numero: "#001",
      mesa: "03",
      horario: "12:15",
      itens: [
        { nome: "Hot-Dog Especial", qtd: 2 },
        { nome: "Coca-Cola", qtd: 2 }
      ],
      status: "Preparando"
    }
  ]);
  const [numPedido, setNumPedido] = useState(2);

  const alterarQtd = (id, novaQtd) => {
    const qtdAntiga = quantidades[id] || 0;
    if (novaQtd > qtdAntiga) {
      const itemAdicionado = lanches.find((p) => p.id === id);
      setProdutoAlerta(itemAdicionado);
    }
    setQuantidades((prev) => ({ ...prev, [id]: Math.max(0, novaQtd) }));
  };

  const esvaziarSacola = () => {
    setQuantidades({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  };

  const totalItens = Object.values(quantidades).reduce((acc, curr) => acc + curr, 0);
  const valorTotalPedido = lanches.reduce((total, item) => total + item.preco * (quantidades[item.id] || 0), 0);

  const dadosFuncionarios = [
    { id: 1, nome: "Maria", cargo: "Gerente", imagem: "/imagem/dog3.jpg" },
    { id: 2, nome: "João", cargo: "Atendente", imagem: "/imagem/dog2.jpg" },
    { id: 3, nome: "Carlos", cargo: "Chapeiro", imagem: "/imagem/dod1.jpg" }
  ];

  const finalizarPedidoCozinha = () => {
    if (totalItens === 0) return;

    const itensComprados = lanches
      .filter((p) => (quantidades[p.id] || 0) > 0)
      .map((p) => ({ nome: p.nome, qtd: quantidades[p.id] }));

    const horaAtual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const novoPedido = {
      id: Date.now(),
      numero: `#${String(numPedido).padStart(3, '0')}`,
      mesa: `0${Math.floor(Math.random() * 9) + 1}`,
      horario: horaAtual,
      itens: itensComprados,
      status: "Recebido"
    };

    setPedidosCozinha((prev) => [novoPedido, ...prev]);
    setNumPedido((prev) => prev + 1);
    esvaziarSacola();
    alert("Pedido enviado para a Cozinha!");
  };

  const avançarStatus = (id) => {
    const ordemStatus = ["Recebido", "Preparando", "Pronto", "Entregue"];
    setPedidosCozinha((prev) =>
      prev.map((ped) => {
        if (ped.id === id) {
          const idxAtual = ordemStatus.indexOf(ped.status);
          const proxStatus = ordemStatus[(idxAtual + 1) % ordemStatus.length];
          return { ...ped, status: proxStatus };
        }
        return ped;
      })
    );
  };

    return [
        <div>
            {/* POP-UP ALERTA */}
      {produtoAlerta && (
        <AlertaPopup
          produto={produtoAlerta}
          onClose={() => setProdutoAlerta(null)}
        />
      )}

      {/* HEADER */}
      <Header 
        titulo="LANCHYS" 
        subtitulo="the best hot-dog" 
        totalItens={totalItens} 
      />

      <Login />

      {/* DOGS */}
      <h2 className="titulo-categoria"> DOGS </h2>
      <div className="menu-produtos">
        {lanches
          .filter((p) => p.categoria === "Dogs")
          .map((produto) => (
            <CardProd
              key={produto.id}
              nome={produto.nome}
              preco={produto.preco}
              imagem={produto.imagem}
              quantidade={quantidades[produto.id] || 0}
              setQuantidade={(novaQtd) => alterarQtd(produto.id, novaQtd)}
            />
          ))}
      </div>

      {/* DRINKS */}
      <h2 className="titulo-categoria"> DRINKS </h2>
      <div className="menu-produtos">
        {lanches
          .filter((p) => p.categoria === "Drinks")
          .map((produto) => (
            <CardProd
              key={produto.id}
              nome={produto.nome}
              preco={produto.preco}
              imagem={produto.imagem}
              quantidade={quantidades[produto.id] || 0}
              setQuantidade={(novaQtd) => alterarQtd(produto.id, novaQtd)}
            />
          ))}
      </div>

      {/* RESUMO DO PEDIDO */}
      <div className="card-total-geral">
        {/* Imagem da sacola adicionada aqui */}
  <img 
    src="/imagem/sac.jpg" 
    alt="Sacola de Compras" 
    className="img-sacola-resumo" 
  />
        <h2>Resumo do Pedido</h2>
        <p className="total-itens-texto">Total de itens: {totalItens}</p>

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

          {totalItens === 0 && (
            <p className="carrinho-vazio-texto">Nenhum item selecionado</p>
          )}
        </div>

        <hr />

        <h1 className="total-geral-preco">Total Geral: R$ {valorTotalPedido}</h1>

        <div className="botoes-resumo">
          <button className="btn-finalizar">Finalizar Compra</button>
          
          {totalItens > 0 && (
            <button className="btn-esvaziar" onClick={esvaziarSacola}>
               Esvaziar Sacola
            </button>
          )}
        </div>
      </div>

      {/* EQUIPE */}
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
        </div>
    ]
}

export default Home