import React, { useContext, useState } from "react";
// Cargar logo de la INDEREQ
import UAQFIFLogo from "../../assets/img/uaq-fif-logo.png";
// Cargar iconos
import ClockIcon from "../../assets/icons/clock-icon.png";
import RollCallIcon from "../../assets/icons/roll-call-icon.png";
import FootballIcon from "../../assets/icons/football-icon.png";
import LogoutIcon from "../../assets/icons/log-out.png";
import TeamIcon from "../../Assets/icons//user-group.png";
import EventosIcon from "../../Assets/icons/eventos.png";
import RegisterIcon from "../../Assets/icons/edit_icon.png";
// Importar Contextos
import { NavigationContext } from "../../Context/NavigationContext.js";
import { LoginContext } from "../../Context/LoginContext";
// Cargar estilo
import "./MenuDropdown.css";

const MenuDropdown = () => {
  const { screen, setScreen } = useContext(NavigationContext);
  const { cerrarSesion } = useContext(LoginContext);

  return (
    <aside className="menu-dropdown">
      <div className="logo-uaq-section">
        <img
          src={UAQFIFLogo}
          alt="imagen oficial de la Facultad de Informática de la Universidad Autónoma de Querétaro"
          className="uaq-fif-logo"
        />
      </div>
      {/* INICIO DE BIENVENIDA */}
      <div className="options">
        <div className="separation-container">
          <span className="separation-text">Bienvenido</span>
        </div>
        <div
          className="block-section"
          onClick={() => setScreen(3)}
          style={{
            backgroundColor: screen === 3 ? "#254D7A" : "transparent",
          }}
        >
          <img src={RollCallIcon} className="logo-section margin-img" />
          <span
            className="title-option margin-lista hover-animation"
            style={{
              textDecoration: screen === 3 ? "underline white" : "none",
            }}
          >
            Pase de lista
          </span>
        </div>
        {/* LISTADOS */}
        <div className="separation-container">
          <span className="separation-text">Listados</span>
        </div>
        <div
          className="block-section"
          onClick={() => setScreen(0)}
          style={{
            backgroundColor: screen === 0 ? "#254D7A" : "transparent",
          }}
        >
          <img src={FootballIcon} className="logo-section margin-img" />
          <span
            className="title-option margin-txt txt-deportista"
            style={{
              textDecoration: screen === 0 ? "underline white" : "none",
            }}
          >
            Deportistas
          </span>
        </div>
        <div
          className="block-section"
          onClick={() => setScreen(5)}
          style={{
            backgroundColor:
              screen === 5 || screen === 6 ? "#254D7A" : "transparent",
          }}
        >
          <img src={TeamIcon} className="logo-section margin-img" />
          <span
            className="title-option margin-asistencias"
            style={{
              textDecoration:
                screen === 5 || screen == 6 ? "underline white" : "none",
            }}
          >
            Equipos
          </span>
        </div>
        <div
          className="block-section"
          onClick={() => setScreen(1)}
          style={{
            backgroundColor:
              screen === 1 || screen === 11 ? "#254D7A" : "transparent",
          }}
        >
          <img
            src={ClockIcon}
            className="logo-section margin-img margin-img-asistencia"
          />
          <span
            className="title-option margin-asistencias"
            style={{
              textDecoration:
                screen === 1 || screen === 11 ? "underline white" : "none",
            }}
          >
            Asistencias
          </span>
        </div>
        <div
          className="block-section"
          onClick={() => setScreen(8)}
          style={{
            backgroundColor:
              screen === 8 || screen === 9 || screen === 10
                ? "#254D7A"
                : "transparent",
          }}
        >
          <img
            src={EventosIcon}
            className="logo-section margin-img margin-img-asistencia"
          />
          <span
            className="title-option margin-asistencias"
            style={{
              textDecoration:
                screen === 8 || screen === 9 || screen === 10
                  ? "underline white"
                  : "none",
            }}
          >
            Eventos
          </span>
        </div>
        {/* REGISTROS */}
        <div className="separation-container">
          <span className="separation-text">Registros</span>
        </div>

        <div
          className="block-section"
          onClick={() => setScreen(2)}
          style={{
            backgroundColor: screen === 2 ? "#254D7A" : "transparent",
          }}
        >
          <img src={RegisterIcon} className="logo-section margin-img" />
          <span
            className="title-option margin-lista hover-animation"
            style={{
              textDecoration: screen === 2 ? "underline white" : "none",
            }}
          >
            {/* Registrar */}
            Deportista
          </span>
        </div>

        <div
          className="block-section"
          onClick={() => setScreen(4)}
          style={{
            backgroundColor: screen === 4 ? "#254D7A" : "transparent",
          }}
        >
          <img src={RegisterIcon} className="logo-section margin-img" />
          <span
            className="title-option margin-lista hover-animation"
            style={{
              textDecoration: screen === 4 ? "underline white" : "none",
            }}
          >
            {/* Registrar */}
            Equipo
          </span>
        </div>

        <div
          className="block-section"
          onClick={() => setScreen(7)}
          style={{
            backgroundColor: screen === 7 ? "#254D7A" : "transparent",
          }}
        >
          <img
            src={RegisterIcon}
            className="logo-section margin-img margin-img-asistencia"
          />
          <span
            className="title-option margin-asistencias"
            style={{
              textDecoration: screen === 7 ? "underline white" : "none",
            }}
          >
            {/* Registrar */}
            Evento
          </span>
        </div>

        {/* Boton de cerrar sesión */}
        <div
          className="block-section logout-btn-section"
          onClick={() => cerrarSesion()}
        >
          <img src={LogoutIcon} className="logo-section margin-img" />
          <span className="title-option margin-lista hover-animation">
            Cerrar sesión
          </span>
        </div>
      </div>
    </aside>
  );
};
export default MenuDropdown;
