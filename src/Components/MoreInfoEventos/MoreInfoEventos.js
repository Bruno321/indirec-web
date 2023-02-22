import React, { useState } from "react";
import './MoreInfoEventos.css';
import { useFetchData } from "../../Hooks/Fetch.hook";

function MoreInfoEventos({trigger, setTrigger, datos}){
    const [equipos] = useFetchData('equipos');
    let equipoLocalObtenido
    let equipoVisitObtenido

    if(trigger){
        for(let i = 0; i < equipos.length; i++){
            if(datos.equipoLocal == equipos[i].equipoId){
                equipoLocalObtenido=equipos[i].nombre;
            }
            if(datos.equipoVisitante == equipos[i].equipoId){
                equipoVisitObtenido=equipos[i].nombre;
            }
        }
    }

    return trigger ? (
        <div className="more-info-eventos">
            <div className="container">
                <h2>{datos.nombreEvento}</h2>
                <div className="up">
                    <label>Fecha: {datos.fechaEvento}</label>
                    <label>Hora: {datos.horaEvento}</label>
                    <label>Jornadas: {datos.jornada}</label>
                    <label>Cancha: {datos.canchaJugada}</label>
                </div>
                <div className="middle">
                    <div className="info">
                        <p><b>Equipo local</b></p>
                        <p>Equipo:</p>
                        <p>{equipoLocalObtenido}</p>
                        <br></br>
                        <p>Director técnico:</p>
                        <p>{datos.directorTecnicoLocal}</p>
                        <br></br>
                        <p>Puntaje:</p>
                        <p>{datos.puntosLocal != "" ? `${datos.puntosLocal}` : "--"}</p>
                    </div>
                    <div className="info">
                        <p><b>Equipo visitante</b></p>
                        <p>Equipo:</p>
                        <p>{equipoVisitObtenido}</p>
                        <br></br>
                        <p>Director técnico:</p>
                        <p>{datos.directorTecnicoVisitante}</p>
                        <br></br>
                        <p>Puntaje:</p>
                        <p>{datos.puntosVisitante != "" ? `${datos.puntosVisitante}` : "--"}</p>  
                    </div>
                </div>
                <div className="botones-verjugadores">
                    <button className="ver-jugadores">Ver jugadores</button>
                    <button className="ver-jugadores">Ver jugadores</button>
                </div>

                <div className="bottom-observaciones">
                    <p>Observaciones:</p>
                    <p>{datos.incidentes != "" ? `${datos.incidentes}` : "--"}</p>
                </div>

                <button className='button-aceptar' onClick={()=> setTrigger(false)}>Aceptar</button>
            </div>
        </div>
    ) 
    :
    "";
}

export default MoreInfoEventos;