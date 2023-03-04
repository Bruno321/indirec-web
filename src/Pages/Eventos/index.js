import React, { useState, useContext } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';

import iconInfo from "../../Assets/icons/more-info.png";
import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";


import { NavigationContext } from "../../Context/NavigationContext.js";

import "./index.css"
import { Table } from "../../Components/Table/Table";
import { useFetchData } from "../../Hooks/Fetch.hook";
import MoreInfoEventos from "../../Components/MoreInfoEventos/MoreInfoEventos";

export const EventosScreen = () =>{
    const {setItemId,setScreen} = useContext(NavigationContext)
    //State para boton mas informacion
    const [buttonMoreInfo, setButtonMoreInfo] = useState(false);
    const [selected, setSelected] = useState();

    //State para los datos de Eventos
    const [eventos, loading] = useFetchData('eventos');

    const columns =[
        {
            title: 'Partido',
            dataIndex:'nombreEvento',
        },
        {
            title: 'D. T. Local',
            dataIndex:'directorTecnicoLocal',
        },
        {
            title: 'D. T. Visitante',
            dataIndex:'directorTecnicoVisitante',
        },
        {
            title: 'Fecha',
            dataIndex:'fechaEvento',
        },
        {
            title: 'Hora',
            dataIndex:'horaEvento',
        },
        {
            title: 'Cancha',
            dataIndex:'canchaJugada',
        },
        {
            title: 'Jornadas',
            dataIndex:'jornada',
        },
        {
            title: 'Puntaje local',
            dataIndex:'puntosLocal',
        },
        {
            title: 'Puntaje visitante',
            dataIndex:'puntosVisitante',
        },
        {
            title: 'Acciones',
            dataIndex:'eventoId',
            render: (sId, row, index) => (
                <>
                    <img 
                        title="Ver más..."
                        src={iconInfo}
                        className="icons moreinfo"
                        onClick={()=>{
                            setItemId(row.eventoId);
                            setScreen(10);
                        }}
                    />
                    <img 
                        title="Registrar resultados"
                        src={iconEdit}
                        className="icons edit"
                        onClick={()=>{
                            setItemId(row.eventoId);
                            setScreen(9);
                        }}
                    />
                    <img
                        title="Eliminar"
                        src={iconDelete}
                        className='icons delete'
                        onClick={() => {
                        setSelected(row);
                        Swal.fire({
                            title: 'ELIMINAR',
                            text: "¿Eliminar el evento "+ row.nombreEvento + " ?",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'Cancelar',
                            confirmButtonText: 'Confirmar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                            Swal.fire({
                                title: 'ATENCION',
                                text: "¿Estas seguro de eliminar el evento "+ row.nombreEvento + " ?",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                cancelButtonText: 'Cancelar',
                                confirmButtonText: 'Confirmar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                Swal.fire(
                                    'Eliminado satisfactoriamente',
                                    "El evento "+ row.nombreEvento + " ha sido eliminado.",
                                    'success'
                                )
                                }
                            })
                            }
                        })
                        }}
                    />
                </>
            ),
        }
    ];

    return(
        <>
            <h3>Eventos</h3>
            {/* <p>Buscar por nombre de evento</p>
            <input type="text" className="inputEventos"></input>
            <div className="SearchImg"></div> */}
            <Table
                columns={columns}
                dataSource={eventos}
                loading={loading}
            />
        </>
    )
}