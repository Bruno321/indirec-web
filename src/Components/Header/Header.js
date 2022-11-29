import React, { useEffect, useState } from 'react';
import { Popover } from 'react-tiny-popover'
import { Filters } from './Filter';
import { Sort } from './Sort';
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
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);

    useEffect(() => {
        document.getElementById('imgIcon').style['transform'] = !visible ? 'rotate(180deg)' : 'rotate(0deg)';
    })

    useEffect(() => {
        setFiltersVisible(false);
        setSortVisible(false);
    }, [screen]);

    return( 
        <header>
            <img src={MenuBurger} id='imgIcon' onClick={() => {
                onClick(!visible);
                setVisible(!visible);
            }}/>
            {validHeaderScreens.includes(screen) ? 
                <>
                    <input type={"text"} placeholder="Buscar por apellido(s)..." className='search-input'/>
                    <Popover
                        isOpen={filtersVisible}
                        positions={['bottom']}
                        content={<Filters />}
                    >
                        <div onClick={() => {
                            setFiltersVisible(!filtersVisible);
                            setSortVisible(false);
                        }}>
                            <img src={Filtro}/>
                            <p>Filtro</p>
                        </div>
                    </Popover>
                    <Popover
                        isOpen={sortVisible}
                        positions={['bottom']}
                        content={<Sort />}
                    >
                        <div onClick={() => {
                            setSortVisible(!sortVisible);
                            setFiltersVisible(false);
                        }}>
                            <img src={Ordenar}/>
                            <p>Ordernar</p>
                        </div>
                    </Popover>
                </> : null
            }
        </header>
    )
}

export default Header;