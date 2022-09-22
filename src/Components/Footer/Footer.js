import React from "react";
// Cargamos el estilo
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className = "container-info">
        <p className="information-dev">Centro de Desarrollo</p>
        <p className="information-dev">Facultad de informática UAQ</p>
        <p className="information-dev">Todos los derechos reservados 2022 ©</p>
      </div>
    </footer>
  );
};

export default Footer;
