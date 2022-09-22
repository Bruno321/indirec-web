import React from "react";
import "./Table.css";
import iconDelete from "../../Assets/img/delete.png";
import iconEdit from "../../Assets/img/edit.png";
import search from "../../Assets/img/search.png"

/**
 * @param datos Se recibe como un arreglo de objetos.
 * @param tipo El tipo de datos especifica a la tabla que campos se renderizan. Los parametros son 'asistencias' o 'deportistas'
 * @ejemplo para asistencias let datos = [
        {
            nombre: 'Daniel',
            apellidos: 'Aros Ramirez',
            fecha: '21/09/2022',
            horaEntrada: '10:48',
            horaSalida: '13:52'
        },
    ]
 * @ejemplo para deportistas let datos = [
        {
            expediente: '290246',
            nombre: 'Daniel',
            apellidos: 'Aros Ramirez',
            facultad: 'informatica',
            correo: 'danielaros200@gmail.com',
            telefono: '4681121267',
            telefonoEmergencia: '6881583',
            noJugador: '2'
        },
    ]
*/

const Table = (props) => {
    const {datos, tipo} = props;

    return (
        <div className="container">
            {
                tipo == 'deportistas'
                ?
                    <h3>Deportistas</h3>
                :
                    <h3>Asistencias</h3>
            }
            <label htmlFor="buscador">Buscar por apellido(s):</label>
            <br/>
            <div className="container-search">
                <input type='text' id="buscador"/>
                <img src={search} className="img"/>
            </div>
            <table id="data">
                <tbody>
                    <tr className="header">
                        {
                            tipo == 'deportistas'
                            ?   
                                <>
                                    <th>Expediente</th>
                                    <th>Nombre(s)</th>
                                    <th>Apellido(s)</th>
                                    <th>Facultad</th>
                                    <th>Correo</th>
                                    <th>Teléfono</th>
                                    <th>Tel. de emergencia</th>
                                    <th>No. Jugador</th>
                                    <th></th>
                                </>
                            :
                                <>
                                    <th>Nombre(s)</th>
                                    <th>Apellido(s)</th>
                                    <th>Fecha</th>
                                    <th>Hora de entrada</th>
                                    <th>Hora de salida</th>
                                </>
                        }
                    </tr>
                    {
                        tipo == 'deportistas'
                        ?   
                        datos.map( (element, index) => 
                        <tr key={index}>
                            <td>{element.expediente}</td>
                            <td>{element.nombre}</td>
                            <td>{element.apellidos}</td>
                            <td>{element.facultad}</td>
                            <td>{element.correo}</td>
                            <td>{element.telefono}</td>
                            <td>{element.telefonoEmergencia}</td>
                            <td>{element.noJugador}</td>
                            <td className="container-edits"> 
                                <img src={iconEdit} className='icons'/>
                                <img src={iconDelete} className='icons delete'/> 
                            </td>
                        </tr>
                    )
                        :
                            datos.map( (element, index) => 
                                <tr key={index}>
                                    <td>{element.nombre}</td>
                                    <td>{element.apellidos}</td>
                                    <td>{element.fecha}</td>
                                    <td>{element.horaEntrada}</td>
                                    <td>{element.horaSalida}</td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;