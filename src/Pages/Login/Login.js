import React from "react";
import "./Login.css";

import logoIndereq from '../../Assets/icons/logo-Indereq.svg';
import imageMain from '../../Assets/img/image-main.png';

const Login = () => {
  return (
    <div className="login-container">
      <div className="left-side">
        <img src={logoIndereq} alt="Logo de INDEREQ" className="logo" />
        <img src={imageMain} alt="Imagen de bienvenida" className="image-main" />
      </div>
      <div className="right-side">
        <form className="form">
          <h1>Bienvenido a INDEREQ</h1>
          <h2>Iniciar Sesión</h2>
          <label>Correo electrónico:</label>
          <input type="text" placeholder="usuario@email.com" className="form-input" />
          <label>Contraseña:</label>
          <input type="password" placeholder="********" className="form-input" />
          <input type="submit" value="Iniciar Sesión" className="btn-login"/>
        </form>
      </div>
    </div>
  );
};

export default Login;
