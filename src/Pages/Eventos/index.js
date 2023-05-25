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

export const EventosScreen = () =>{
    const {setItemId, setScreen} = useContext(NavigationContext)
    const [eventos, loading, change] = useFetchData('eventos');
    const [pagina, setPagina] = useState(0);

    useEffect(() => {
        change('', pagina * 10, 10);
    }, [pagina]);

    const columns =[
        {
            title: 'Partido',
            dataIndex:'nombre',
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
            title: 'Jornada',
            dataIndex:'jornada',
        },
        {
            title: 'Puntaje local',
            dataIndex:'puntosLocal',
            render: points => points || "Sin Registrar Resultados"
        },
        {
            title: 'Puntaje visitante',
            dataIndex:'puntosVisitante',
            render: points => points || "Sin Registrar Resultados"
        },
        {
            title: 'Acciones',
            dataIndex:'id',
            render: (sId) => (
                <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}>
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
                        title="Registrar resultados"
                        src={iconEdit}
                        className="icons edit"
                        onClick={()=>{
                            setItemId(sId);
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
                </div>
            ),
        }
    ];

    return(
        <>
            <h3>Eventos</h3>
            <Table
                columns={columns}
                dataSource={eventos.data}
                loading={loading}
            />
            {
                !loading ? (
                    <div className="container-pages">
                        <ButtonsPages numberPage={pagina} setPagina={setPagina} total={eventos.total}/>
                    </div>
                ) : (
                <LoadingSpinner/>
                )
            }
        </>
    )
}