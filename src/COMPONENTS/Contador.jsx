import { useState } from "react";

//  nome e o preço como propriedades (props)
function Contador({ nome, preco }) {
  const [contador, setContador] = useState(0);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", borderRadius: "8px" }}>
      <h3>{nome}</h3>
      <p>R$ {preco}</p>
      
      <h4>Quantidade: {contador}</h4>
      
      <button onClick={() => setContador(contador + 1)}>Adicionar</button>
      <button onClick={() => { if (contador > 0) setContador(contador - 1) }} style={{ marginLeft: "10px" }}>
        Remover
      </button>
    </div>
  );
}

export default Contador;