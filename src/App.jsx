import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Carrinho from "./pages/Carrinho";
import Pedido from "./pages/Pedido";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const navigate = useNavigate();

  // Estado para controlar quem está logado ("cliente" ou "admin")
  const [tipoUsuario, setTipoUsuario] = useState("cliente");

  const lanches = [
    { id: 1, nome: "Hot-Dog Tradicional", preco: 20, categoria: "Dogs", imagem: "/imagem/tradi.png" },
    { id: 2, nome: "Hot-Dog Especial", preco: 28, categoria: "Dogs", imagem: "/imagem/espe.png" },
    { id: 3, nome: "Hot-Dog Cósmico", preco: 35, categoria: "Dogs", imagem: "/imagem/cosm.png" },
    { id: 4, nome: "Coca-Cola", preco: 7, categoria: "Drinks", imagem: "/imagem/coca.jpg" },
    { id: 5, nome: "Água", preco: 5, categoria: "Drinks", imagem: "/imagem/agua.jpg" },
    { id: 6, nome: "Suco", preco: 10, categoria: "Drinks", imagem: "/imagem/suco.jpg" },
  ];

  const [quantidades, setQuantidades] = useState({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
  });

  const [listaPedidos, setListaPedidos] = useState([]);

  const alterarQtd = (id, novaQtd) => {
    setQuantidades((prev) => ({
      ...prev,
      [id]: Math.max(0, novaQtd)
    }));
  };

  const esvaziarSacola = () => {
    setQuantidades({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  };

  const totalItens = Object.values(quantidades).reduce((acc, curr) => acc + curr, 0);

  const valorTotalPedido = lanches.reduce((total, item) => {
    return total + item.preco * (quantidades[item.id] || 0);
  }, 0);

  const finalizarPedido = () => {
    if (totalItens === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    const itensComprados = lanches
      .filter((item) => quantidades[item.id] > 0)
      .map((item) => ({
        nome: item.nome,
        qtd: quantidades[item.id]
      }));

    const novoPedido = {
      id: listaPedidos.length + 1,
      horario: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mesa: "01",
      itens: itensComprados,
      status: "Pedido enviado"
    };

    setListaPedidos((prev) => [...prev, novoPedido]);
    esvaziarSacola();
    
    alert("Pedido enviado para a cozinha! Acompanhe o status aqui no Carrinho.");
    navigate("/carrinho");
  };

  const alterarStatusPedido = (idPedido, novoStatus) => {
    setListaPedidos((pedidosAnteriores) =>
      pedidosAnteriores.map((pedido) =>
        pedido.id === idPedido ? { ...pedido, status: novoStatus } : pedido
      )
    );
  };

  const dadosFuncionarios = [
    { id: 1, nome: "Maria", cargo: "Gerente", imagem: "/imagem/dog3.jpg" },
    { id: 2, nome: "João", cargo: "Atendente", imagem: "/imagem/dog2.jpg" },
    { id: 3, nome: "Carlos", cargo: "Chapeiro", imagem: "/imagem/dod1.jpg" }
  ];

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Login totalItens={totalItens} setTipoUsuario={setTipoUsuario} />} 
      />

      <Route 
        path="/home" 
        element={
          <Home 
            lanches={lanches}
            quantidades={quantidades}
            alterarQtd={alterarQtd}
            esvaziarSacola={esvaziarSacola}
            finalizarPedido={finalizarPedido}
            totalItens={totalItens}
            valorTotalPedido={valorTotalPedido}
            dadosFuncionarios={dadosFuncionarios}
          />
        } 
      />

      <Route 
        path="/carrinho" 
        element={
          <Carrinho 
            lanches={lanches}
            quantidades={quantidades}
            alterarQtd={alterarQtd}
            esvaziarSacola={esvaziarSacola}
            finalizarPedido={finalizarPedido}
            totalItens={totalItens}
            valorTotalPedido={valorTotalPedido}
            pedidos={listaPedidos}
          />
        } 
      />

      <Route 
        path="/pedido" 
        element={
          <Pedido 
            pedidos={listaPedidos} 
            alterarStatusPedido={alterarStatusPedido}
            totalItens={totalItens}
            tipoUsuario={tipoUsuario}
          />
        } 
      />
    </Routes>
  );
}

export default App;