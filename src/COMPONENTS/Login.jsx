import React from 'react';
import './Login.css'; 

export default function Login() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <input 
          type="text" 
          placeholder="Usuário" 
          className="login-input"
        />
        <input 
          type="password" 
          placeholder="Senha" 
          className="login-input"
        />
        <button 
          type="submit" 
          className="login-button"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
