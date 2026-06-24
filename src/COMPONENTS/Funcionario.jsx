function Funcionario({ nome, cargo }) {
    return (
        <div style={{ textAlign: "center" }}>
            <h3>{nome}</h3>
            <p> Cargo: {cargo}</p>
        </div>
    );
}

export default Funcionario;