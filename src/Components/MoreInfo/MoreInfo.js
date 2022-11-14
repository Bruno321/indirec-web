import React from 'react';
import './MoreInfo.css';

function MoreInfo(props) {
    return (props.trigger) ? (
        <div className='MoreInfo'>
            <div className='MoreInfo-inner'>
                <div className='inner-up'>
                    <div style={{height: "200px", width: "200px", backgroundColor:"black"}}/>

                    <div className='inner-up-left'>
                        <b><p>Expediente</p></b>
                        <p>exp</p>

                        <b><p>Nombre(s)</p></b>
                        <p>Nombre</p>
                    </div>

                    <div className='inner-up-middle'>
                        <b><p>No. Seguro Social</p></b>
                        <p>Numero seguro social</p>

                        <b><p>Apellidos</p></b>
                        <p>Apellidos</p>
                    </div>

                    <div className='inner-up-right'>
                        <b><p>Facultad</p></b>
                        <p>Facultad</p>

                        <b><p>Sexo</p></b>
                        <p>Sexo</p>
                    </div>
                </div>
                <div className='middle'>
                    <div>
                        <b><p>Deporte</p></b>
                        <p>Deporte</p>

                        <b><p>Correo electrónico</p></b>
                        <p>Correo electrónico</p>
                    </div>

                    <div>
                        <b><p>Subdivisión de deporte</p></b>
                        <p>Subdivisión</p>

                        <b><p>Teléfono</p></b>
                        <p>Teléfono</p>
                    </div>

                    <div>
                        <b><p>Jugador seleccionado</p></b>
                        <p>Si</p>

                        <b><p>Teléfono de emergencia</p></b>
                        <p>Tel emergencia</p>
                    </div>

                    <div>
                        <b><p>Número de jugador</p></b>
                        <p>Numero aa</p>
                    </div>

                </div>

                <div className='bottom'>
                    <div>
                        <b><p>Kárdex</p></b>
                        <button>Descargar archivo</button>
                    </div>

                    <div>
                        <b><p>Identificación oficial</p></b>
                        <button>Descargar archivo</button>
                    </div>
                </div>

                <button className='aceptar' onClick={()=> props.setTrigger(false)}>Aceptar</button>
            </div>
        </div>
    ) : "";
}

export default MoreInfo;