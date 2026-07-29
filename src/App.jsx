import { useState } from "react";
import Header from "./COMPONENTS/HEADER";
import Login from "./COMPONENTS/login";
import Funcionario from "./COMPONENTS/Funcionario";
import CardProd from "./COMPONENTS/Card.prod";
import "./App.css";

function App() {
  // Preços dos lanches
  const pTradicional = 20;
  const pEspecial = 28;
  const pCosmico = 35;

  // Quantidades de cada lanche (Estados gerenciados pelo React)
  const [qtdTradicional, setQtdTradicional] = useState(0);
  const [qtdEspecial, setQtdEspecial] = useState(0);
  const [qtdCosmico, setQtdCosmico] = useState(0);

  // Lista estática da equipe de funcionários
  const dadosFuncionarios = [
    { id: 1, nome: "Maria", cargo: "Gerente",imagem: "/imagem/dog3.jpg" },
    { id: 2, nome: "João", cargo: "Atendente",imagem: "/imagem/dog2.jpg" },
    { id: 3, nome: "Carlos", cargo: "Chapeiro", imagem: "/imagem/dod1.jpg" }
  ];

  // Cálculo dinâmico do valor total do pedido
  const valorTotalPedido =
    qtdTradicional * pTradicional +
    qtdEspecial * pEspecial +
    qtdCosmico * pCosmico;

  return (
    <>
      <Header titulo="LANCHYS" subtitulo="the best hot-dog" />
      <Login />

      {/* Seção de produtos unificada com imagem e botões */}
      <div className="menu-produtos">
        <CardProd
          nome="Hot-Dog Tradicional"
          preco={pTradicional}
          imagem="/imagem/tradi.png"
          quantidade={qtdTradicional}
          setQuantidade={setQtdTradicional}
        />
        <CardProd
          nome="Hot-Dog Especial"
          preco={pEspecial}
          imagem="/imagem/espe.png"
          quantidade={qtdEspecial}
          setQuantidade={setQtdEspecial}
        />
        <CardProd
          nome="Hot-Dog Cósmico"
          preco={pCosmico}
          imagem="/imagem/cosm.png"
          quantidade={qtdCosmico}
          setQuantidade={setQtdCosmico}
        />
      </div>

      {/* Seção do Resumo do Pedido (Estilizada pelo App.css) */}
      <div className="card-total-geral">
        <h2>Resumo do Pedido</h2>
        <p className="total-itens-texto">
          Total de itens: {qtdTradicional + qtdEspecial + qtdCosmico}
        </p>

        <hr />

        <div className="lista-resumo-itens">
          {qtdTradicional > 0 && (
            <p>
              <strong>{qtdTradicional}x</strong> Hot-Dog Tradicional
            </p>
          )}
          {qtdEspecial > 0 && (
            <p>
              <strong>{qtdEspecial}x</strong> Hot-Dog Especial
            </p>
          )}
          {qtdCosmico > 0 && (
            <p>
              <strong>{qtdCosmico}x</strong> Hot-Dog Cósmico
            </p>
          )}

          {/* Mensagem exibida apenas quando o carrinho está vazio */}
          {qtdTradicional === 0 && qtdEspecial === 0 && qtdCosmico === 0 && (
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

