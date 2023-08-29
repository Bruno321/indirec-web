import React from "react";

import "./ModalQR.css";

import QRCode from "react-qr-code";
// import indereqIcon from "../../../Assets/icons/indereq-icon.png";
import close from "../../../Assets/icons/close.png";

/**
 * @param datos dentro del componente se pasa un objeto con el id y el nombre.
 * @ejemplo datos={{id: '1', nombre: 'Daniel Aros Ramirez'}}
 *  
*/

const ModalQR = ({ datos, setMostrarModalQr, setSelected }) => {

    debugger
    return (
        <div className="containerPrincipal-modal">
            <div className="container-modal">
                <div className="container-header">
                    <p className="title">Información guardada correctamente</p>
                    <img src={close} id="close" onClick={() => setMostrarModalQr(false)}/>
                </div>
                <div className="container-info">
                    <div className="container-img-qr">
                        <QRCode value={`${JSON.stringify(datos)}`} level='H' className="qr"/>
                        <div className="container-indereq-icon">
                            {/* <img src={indereqIcon} className="indereq-icon"/> */}
                        </div>
                    </div>
                    <p className="info">QR Generado.</p>
                    <p className="info">No olvides escanearlo en tu celular.</p>
                </div>
                <div className="container-button">
                    <button id="button-salir" onClick={() => {
                        setMostrarModalQr(false);
                        setSelected({});
                    }}>Salir</button>
                </div>
            </div>
        </div>
    )
}

export default ModalQR;

