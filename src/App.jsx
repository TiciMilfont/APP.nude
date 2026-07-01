import { useState } from "react";
import Header from "./COMPONENTS/HEADER";
import Login from "./COMPONENTS/login";
import Funcionario from "./COMPONENTS/Funcionario";
import Contador from "./COMPONENTS/Contador";
import "./App.css";

function App() {

const Lanches = [ 
  { id: 1, nome: "Hot-Tradicional", preco: 20 },
  { id: 2, nome: "Hot-Especial", preco: 28 },
  { id: 3, nome: "Hot-Cósmico", preco: 35 }
];

return  (

  <>
      <Header titulo="LANCHYS" subtitulo="the best hot-dog" />
      <Login />

      <div className = "lista_cards">

      {
      Lanches.map (lanche => (
        <cardprod
        key= {lanche.id}
        nome= {lanche.nome}
        preco={lanche.preco}
        />
      ))}
    </div>
  </>
); // Fecha o return
} // Fecha a função App lá embaixo

      <div className="menu-produtos">
        <Contador 
          nome="Hot-Dog Tradicional" 
          preco={pTradicional} 
          quantidade={qtdTradicional} 
          setQuantidade={setQtdTradicional} 
        />
        <Contador 
          nome="Hot-Dog Especial" 
          preco={pEspecial} 
          quantidade={qtdEspecial} 
          setQuantidade={setQtdEspecial} 
        />
        <Contador 
          nome="Hot-Dog Cósmico" 
          preco={pCosmico} 
          quantidade={qtdCosmico} 
          setQuantidade={setQtdCosmico} 
        />
      </div>

      {/* --- NOVO CARD: TOTAL DO PEDIDO --- */}
      {/* --- CARD: TOTAL DO PEDIDO COM DETALHAMENTO --- */}
<div className="card-total-geral">
  <h2>Resumo do Pedido</h2>
  <p style={{ color: "#64748b" }}>Total de itens: {qtdTradicional + qtdEspecial + qtdCosmico}</p>
  
  <hr />

  {/* Lista com o nome e quantidade de cada lanche se for maior que zero */}
  <div style={{ textAlign: "left", margin: "15px auto", maxWidth: "280px" }}>
    {qtdTradicional > 0 && (
      <p style={{ margin: "5px 0" }}>
        <strong>{qtdTradicional}x</strong> Hot-Dog Tradicional
      </p>
    )}
    {qtdEspecial > 0 && (
      <p style={{ margin: "5px 0" }}>
        <strong>{qtdEspecial}x</strong> Hot-Dog Especial
      </p>
    )}
    {qtdCosmico > 0 && (
      <p style={{ margin: "5px 0" }}>
        <strong>{qtdCosmico}x</strong> Hot-Dog Cósmico
      </p>
    )}
    
    {/* Mensagem caso o carrinho esteja completamente vazio */}
    {qtdTradicional === 0 && qtdEspecial === 0 && qtdCosmico === 0 && (
      <p style={{ color: "#94a3b8", textAlign: "center", fontStyle: "italic" }}>
        Nenhum item selecionado
      </p>
    )}
  </div>

  <hr />
  
  <h1 style={{ color: "#27ae60" }}>Total Geral: R$ {valorTotalPedido}</h1>
  <button className="btn-finalizar">Finalizar Compra</button>
</div>

      <Funcionario nome="Maria" cargo="Gerente" />
    </>
  );
}

export default App;