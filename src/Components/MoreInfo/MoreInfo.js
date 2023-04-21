import React, { useEffect, useState } from 'react';
import { DEV, URL } from '../../Service/Api';
import './MoreInfo.css';

const oInitState = {
    fotoCardex: null,
    fotoIdentificacionOficial: null,
    foto: null
};

function MoreInfo({ datos, trigger, setTrigger }) {
    const [files, setFiles] = useState(oInitState);

    useEffect(() => {
        if (datos) {
            let aTmp = {...files};
            for (const fKey in oInitState) { 
                if (datos[fKey]) {
                    aTmp = {
                        ...aTmp,
                        [fKey]: DEV ? `${URl}/${datos[fKey]}` : datos[fKey]
                    };
                }
            }
            setFiles(aTmp);
        } else {
            setFiles({
                ...files,
                foto: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'
            });
        }
    }, [datos]);

    const handleDownload = oUrl => {
        const link = document.createElement('a');
        link.href = oUrl;
        link.setAttribute('download', '');
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');

        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }

    return trigger ? (
        <div className='MoreInfo'>
            <div className='MoreInfo-inner'>
                <div className='inner-up'>
                    <div style={{height: "200px", width: "200px", backgroundColor:"black"}}>
                        <img src={files.foto} width='200px' height='200px'/>
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

                <div className='bottom'>
                    <div>
                        <b><p>Kárdex</p></b>
                        <button onClick={() => handleDownload(files.fotoCardex)}>Descargar archivo</button>
                    </div>

                    <div>
                        <b><p>Identificación oficial</p></b>
                        <button onClick={() => handleDownload(files.fotoIdentificacionOficial)}>Descargar archivo</button>
                    </div>
                </div>
                

                <button className='aceptar' onClick={() => setTrigger(false)}>Aceptar</button>
            </div>
        </div>
    ) : "";
}

export default MoreInfo;