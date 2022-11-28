import React, { useEffect, useState } from 'react';
//Cargamos los estilos
import "./Header.css";
//Imagen
import MenuBurger from "../../Assets/icons/menu-burger.png";
import Ordenar from "../../Assets/icons/ordenar.png";
import Filtro from "../../Assets/icons/filtro.png";

// ? Modify when a new screen is added
const validHeaderScreens = [0, 1, 5];

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
            {validHeaderScreens.includes(screen) ? 
                <>
                    <input type={"text"} placeholder="Buscar por apellido(s)..." className='search-input'/>
                    <div className='filtro-container'>
                        <img src={Filtro}/>
                        <p>Filtro</p>
                    </div>
                    <div className='ordenar-container'>
                        <img src={Ordenar}/>
                        <p>Ordenar</p>
                    </div>
                </> : null
            }
        </header>
    )
}

export default Header;