import React, {useEffect, useState} from "react";
import { useFetchData } from "../../Hooks/Fetch.hook";
import circleAdd from "../../Assets/icons/circleAdd.png";
import trash from "../../Assets/icons/trash.png";

const TableListadoJugadores = ({jugadores, setJugadoresEquipo}) => {

    const [jugadoresEquipoArreglo, setJugadoresEquipoArreglo] = useState([]);//Arreglo que sirve para saber que jugadores estan siendo seleccionados y cambiar el color de la fila. 
    const [deportistas] = useFetchData('deportistas');

    useEffect(() => {
        if (jugadores?.length) {
            setJugadoresEquipoArreglo(jugadores);
        }
    }, []);

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
                    deportistas.map((element, index) => element.equipoId == null ? (
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