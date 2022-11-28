import React from "react";
import "./TableJugadoresEquipo.css";

const TableJugadoresEquipo = (props) => {
    return(
        <table className="tableEquiposJugadores">
            <tbody>
                <tr id="headerTableEquipos">
                    <th className="headerTables">#</th>
                    <th className="headerTables headerNombreCompleto">Nombre completo</th>
                </tr>
                {
                    props.listaJugadores ? (
                    props.listaJugadores.map(element => (
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
    )
}

export default TableJugadoresEquipo;