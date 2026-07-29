import React from 'react';

function Funcionario({ nome, cargo, imagem }) {
  return (
    <div className="card-funcionario">
      {/* Adicionando a foto do funcionário */}
      <img src={imagem} alt={nome} className="img-funcionario-card" />
      
      <h3>{nome}</h3>
      <p><strong>Cargo:</strong> {cargo}</p>
    </div>
  );
}

export default Funcionario;

