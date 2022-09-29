import React from 'react';
//Cargamos los estilos
import "./Header.css";
//Imagen
import MenuBurger from "../../Assets/icons/menu-burger.png";
import Search from "../../Assets/icons/search.png"
import Ordenar from "../../Assets/icons/ordenar.png";
import Filtro from "../../Assets/icons/filtro.png"
const Header = () => {

    return(
        <header>
            <img src={MenuBurger}/>
            <img src={Search}/>
            <input type={"text"} placeholder="Buscar por apellido(s)..." className='search-input'/>
            <div className='filtro-container'>
                <img src={Filtro}/>
                <p>Filtro</p>
            </div>
            <div className='ordenar-container'>
                <img src={Ordenar}/>
                <p>Ordenar</p>
            </div>
        </header>
    )
}

export default Header;