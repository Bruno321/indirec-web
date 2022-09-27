import React, {useContext, useState} from "react";
// Cargar estilo
import "./MenuDropdown.css";
// Cargar logo de la INDEREQ
import IndereqLogo from "../../assets/img/indereq-logo.png";
// Cargar iconos
import ClockIcon from "../../assets/icons/clock-icon.png";
import RollCallIcon from "../../assets/icons/roll-call-icon.png";
import FootballIcon from "../../assets/icons/football-icon.png";
// Importar Contextos
import {NavigationContext} from "../../Context/NavigationContext.js";

// const screenDeportistas = 0;
// const screenAsistencias = 1;
// const screenPaseDeLista = 2;


const MenuDropdown = () => {

  const {screen, setScreen} = useContext(NavigationContext);


  return (
    <aside className="menu-dropdown">
      <div>
        <img src={IndereqLogo} alt="Logotipo de la INDEREQ" className="indereq-logo"/>
      </div>
      <div className = "options">
        <div className = "block-section" onClick={()=>setScreen(0)}>
          <img src = {FootballIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-txt underline-default txt-deportista">Deportistas</span>
        </div>
        {/*onClick = {()=> setData(1)}*/}
        <div className = "block-section" onClick={()=>setScreen(1)}>
          <img src = {ClockIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-txt hover-animation">Asistencias</span>
        </div>
        <div className = "block-section" onClick={()=>setScreen(2)}>
            <img src = {RollCallIcon} className = "logo-section margin-img"/>
          <span className = "title-option margin-lista hover-animation">Pase de Lista</span>
        </div>
        </div>
    </aside>
  );
};
export default MenuDropdown;
