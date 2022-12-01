import React, {useContext, useState} from "react";
// Cargar estilo
// Cargar logo de la INDEREQ
// Cargar iconos
import ClockIcon from "../../assets/icons/clock-icon.png";
import RollCallIcon from "../../assets/icons/roll-call-icon.png";
import FootballIcon from "../../assets/icons/football-icon.png";
import LogoutIcon from "../../assets/icons/log-out.png";
import RegisterIcon from "../../assets/icons/register.png";
import TeamIcon from "../../Assets/icons//user-group.png";
// Importar Contextos
import { NavigationContext } from "../../Context/NavigationContext.js";
import { LoginContext } from "../../Context/LoginContext";
import IndereqLogo from "../../assets/img/indereq-logo.png";
import "./MenuDropdown.css";


const MenuDropdown = () => {

  const {screen, setScreen} = useContext(NavigationContext);
  const {cerrarSesion} = useContext(LoginContext);

  return (
    <aside className="menu-dropdown">
      <div>
        <img src={IndereqLogo} alt="Logotipo de la INDEREQ" className="indereq-logo"/>
      </div>
      <div className = "options">
        <div className = "block-section" onClick={()=>setScreen(0)}>
          <img src = {FootballIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-txt txt-deportista" style = {{
            textDecoration: screen === 0 ? "underline white" : "none",
            
          }}>Deportistas</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(1)}>
          <img src = {ClockIcon} className = "logo-section margin-img margin-img-asistencia"/>
          <span className = "title-option margin-asistencias" style ={{
            textDecoration: screen === 1 ? "underline white" : "none",
          }}>Asistencias</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(2)}>
            <img src = {RegisterIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-lista hover-animation" style ={{
            textDecoration: screen === 2 ? "underline white" : "none",
          }}>Registrar deportista</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(3)}>
            <img src = {RollCallIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-lista hover-animation" style ={{
            textDecoration: screen === 3 ? "underline white" : "none",
          }}>Pase de lista</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(4)}>
            <img src = {RollCallIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-lista hover-animation" style ={{
            textDecoration: screen === 4 ? "underline white" : "none",
          }}>Registrar equipo</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(5)}>
          <img src = {TeamIcon} className = "logo-section margin-img margin-img-asistencia"/>
          <span className = "title-option margin-asistencias" style ={{
            textDecoration: screen === 5 || screen==6 ? "underline white" : "none",
          }}>Equipos</span>
        </div>
        <div className = "block-section" onClick={()=>cerrarSesion()}>
            <img src = {LogoutIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-lista hover-animation" >Cerrar sesión</span>
        </div>
        </div>
    </aside>
  );
};
export default MenuDropdown;
