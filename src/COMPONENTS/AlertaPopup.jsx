import React, { useEffect } from "react";


function AlertaPopup({ produto, onClose }) {
  // Fecha o alerta automaticamente após 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!produto) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h3>Item Adicionado!</h3>
        <img src={produto.imagem} alt={produto.nome} className="popup-img" />
        <p><strong>{produto.nome}</strong> foi adicionado à sua sacola.</p>
        <button onClick={onClose} className="popup-btn-fechar">OK</button>
      </div>
    </div>
  );
}

export default AlertaPopup;