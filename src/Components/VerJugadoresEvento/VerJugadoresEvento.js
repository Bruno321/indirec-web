import React, { useEffect, useState } from 'react';
import './VerJugadoresEvento.css';

function VerJugadoresEvento({trigger, setTrigger, equipoID, listaJugadores, equipo}){

    let listaJugadoresFinal =[];

    if(trigger){
        for (let i = 0; i < listaJugadores.length; i++ ){
            if(listaJugadores[i].equipoId == equipoID){
                listaJugadoresFinal.push(listaJugadores[i])
            }
        }

    }

    function vaciarArray(){
        listaJugadoresFinal = [];
    }

    return trigger ? (
        <div className='ver-jugadores-container'>
            <div className='ver-jugadores-container-inner'>
                <div className='ver-jugadores-upper'><h3>{equipo}</h3><br></br></div>
                <div className='table-container'>
                    <table className="tableEquiposJugadores">
                        <tbody>
                            <tr id="headerTableEquipos">
                                <th className="headerTables">#</th>
                                <th className="headerTables headerNombreCompleto">Nombre completo</th>
                            </tr>
                            {
                                listaJugadoresFinal ? (
                                listaJugadoresFinal.map(element => (
                                    <tr key={element.numJugador} className="trEquiposJugadores">
                                        <td className="trNum">{element.numJugador}</td>
                                        <td className="trNombre">{element.nombres} {element.apellidos}</td>
                                    </tr>
                                )))
                                :
                                ''
                            }
                        </tbody>
                    </table>
                </div>
                <div className='ver-jugadores-bottom'>
                    <button className='button-ver-jugadores' onClick={()=> {setTrigger(false); vaciarArray}}>Aceptar</button>
                </div>
            </div>
        </div>
    ) : ''
}

export default VerJugadoresEvento