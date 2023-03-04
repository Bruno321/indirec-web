import React, { useState, useContext } from "react";
import { NavigationContext } from "../../Context/NavigationContext.js";
import './MoreInfoEventos.css';
import { useFetchData } from "../../Hooks/Fetch.hook";

function MoreInfoEventos(){
    const {itemId, setScreen} = useContext(NavigationContext)
    const [equipos] = useFetchData('equipos');
    const [eventos] = useFetchData(`eventos/${itemId}`);
    let equipoLocalObtenido
    let equipoVisitObtenido

    for(let i = 0; i < equipos.length; i++){
        if(eventos.equipoLocal == equipos[i].equipoId){
            equipoLocalObtenido=equipos[i].nombre;
        }
        if(eventos.equipoVisitante == equipos[i].equipoId){
            equipoVisitObtenido=equipos[i].nombre;
        }
    }

    return (
        // <div className="more-info-eventos">
        //     <div className="container">
        <>
            <h3>Evento: {eventos.nombreEvento}</h3>
                <div className="up">
                    <label>Fecha: {eventos.fechaEvento}</label>
                    <label>Hora: {eventos.horaEvento}</label>
                    <label>Jornadas: {eventos.jornada}</label>
                    <label>Cancha: {eventos.canchaJugada}</label>
                </div>
                <div className="middle">
                    <div className="info">
                        <p><b>Equipo local</b></p>
                        <p>Equipo:</p>
                        <p>{equipoLocalObtenido}</p>
                        <br></br>
                        <p>Director técnico:</p>
                        <p>{eventos.directorTecnicoLocal}</p>
                        <br></br>
                        <p>Puntaje:</p>
                        <p>{eventos.puntosLocal != "" ? `${eventos.puntosLocal}` : "--"}</p>
                    </div>
                    <div className="info">
                        <p><b>Equipo visitante</b></p>
                        <p>Equipo:</p>
                        <p>{equipoVisitObtenido}</p>
                        <br></br>
                        <p>Director técnico:</p>
                        <p>{eventos.directorTecnicoVisitante}</p>
                        <br></br>
                        <p>Puntaje:</p>
                        <p>{eventos.puntosVisitante != "" ? `${eventos.puntosVisitante}` : "--"}</p>  
                    </div>
                </div>
                <div className="botones-verjugadores">
                    <button className="ver-jugadores">Ver jugadores</button>
                    <button className="ver-jugadores">Ver jugadores</button>
                </div>

                <div className="bottom-observaciones">
                    <p>Observaciones:</p>
                    <p>{eventos.incidentes != "" ? `${eventos.incidentes}` : "--"}</p>
                </div>

                <button className='button-aceptar' onClick={()=>setScreen(8)}>Aceptar</button>
        </>
                
        //     </div>
        // </div>
    )
}

export default MoreInfoEventos;