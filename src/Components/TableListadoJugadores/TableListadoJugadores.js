import React, {useEffect, useState} from "react";
import { useFetchData } from "../../Hooks/Fetch.hook";
import circleAdd from "../../Assets/icons/circleAdd.png";
import trash from "../../Assets/icons/trash.png";

/**
 * 
 * @params jugadores-> arreglo que contiene los jugadores que han sido añadidos a la lista y asi poder saber si se cambiara el color de la fila a gris.
 * @params setJugadoresEquipo -> permite agregar los jugadores que perteneceran al equipo o al evento.
 * @params deportistas -> parametro que contiene un arreglo de todos los deportistas que se renderizaran y mostraran en la tabla.
 * @params mostrarListaCompleta -> booleano que permite saber si se mostraran todos los deportistas, en caso de ser false, solo renderizara los deportistas que no estan asociados con un equipoId
 * @params limpiar -> parametro que permite restablecer el arreglo de jugadores a un arreglo vacio. (aplica solo para registrar eventos)
 * 
 */

const TableListadoJugadores = ({jugadores, setJugadoresEquipo, deportistas, mostrarListaCompleta, limpiar}) => {

    const [jugadoresEquipoArreglo, setJugadoresEquipoArreglo] = useState([]);//Arreglo que sirve para saber que jugadores estan siendo seleccionados y cambiar el color de la fila. 
    
    useEffect(() => {
        if (jugadores?.length) {
            setJugadoresEquipoArreglo(jugadores);
        }
    }, []);

    useEffect(() => {
        setJugadoresEquipo(jugadores)
        
    }, [limpiar]);

    const agregarJugador = (index) =>{
        setJugadoresEquipoArreglo(arr => [...arr, deportistas[index]]);
        setJugadoresEquipo(arr => [...arr, deportistas[index]]);
    }

    const quitarJugador = (index) => {
        setJugadoresEquipoArreglo(jugadoresEquipoArreglo.filter(jugador => jugador.deportistaId != deportistas[index].deportistaId)); //Cambiarlo por el expediente
        setJugadoresEquipo(jugadoresEquipoArreglo.filter(jugador => jugador.deportistaId != deportistas[index].deportistaId));
    }

    return(
        <table id="tableJugadoresEquipo" className="tableListaJugadoresEquipo">
            <tbody>
                <tr className="rowJugadoresEquipoHeader">
                    <th className="headerTables">#</th>
                    <th className="headerTables headerNombreCompleto">Nombre completo</th>
                    <th className="headerAcciones"></th>
                </tr>
                {
                    deportistas.map((element, index) => (element.equipoId == null || mostrarListaCompleta) ? (
                        <tr
                            key={element.deportistaId}
                            className={`rowJugadorEquipo ${
                                jugadoresEquipoArreglo.findIndex(jugador => jugador.deportistaId === element.deportistaId) > -1 ? 'colorearFila' : ''}`
                            }
                        >
                            <td>{element.numJugador}</td>
                            <td className="headerNombreCompleto">{element.nombres} {element.apellidos}</td>
                            <td>
                                <div className="containerIconsAcciones">
                                    <div
                                        className={`containerAccionAgregar ${
                                            jugadoresEquipoArreglo.findIndex(jugador => jugador.deportistaId === element.deportistaId) > -1 ? 'deshabilitarBtn' : ''}`
                                        }
                                        onClick={() => agregarJugador(index)}>
                                        <img className="iconsAcciones" src={circleAdd}/>
                                        <p>Añadir</p>
                                    </div>
                                <img
                                    className={`iconsAcciones ${
                                        jugadoresEquipoArreglo.findIndex(jugador => jugador.deportistaId === element.deportistaId) > -1 ? '' : 'deshabilitarBtn'}`
                                    }
                                    src={trash}
                                    onClick={() => quitarJugador(index)}/>
                            </div>
                        </td>
                    </tr>):'')
                }
            </tbody>
        </table>
    );
}

export default TableListadoJugadores;