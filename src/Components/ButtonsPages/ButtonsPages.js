import React from "react";

import './ButtonsPages.css';
import flecha from "../../Assets/icons/vector.png";

const ButtonsPages = ({numberPage, setPagina, total}) => {

    const nextPage = () => {
        setPagina(numberPage + 1);
    }

    const previousPage = () => { 
        setPagina(numberPage - 1);
    }

    return(
        <div className="containerButtonsPages">
            <div className={`buttonsPages ${numberPage <= 0 ? 'deshabilitarBtn' : ''}`} onClick={() => previousPage()}>
                <img src={flecha}/>
            </div>
            <span>Página {numberPage + 1} / {Math.ceil(total/10)}</span>
            <div className={`buttonsPages rotation ${(numberPage+1)*10 >= total ? 'deshabilitarBtn' : ''}`} onClick={() => nextPage()}>
                <img src={flecha}/>
            </div>
        </div>
    )
}

export default ButtonsPages;