import React from "react";

import './ButtonsPages.css';
import flecha from "../../Assets/icons/vector.png";

const ButtonsPages = ({numberPage, setPagina}) => {

    const nextPage = () => {
        setPagina(numberPage + 1);
    }

    const previousPage = () => { 
        setPagina(numberPage - 1);
    }

    return(
        <div className="containerButtonsPages">
            <div className={`buttonsPages ${numberPage <= 1 ? 'deshabilitarBtn' : ''}`} onClick={() => previousPage()}>
                <img src={flecha}/>
            </div>
            <span>Página {numberPage}</span>
            <div className="buttonsPages rotation" onClick={() => nextPage()}>
                <img src={flecha}/>
            </div>
        </div>
    )
}

export default ButtonsPages;