import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react_router_dom"; // se der erro de sintaxe use 'react-router-dom'
import Carrinho from "./pages/Carrinho";
import Pedido from "./pages/Pedido";
import AlertaPopup from "./COMPONENTS/AlertaPopup";
import "./App.css";
import Carrinho from "./pages/Carrinho.jsx";

function App() {
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

  return (
    <Router>
      {produtoAlerta && (
        <AlertaPopup produto={produtoAlerta} onClose={() => setProdutoAlerta(null)} />
      )}

      {/* MENU NAVEGAÇÃO DE ROTAS */}
      <nav className="menu-navegacao-paginas">
        <Link to="/" className="btn-aba">🛒 Carrinho de Compras</Link>
        <Link to="/pedido" className="btn-aba">👨‍🍳 Pedidos Cozinha ({pedidosCozinha.length})</Link>
      </nav>

      <Routes>
        <Route 
          path="/" 
          element={
            <Carrinho 
              lanches={lanches}
              quantidades={quantidades}
              alterarQtd={alterarQtd}
              esvaziarSacola={esvaziarSacola}
              finalizarPedido={finalizarPedidoCozinha}
              totalItens={totalItens}
              valorTotalPedido={valorTotalPedido}
              dadosFuncionarios={dadosFuncionarios}
            />
          } 
        />
        <Route 
          path="/pedido" 
          element={
            <Pedido 
              pedidosCozinha={pedidosCozinha}
              avançarStatus={avançarStatus}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;