import Header from "./COMPONENTS/HEADER";
import Login from "./COMPONENTS/login";
import Cardprod from "./COMPONENTS/Card.prod"
import Funcionario from "./COMPONENTS/Funcionario"


function App(){
  return(

    <>

    < Header titulo ="LANCHYS"   subtitulo =" the best hot-dog" /> 
      {/* aqui famos fazer os pedacinhos */}
    <Login />
    
    <Cardprod nome="Hot-Dog Tradicional"  preco="20" />
    <Cardprod nome="Hot-Dog Especial"  preco="28" />
    <Cardprod nome="Hot-Dog Cósmico"  preco="35" />

    <Funcionario nome=" Maria"  cargo=" Gerente" />
    </>

  )

}

export default App 
