import React, { useState, useContext } from "react";
import { NavigationContext } from "../../Context/NavigationContext.js";
import './MoreInfoEventos.css';
import { useFetchData } from "../../Hooks/Fetch.hook";
import VerJugadoresEvento from "../VerJugadoresEvento/VerJugadoresEvento.js";

function MoreInfoEventos(){
    const {itemId, setScreen} = useContext(NavigationContext)
    const [evento] = useFetchData(`eventos/${itemId}`);

    const [equipoIdTable, setEquipoIdTable] = useState();
    const [nombreEquipo, setNombreEquipo]=useState();

    const [jugadores, setJugadores] = useState([]);

    const [trigger, setTrigger] = useState(false);

    return (
        <>
            <h3>Evento: {evento?.nombre}</h3>
                <div className="up">
                    <label>Fecha: {evento.fecha}</label>
                    <label>Hora: {evento.hora}</label>
                    <label>Jornadas: {evento.jornada}</label>
                    <label>Cancha: {evento.canchaJugada}</label>
                </div>
                <div className="middle">
                    <div className="info">
                        <p><b>Equipo local</b></p>
                        <p>Equipo:</p>
                        <p>{evento.EquipoLocal?.nombre}</p>
                        <br></br>
                        <p>Director técnico:</p>
                        <p>{evento.directorTecnicoLocal}</p>
                        <br></br>
                        <p>Puntaje:</p>
                        <p>{evento.puntosLocal === null ? "--" : `${evento.puntosLocal}` }</p>
                    </div>
                    <div className="info">
                        <p><b>Equipo visitante</b></p>
                        <p>Equipo:</p>
                        <p>{evento.EquipoVisitante?.nombre}</p>
                        <br></br>
                        <p>Director técnico:</p>
                        <p>{evento.directorTecnicoVisitante}</p>
                        <br></br>
                        <p>Puntaje:</p>
                        <p>{evento.puntosVisitante === null ? "--" : `${evento.puntosVisitante}` }</p>  
                    </div>
                </div>
                <div className="botones-verjugadores">
                    <button className="ver-jugadores" onClick={() => {
                        setEquipoIdTable(evento.EquipoLocal.id); 
                        setJugadores(evento.eventos_details.filter(({ deportista }) => deportista.equipo.id === evento.equipo_local_id));
                        setTrigger(true);
                        setNombreEquipo(evento.EquipoLocal?.nombre);
                    }}>
                        Ver jugadores
                    </button>
                    <button className="ver-jugadores" onClick={() => {
                        setEquipoIdTable(evento.EquipoVisitante.id);
                        setJugadores(evento.eventos_details.filter(({ deportista }) => deportista.equipo.id === evento.equipo_visitante_id));
                        setTrigger(true);
                        setNombreEquipo(evento.EquipoVisitante?.nombre);
                    }}>
                        Ver jugadores
                    </button>
                </div>

                <div className="bottom-observaciones">
                    <p>Observaciones:</p>
                    <p>{evento.incidentes === null ? "--" : `${evento.incidentes}` }</p>
                </div>

                <button className='button-aceptar' onClick={()=>setScreen(8)}>Aceptar</button>

                {/* Modals para ver a los jugadores */}
                <VerJugadoresEvento
                    trigger={trigger}
                    setTrigger={setTrigger}
                    setJugadores={setJugadores}
                    equipoID={equipoIdTable}
                    listaJugadores={jugadores}
                    equipo={nombreEquipo}
                />
            </>
    );
};

export default MoreInfoEventos;