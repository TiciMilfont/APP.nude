import Header from "./COMPONENTS/HEADER";
import Login from "./COMPONENTS/login";
import Cardprod from "./COMPONENTS/Card.prod"
import Funcionario from "./COMPONENTS/Funcionario"
import Contador from "./COMPONENTS/Contador"
import "./App.css";


function App(){
  return(

    <>

    < Header titulo ="LANCHYS"   subtitulo =" the best hot-dog" /> 
      {/* aqui famos fazer os pedacinhos */}
    <Login />
     <div className ="menu-apresenta">
    <Cardprod nome="Hot-Dog Tradicional"  preco="20" />
    <Cardprod nome="Hot-Dog Especial"  preco="28" />
    <Cardprod nome="Hot-Dog Cósmico"  preco="35" />
    </div>

    <div className="menu-produtos">
        <Contador nome="Hot-Dog Tradicional" preco={20} />
        <Contador nome="Hot-Dog Especial" preco={28} />
        <Contador nome="Hot-Dog Cósmico" preco={35} />
      </div>

    <Funcionario nome=" Maria"  cargo=" Gerente" />
    </>

  )

}

export default App 
