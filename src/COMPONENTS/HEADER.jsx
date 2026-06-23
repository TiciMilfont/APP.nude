import "./header.css"
function Header({titulo, subtitulo}) {
    return (
<>
        <div className="titulo">
       
        <h1> {titulo} </h1>
        
        </div>

        <div className="Login">
        <h2>{subtitulo}</h2>
      </div>
    </>
       
       
    )
}

export default Header