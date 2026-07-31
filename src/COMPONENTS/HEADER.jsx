import "./header.css";

function Header({ titulo, subtitulo, totalItens }) {
  return (
    <>
      <div className="titulo">
        <h1>{titulo}</h1>
      </div>

      <div className="Login">
        <h2>{subtitulo}</h2>
      </div>

      {/* Exibe a sacola com a imagem sac.jpg e a quantidade total atualizada */}
      <div className="sacola-header">
        <button className="btn-sacola">
          <img 
            src="/imagem/sac.jpg" 
            alt="Sacola" 
            className="img-sacola-header" 
          />
          Sacola ({totalItens || 0})
        </button>
      </div>
    </>
  );
}

export default Header;