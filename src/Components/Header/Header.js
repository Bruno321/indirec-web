import React, { useEffect, useState } from 'react';
//Cargamos los estilos
import "./Header.css";
//Imagen
import MenuBurger from "../../Assets/icons/menu-burger.png";
import Search from "../../Assets/icons/search.png"
import Ordenar from "../../Assets/icons/ordenar.png";
import Filtro from "../../Assets/icons/filtro.png"
const Header = ({onClick}) => {

    // let visible1 = true;
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if(!visible){
            document.getElementById('imgIcon').style['transform'] = 'rotate(180deg)'
        }else{
            document.getElementById('imgIcon').style['transform'] = 'rotate(0deg)'
        }
    })

    return(
        <header>
            <img src={MenuBurger} id='imgIcon' onClick={() => {
                onClick(!visible);
                setVisible(!visible);
            }}/>
            {/* <img src={Search}/> */}
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