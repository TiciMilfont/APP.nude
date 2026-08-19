import { useState } from "react";
import Header from "../COMPONENTS/Header";
import Login from "./pages/Login";
import Funcionario from "./COMPONENTS/Funcionario";
import CardProd from "./COMPONENTS/Card.prod";
import AlertaPopup from "./COMPONENTS/AlertaPopup";
import "./App.css";

function App() {
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

  return (
    <>
      
    </>
  );
}

export default App;