import { useState } from "react";
import Header from "./Components/HEADER";
import Login from "../pages/Login";
import Funcionario from "./Components/Funcionario";
import CardProd from "./Components/Card.prod";
import AlertaPopup from "./Components/AlertaPopup";
import "./App.css";

function App() {
  // --- NAVEGAÇÃO DE PÁGINAS ---
  const [paginaAtual, setPaginaAtual] = useState("loja"); // 'loja' ou 'cozinha'

  const lanches = [
    { id: 1, nome: "Hot-Dog Tradicional", preco: 20, categoria: "Dogs", imagem: "/imagem/tradi.png" },
    { id: 2, nome: "Hot-Dog Especial", preco: 28, categoria: "Dogs", imagem: "/imagem/espe.png" },
    { id: 3, nome: "Hot-Dog Cósmico", preco: 35, categoria: "Dogs", imagem: "/imagem/cosm.png" },
    { id: 4, nome: "Coca-Cola", preco: 7, categoria: "Drinks", imagem: "/imagem/coca.jpg" },
    { id: 5, nome: "Água", preco: 5, categoria: "Drinks", imagem: "/imagem/agua.jpg" },
    { id: 6, nome: "Suco", preco: 10, categoria: "Drinks", imagem: "/imagem/suco.jpg" },
  ];

  // Estado das quantidades iniciando zerado para cada ID
  const [quantidades, setQuantidades] = useState({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
  });

  // Estado para controlar o Pop-up do alerta
  const [produtoAlerta, setProdutoAlerta] = useState(null);

  // --- ESTADOS PARA A COZINHA ---
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

  // Função para alterar a quantidade de um item
  const alterarQtd = (id, novaQtd) => {
    const qtdAntiga = quantidades[id] || 0;

    // Se AUMENTOU, abre o alerta com o produto
    if (novaQtd > qtdAntiga) {
      const itemAdicionado = lanches.find((p) => p.id === id);
      setProdutoAlerta(itemAdicionado);
    }

    // Atualiza o objeto de quantidades
    setQuantidades((prev) => ({
      ...prev,
      [id]: Math.max(0, novaQtd)
    }));
  };

  // Zera a sacola
  const esvaziarSacola = () => {
    setQuantidades({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  };

  // Cálculos dinâmicos
  const totalItens = Object.values(quantidades).reduce((acc, curr) => acc + curr, 0);
  
  const valorTotalPedido = lanches.reduce((total, item) => {
    return total + item.preco * (quantidades[item.id] || 0);
  }, 0);

  const dadosFuncionarios = [
    { id: 1, nome: "Maria", cargo: "Gerente", imagem: "/imagem/dog3.jpg" },
    { id: 2, nome: "João", cargo: "Atendente", imagem: "/imagem/dog2.jpg" },
    { id: 3, nome: "Carlos", cargo: "Chapeiro", imagem: "/imagem/dod1.jpg" }
  ];

  // Enviar pedido para a tela da Cozinha
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
    alert("Pedido enviado para a Cozinha com sucesso!");
  };

  // Avançar Status do Pedido (Recebido -> Preparando -> Pronto -> Entregue)
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

  return (
    <>
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

      {/* NAVEGAÇÃO DE PÁGINAS */}
      <nav className="menu-navegacao-paginas">
        <button 
          className={`btn-aba ${paginaAtual === 'loja' ? 'ativa' : ''}`}
          onClick={() => setPaginaAtual('loja')}
        >
          Cardápio & Carrinho
        </button>
        <button 
          className={`btn-aba ${paginaAtual === 'cozinha' ? 'ativa' : ''}`}
          onClick={() => setPaginaAtual('cozinha')}
        >
          Painel da Cozinha ({pedidosCozinha.length})
        </button>
      </nav>

      {/* ===================================================================
          PÁGINA 1: LOJA / CARDÁPIO / CARRINHO DE COMPRAS
         =================================================================== */}
      {paginaAtual === "loja" && (
        <>
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

          {/* CARRINHO DE COMPRAS */}
          <div className="card-total-geral">
            <img 
              src="/imagem/sac.jpg" 
              alt="Sacola de Compras" 
              className="img-sacola-resumo" 
            />
            <h2>CARRINHO DE COMPRAS</h2>
            <p className="total-itens-texto">Total de itens: {totalItens}</p>

            <hr />

            <div className="tabela-carrinho-container">
              {totalItens > 0 ? (
                <table className="tabela-carrinho">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Categoria</th>
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
                          <td>{produto.categoria}</td>
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

            <h1 className="total-geral-preco">Valor Total: R$ {valorTotalPedido.toFixed(2)}</h1>

            <div className="botoes-resumo">
              <button className="btn-finalizar" onClick={finalizarPedidoCozinha}>
                Finalizar Pedido
              </button>
              
              {totalItens > 0 && (
                <button className="btn-esvaziar" onClick={esvaziarSacola}>
                  Limpar Carrinho
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
        </>
      )}

      {/* ===================================================================
          PÁGINA 2: PAINEL DA COZINHA (EXCLUSIVO)
         =================================================================== */}
      {paginaAtual === "cozinha" && (
        <div className="secao-cozinha-pagina">
          <h2 className="titulo-pagina-cozinha">PEDIDOS PARA A COZINHA</h2>
          
          <div className="container-pedidos-cozinha">
            {pedidosCozinha.length > 0 ? (
              pedidosCozinha.map((pedido) => (
                <div key={pedido.id} className="card-pedido-cozinha">
                  <div className="topo-pedido">
                    <h3>PEDIDO {pedido.numero}</h3>
                    <p><strong>Mesa:</strong> {pedido.mesa}</p>
                    <p><strong>Horário:</strong> {pedido.horario}</p>
                  </div>
                  <hr />
                  <div className="itens-pedido-cozinha">
                    {pedido.itens.map((item, idx) => (
                      <p key={idx}><strong>{item.qtd}x</strong> {item.nome}</p>
                    ))}
                  </div>
                  <hr />
                  <div className="status-pedido-container">
                    <span>STATUS:</span>
                    <button 
                      className={`btn-status status-${pedido.status.toLowerCase()}`}
                      onClick={() => avançarStatus(pedido.id)}
                    >
                      [ {pedido.status} ]
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="cozinha-vazia-texto">Nenhum pedido na cozinha no momento.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;