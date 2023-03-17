import React, { useState, useContext } from "react";
import { NavigationContext } from "../../Context/NavigationContext.js";
import './MoreInfoEventos.css';
import { useFetchData } from "../../Hooks/Fetch.hook";
import VerJugadoresEvento from "../VerJugadoresEvento/VerJugadoresEvento.js";

function MoreInfoEventos(){
    const {itemId, setScreen} = useContext(NavigationContext)
    const [equipos] = useFetchData('equipos');
    const [deportistas] = useFetchData('deportistas');
    const [eventos] = useFetchData(`eventos/${itemId}`);

    const [equipoIdTable, setEquipoIdTable] = useState();
    const [nombreEquipo, setNombreEquipo]=useState();

    const [trigger, setTrigger] = useState(false);

    // Obtenemos los nombres de los equipos para el front

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

    //Obtenemos los jugadores de los equipos
    for(let i =0; i < deportistas.length; i++){
        if(eventos.equipoLocal == deportistas[i].equipoId){}}

    return (
        // <div className="more-info-eventos">
        //     <div className="container">
        <>
            <h3>Evento: {eventos.nombreEvento}</h3>
            <div className="more-info-eventos-container">
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
                        <p>{eventos.puntosLocal === null ? "--" : `${eventos.puntosLocal}` }</p>
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
                        <p>{eventos.puntosVisitante === null ? "--" : `${eventos.puntosVisitante}` }</p>  
                    </div>
                </div>
                <div className="botones-verjugadores">
                    <button className="ver-jugadores" onClick={() => {setEquipoIdTable(eventos.equipoLocal); setTrigger(true), setNombreEquipo(equipoLocalObtenido) }}>Ver jugadores</button>
                    <button className="ver-jugadores" onClick={()=>{setEquipoIdTable(eventos.equipoVisitante); setTrigger(true), setNombreEquipo(equipoVisitObtenido) } }>Ver jugadores</button>
                </div>

                <div className="bottom-observaciones">
                    <p>Observaciones:</p>
                    <p>{eventos.incidentes === null ? "--" : `${eventos.incidentes}` }</p>
                </div>

                <button className='button-aceptar' onClick={()=>setScreen(8)}>Aceptar</button>
                
            </div>

                {/* Modals para ver a los jugadores */}
                <VerJugadoresEvento
                    trigger={trigger}
                    setTrigger={setTrigger}
                    equipoID={equipoIdTable}
                    listaJugadores={deportistas}
                    equipo={nombreEquipo}
                />
            </>
                
        //     </div>
        // </div>
    )
}

export default MoreInfoEventos;