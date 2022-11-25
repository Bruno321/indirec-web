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
                    props.listaJugadores.map(element => (
                        <tr key={element.num} className="trEquiposJugadores">
                            <td className="trNum">{element.num}</td>
                            <td className="trNombre">{element.nombre}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TableJugadoresEquipo;