import React, { useEffect, useState } from 'react';
//Cargamos los estilos
import "./Header.css";
//Imagen
import MenuBurger from "../../Assets/icons/menu-burger.png";

const Header = ({ onClick, screen }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        document.getElementById('imgIcon').style['transform'] = !visible ? 'rotate(180deg)' : 'rotate(0deg)';
    })

    return( 
        <header>
            <img src={MenuBurger} id='imgIcon' onClick={() => {
                onClick(!visible);
                setVisible(!visible);
            }}/>
        </header>
    )
}

export default Header;