import React from 'react';
import './MoreInfo.css';

function MoreInfo(props) {
    const {datos} = props;
    // console.log(datos)
    let urlFotoDeportista;
    let urlFotoCredencial;
    let urlFotoKardex;

    if(datos){
        // console.log(datos.fotoIdentificacionOficial);
        urlFotoDeportista = datos.foto.split('/');
        urlFotoDeportista = `http://localhost:3000/api/uploads/${urlFotoDeportista[1]}`;
        urlFotoKardex = datos.fotoCardex.split('/');
        urlFotoKardex = `http://localhost:3000/api/uploads/${urlFotoKardex[1]}`;
        urlFotoCredencial = datos.fotoIdentificacionOficial.split('/');
        urlFotoCredencial = `http://localhost:3000/api/uploads/${urlFotoCredencial[1]}`;
    }else{
        urlFotoDeportista = 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png';
    }

    return (props.trigger) ? (
        <div className='MoreInfo'>
            <div className='MoreInfo-inner'>
                <div className='inner-up'>
                    <div style={{height: "200px", width: "200px", backgroundColor:"black"}}>
                        <img src={urlFotoDeportista} width='200px' height='200px'/>
                    </div>

                    <div className='inner-up-left'>
                        <b><p>Expediente</p></b>
                        <p>{datos.expediente}</p>

                        <b><p>Nombre(s)</p></b>
                        <p>{datos.nombres}</p>
                    </div>

                    <div className='inner-up-middle'>
                        <b><p>No. Seguro Social</p></b>
                        <p>{datos.numSeguroSocial}</p>

                        <b><p>Apellidos</p></b>
                        <p>{datos.apellidos}</p>
                    </div>

                    <div className='inner-up-right'>
                        <b><p>Facultad</p></b>
                        <p>{datos.facultad}</p>

                        <b><p>Sexo</p></b>
                        <p>{datos.sexo == '0' ? 'Hombre' : 'Mujer' }</p>
                    </div>
                </div>
                <div className='middle'>
                    <div>
                        <b><p>Deporte</p></b>
                        <p>{datos.deporte}</p>

                        <b><p>Correo electrónico</p></b>
                        <p>{datos.correo}</p>
                    </div>

                    <div>
                        <b><p>Subdivisión de deporte</p></b>
                        <p>Subdivisión</p>

                        <b><p>Teléfono</p></b>
                        <p>{datos.telefono}</p>
                    </div>

                    <div>
                        <b><p>Jugador seleccionado</p></b>
                        <p>{datos.jugadorSeleccionado == '0' ? 'Si' : 'No'}</p>

                        <b><p>Teléfono de emergencia</p></b>
                        <p>{datos.telefonoEmergencia}</p>
                    </div>

                    <div>
                        <b><p>Número de jugador</p></b>
                        <p>{datos.numJugador}</p>
                    </div>

                </div>
                
                <form action={urlFotoKardex} method='GET' id='descargarKardex'></form>
                <form action={urlFotoCredencial} method='GET' id='descargarCredencial'></form>

                <div className='bottom'>
                    <div>
                        <b><p>Kárdex</p></b>
                        <button type='submit' form='descargarKardex' value='Submit'>Descargar archivo</button>
                    </div>

                    <div>
                        <b><p>Identificación oficial</p></b>
                        <button type='submit' form='descargarCredencial' value='Submit'>Descargar archivo</button>
                    </div>
                </div>
                

                <button className='aceptar' onClick={()=> props.setTrigger(false)}>Aceptar</button>
            </div>
        </div>
    ) : "";
}

export default MoreInfo;