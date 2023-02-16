import React, {useContext, useState} from "react";
// Cargar logo de la INDEREQ
import IndereqLogo from "../../assets/img/indereq-logo.png";
// Cargar iconos
import ClockIcon from "../../assets/icons/clock-icon.png";
import RollCallIcon from "../../assets/icons/roll-call-icon.png";
import FootballIcon from "../../assets/icons/football-icon.png";
import LogoutIcon from "../../assets/icons/log-out.png";
import RegisterIcon from "../../assets/icons/register.png";
import TeamIcon from "../../Assets/icons//user-group.png";
import RegisterTeam from "../../Assets/icons/register-team.png";
import RegistrarEvento from "../../Assets/icons/registrar-eventos.png"
import EventosIcon from "../../Assets/icons/eventos.png";
// Importar Contextos
import { NavigationContext } from "../../Context/NavigationContext.js";
import { LoginContext } from "../../Context/LoginContext";
// Cargar estilo
import "./MenuDropdown.css";


const MenuDropdown = () => {

  const {screen, setScreen} = useContext(NavigationContext);
  const {cerrarSesion} = useContext(LoginContext);

  return (
    <aside className="menu-dropdown">
      <div>
        {/* <img src={IndereqLogo} alt="Logotipo de la INDEREQ" className="indereq-logo"/> */}
      </div>
      <div className = "options">
        <div className = "block-section" onClick={()=>setScreen(0)}
          style = {{
            backgroundColor: screen === 0 ? "#254D7A" : "transparent",
          }}
        >
          <img src = {FootballIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-txt txt-deportista" style = {{
            textDecoration: screen === 0 ? "underline white" : "none",
            
          }}>Deportistas</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(1)}
                  style = {{
                    backgroundColor: screen === 1 ? "#254D7A" : "transparent",
                  }}>
          <img src = {ClockIcon} className = "logo-section margin-img margin-img-asistencia"/>
          <span className = "title-option margin-asistencias" style ={{
            textDecoration: screen === 1 ? "underline white" : "none",
          }}>Asistencias</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(2)}
                  style = {{
                    backgroundColor: screen === 2 ? "#254D7A" : "transparent",
                  }}>
            <img src = {RegisterIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-lista hover-animation" style ={{
            textDecoration: screen === 2 ? "underline white" : "none",
          }}>Registrar deportista</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(3)}
                  style = {{
                    backgroundColor: screen === 3 ? "#254D7A" : "transparent",
                  }}>
            <img src = {RollCallIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-lista hover-animation" style ={{
            textDecoration: screen === 3 ? "underline white" : "none",
          }}>Pase de lista</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(4)}
                  style = {{
                    backgroundColor: screen === 4 ? "#254D7A" : "transparent",
                  }}>
            <img src = {RegisterTeam} className = "logo-section margin-img"/>
          <span className = "title-option margin-lista hover-animation" style ={{
            textDecoration: screen === 4 ? "underline white" : "none",
          }}>Registrar equipo</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(5)}
                  style = {{
                    backgroundColor: screen === 5 || screen === 6  ? "#254D7A" : "transparent",
                  }}>
          <img src = {TeamIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-asistencias" style ={{
            textDecoration: screen === 5 || screen==6 ? "underline white" : "none",
          }}>Equipos</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(7)}
                  style = {{
                    backgroundColor: screen === 7  ? "#254D7A" : "transparent",
                  }}>
          <img src = {RegistrarEvento} className = "logo-section margin-img margin-img-asistencia"/>
          <span className = "title-option margin-asistencias" style ={{
            textDecoration: screen === 7 ? "underline white" : "none",
          }}>Registrar Evento</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(8)}
                  style = {{
                    backgroundColor: screen === 8  ? "#254D7A" : "transparent",
                  }}>
          <img src = {EventosIcon} className = "logo-section margin-img margin-img-asistencia"/>
          <span className = "title-option margin-asistencias" style ={{
            textDecoration: screen === 8 ? "underline white" : "none",
          }}>Eventos</span>
        </div>
        {/* Boton de cerrar sesión */}
        <div className = "block-section" onClick={()=>cerrarSesion()}>
            <img src = {LogoutIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-lista hover-animation" >Cerrar sesión</span>
        </div>
        </div>
    </aside>
  );
};
export default MenuDropdown;
