function Cardprod({ nome, preco }) {
    return (
        <div style={{ textAlign: "center" }}>
            <h3>{nome}</h3>
            <p>R$ {preco}</p>
        </div>
    );
}

export default Cardprod;