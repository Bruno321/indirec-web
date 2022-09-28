import React from "react";
// Cargar estilo
import "./MenuDropdown.css";
// Cargar logo de la INDEREQ
import IndereqLogo from "../../assets/img/indereq-logo.png";
// Cargar iconos
import ClockIcon from "../../assets/icons/clock-icon.png";
import RollCallIcon from "../../assets/icons/roll-call-icon.png";
import FootballIcon from "../../assets/icons/football-icon.png";

const MenuDropdown = () => {
  return (
    <aside className="menu-dropdown">
      <div>
        <img src={IndereqLogo} alt="Logotipo de la INDEREQ" className="indereq-logo"/>
      </div>
      <div className = "options">
        <div className = "block-section">
          <img src = {FootballIcon} className = "logo-section"/>
          <span className = "title-option margin-deportista">Deportistas</span>
        </div>
        <div className = "block-section">
          <img src = {ClockIcon} className = "logo-section"/>
          <span className = "title-option margin-asistencia">Asistencias</span>
        </div>
        <div className = "block-section">
            <img src = {RollCallIcon} className = "logo-section"/>
          <span className = "title-option margin-lista">Pase de Lista</span>
        </div>
        </div>
    </aside>
  );
};
export default MenuDropdown;
