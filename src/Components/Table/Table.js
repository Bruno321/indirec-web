import React from "react";
import "./Table.css";

import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";
import iconMoreInfo from "../../Assets/icons/more-info.png";

import MoreInfo from "../MoreInfo/MoreInfo.js"

import moment from "moment/moment";
import { useState } from "react";
moment.locale('es');
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

    //State para mostrar MAS INFORMACION de un deportista
    const [buttonMoreInfo, setButtonMoreInfo] = useState(false);

    return (
        <div className="container">
            {
                tipo == 'deportistas'
                ?
                    <h3>Deportistas</h3>
                :
                    <h3>Asistencias</h3>
            }
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
                                    <th>Tel. Emergencias</th>
                                    <th>No. Jugador</th>
                                    <th>Opciones</th>
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
                    {datos.length===0  
                    ? 
                    <div>No hay datos para mostrar</div>
                    :
                    <>
                        {
                        tipo == 'deportistas'
                        ?   
                        datos.map( (element, index) => 
                        <tr key={index}>
                            <td className = "td-font-weight">{element.expediente}</td>
                            <td className = "td-font-weight">{element.nombres}</td>
                            <td className = "td-font-weight">{element.apellidos}</td>
                            <td className = "td-font-weight">{element.facultad}</td>
                            <td className = "td-font-weight">{element.correo}</td>
                            <td className = "td-font-weight">{element.telefono}</td>
                            <td className = "td-font-weight">{element.telefonoEmergencia}</td>
                            <td className = "td-font-weight">{element.numJugador}</td>
                            <td className="container-edits"> 
                                <img title="Editar" src={iconEdit} className='icons edit'/>
                                <img title="Eliminar" src={iconDelete} className='icons delete'/>
                                <img title="Más información" src={iconMoreInfo} className='icons moreinfo' onClick={()=> setButtonMoreInfo(true)}/>
                            </td>
                        </tr>
                    )
                        :
                            // datos.map( (element, index) => 
                            //     <tr key={index}>
                            //         <td>{element.nombre}</td>
                            //         <td>{element.apellidos}</td>
                            //         <td>{moment(element.fecha).format("dddd, MMMM D, YYYY")}</td>
                            //         <td>{moment(element.horaEntrada).format("h:mm a")}</td>
                            //         <td>{moment(element.horaSalida).format("h:mm a")}</td>
                            //     </tr>
                            // )
                            datos.map( (element, index) => {
                                return (
                                    <>
                                    <tr key={index} >
                                        <td>{element.deportistum ? element.deportistum.nombres : null}</td>
                                        <td>{element.deportistum ? element.deportistum.apellidos : null}</td>
                                        <td>{moment(element.fecha).format("dddd, MMMM D, YYYY")}</td>
                                        <td>{moment(element.horaEntrada).format("h:mm a")}</td>
                                        <td>{moment(element.horaSalida).format("h:mm a")}</td>
                                    </tr>
                                    </>
                                )
                            }
                            )
                    }
                    </>
                    }
                    
                </tbody>
            </table>
            <MoreInfo trigger={buttonMoreInfo} setTrigger={setButtonMoreInfo}></MoreInfo>
        </div>
    )
}

export default Table;