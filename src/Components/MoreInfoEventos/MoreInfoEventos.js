import React from "react";
import './MoreInfoEventos.css';

function MoreInfoEventos({trigger, setTrigger, datos}){
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
                    <div className="info-local">
                        <p><b>Información del equipo local</b></p>
                        <p>Equipo:</p>
                        <p>NOMBRE DE EQUIPO</p>
                        <br></br>
                        <p>Director técnico:</p>
                        <p>{datos.directorTecnicoLocal}</p>
                        <br></br>
                        <p>Puntaje:</p>
                        <p>{datos.puntosLocal != "" ? `${datos.puntosLocal}` : "--"}</p>
                    </div>
                    <div className="info-visitante">
                        <p><b>Información del equipo visitante</b></p>
                        <p>Equipo:</p>
                        <p>NOMBRE DE EQUIPO</p>
                        <br></br>
                        <p>Director técnico:</p>
                        <p>{datos.directorTecnicoVisitante}</p>
                        <br></br>
                        <p>Puntaje:</p>
                        <p>{datos.puntosVisitante != "" ? `${datos.puntosVisitante}` : "--"}</p>  
                    </div>
                </div>
                <div className="botones-verjugadores">
                    <buton className="ver-jugadores">Ver jugadores</buton>
                    <buton className="ver-jugadores">Ver jugadores</buton>
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