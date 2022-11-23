import React from "react";
import "./TableJugadoresEquipo.css";

const TableJugadoresEquipo = () => {
    return(
        <table className="tableEquiposJugadores">
            <tbody>
                <tr id="headerTableEquipos">
                    <th>#</th>
                    <th>Nombre completo</th>
                </tr>
                <tr className="trEquiposJugadores">
                    <td className="trNum">7</td>
                    <td className="trNombre">Alan Ronaldo</td>
                </tr>
                <tr className="trEquiposJugadores">
                    <td className="trNum">7</td>
                    <td className="trNombre">Alan Ronaldo</td>
                </tr>
                <tr className="trEquiposJugadores">
                    <td className="trNum">7</td>
                    <td className="trNombre">Alan Ronaldo</td>
                </tr>
                <tr className="trEquiposJugadores">
                    <td className="trNum">7</td>
                    <td className="trNombre">Alan Ronaldo</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableJugadoresEquipo;