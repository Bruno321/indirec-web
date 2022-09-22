import React from 'react';
//Cargamos los estilos
import "./Header.css";
//Imagen
import IndereqLogo from "../../assets/img/indereq-logo.png";

const Header = () => {

    return(
        <header>
            <img src={IndereqLogo}/>
        </header>
    )
}

export default Header;