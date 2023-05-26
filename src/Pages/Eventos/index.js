import React, { useEffect, useState, useContext } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import moment from "moment";

import iconInfo from "../../Assets/icons/more-info.png";
import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";
import "./index.css"

import { NavigationContext } from "../../Context/NavigationContext.js";

import { Table } from "../../Components/Table/Table";
import { useFetchData } from "../../Hooks/Fetch.hook";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import ButtonsPages from "../../Components/ButtonsPages/ButtonsPages";
import { useDidMountEffect } from "../../Utils/DidMountEffect";

export const EventosScreen = () =>{
    const {setItemId, setScreen} = useContext(NavigationContext)
    const [eventos, loading, change] = useFetchData('eventos');

    const columns =[
        {
            title: 'Partido',
            dataIndex:'nombre',
        },
        {
            title: 'Jornada',
            dataIndex:'jornada',
        },
        {
            title: 'Fecha',
            dataIndex:'fecha',
            render: (fE) => (fE ? moment(fE).format("DD/MM/YYYY") : "Sin registrar"),
        },
        {
            title: 'Hora',
            dataIndex:'hora',
        },
        {
            title: 'Cancha',
            dataIndex:'canchaJugada',
        },
        {
            title: 'Puntaje local',
            dataIndex:'puntosLocal',
            render: points => points || <i style={{opacity:"0.5"}}>Sin Registrar</i>
        },
        {
            title: 'Puntaje visitante',
            dataIndex:'puntosVisitante',
            render: points => points || <i style={{opacity:"0.5"}}>Sin Registrar</i>
        },
        {
            title: 'Acciones',
            dataIndex:'id',
            render: (sId, row) => (
                <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}>
                    {row.createdAt===row.updatedAt ? <img 
                        title="Registrar resultados"
                        src={iconEdit}
                        className="icons edit"
                        onClick={()=>{
                            setItemId(sId);
                            setScreen(9);
                        }}
                    />:<></>}
                    <img 
                        title="Ver más..."
                        src={iconInfo}
                        className="icons moreinfo"
                        onClick={()=>{
                            setItemId(sId);
                            setScreen(10);
                        }}
                    />
                    <img
                        title="Eliminar"
                        src={iconDelete}
                        className='icons delete'
                        onClick={() => {
                        setItemId(sId);
                        Swal.fire({
                            title: 'ELIMINAR',
                            text: "¿Eliminar el evento "+ row.nombre + " ?",
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
                                text: "¿Estas seguro de eliminar el evento "+ row.nombre + " ?",
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
                                    "El evento "+ row.nombre + " ha sido eliminado.",
                                    'success'
                                )
                                }
                            })
                            }
                        })
                        }}
                    />
                </div>
            ),
        }
    ];

    return(
        <>
            <h3>Eventos</h3>
            <Table
                columns={columns}
                dataSource={eventos}
                loading={loading}
                change={change}
            />
        </>
    )
}