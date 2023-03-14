import React from 'react';
import './VerJugadoresEvento.css';

function VerJugadoresEvento({trigger, setTrigger, listaJugadores, setJugadores, equipo}){

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
                                listaJugadores ? (
                                listaJugadores.map(({ deportista }) => (
                                    <tr key={deportista.numJugador} className="trEquiposJugadores">
                                        <td className="trNum">{deportista.numJugador}</td>
                                        <td className="trNombre">{deportista.nombres} {deportista.apellidos}</td>
                                    </tr>
                                )))
                                :
                                ''
                            }
                        </tbody>
                    </table>
                </div>
                <div className='ver-jugadores-bottom'>
                    <button className='button-ver-jugadores' onClick={()=> {
                        setTrigger(false); 
                        setJugadores([]);
                    }}>
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    ) : ''
}

export default VerJugadoresEvento