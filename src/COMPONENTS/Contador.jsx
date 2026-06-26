
function Contador({ nome, preco, quantidade, setQuantidade }) {
  
    // O preço total do item específico continua sendo calculado aqui
    const precoTotal = quantidade * preco;
  
    return (
      <div style={{ 
        border: "1px solid #ccc", 
        padding: "20px", 
        borderRadius: "8px", 
        margin: "10px",
        width: "220px",
        textAlign: "center",
        backgroundColor: "white"
      }}>
        <h2>{nome}</h2>
        <p>Preço unitário: R$ {preco}</p>
        <p>Quantidade: {quantidade}</p>
        <p><strong>Subtotal: R$ {precoTotal}</strong></p>
        
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button onClick={() => setQuantidade(quantidade + 1)}>Adicionar</button>
          <button onClick={() => { if (quantidade > 0) setQuantidade(quantidade - 1) }}>Remover</button>
        </div>
      </div>
    );
  }
  
  export default Contador;