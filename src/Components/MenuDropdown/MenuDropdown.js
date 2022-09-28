import React, {useContext, useState} from "react";
// Cargar estilo
// Cargar logo de la INDEREQ
// Cargar iconos
import ClockIcon from "../../assets/icons/clock-icon.png";
import RollCallIcon from "../../assets/icons/roll-call-icon.png";
import FootballIcon from "../../assets/icons/football-icon.png";
// Importar Contextos
import {NavigationContext} from "../../Context/NavigationContext.js";

import "./MenuDropdown.css";


const MenuDropdown = () => {

  const {screen, setScreen} = useContext(NavigationContext);


  return (
    <aside className="menu-dropdown">
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
