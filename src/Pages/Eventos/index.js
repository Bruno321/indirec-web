import React from "react";
import SearchIcon from "../../Assets/icons/search.png";

import "./index.css"
import { Table } from "../../Components/Table/Table";

export const EventosScreen = () =>{

    const columns =[
        {
            title: 'Partido',
            dataIndex:'',
        },
        {
            title: 'D. T. Local',
            dataIndex:'',
        },
        {
            title: 'D. T. Visitante',
            dataIndex:'',
        },
        {
            title: 'Fecha y Hora',
            dataIndex:'',
        },
        {
            title: 'Cancha',
            dataIndex:'',
        },
        {
            title: 'Jornada',
            dataIndex:'',
        },
        {
            title: 'Puntaje local',
            dataIndex:'',
        },
        {
            title: 'Puntaje visitante',
            dataIndex:'',
        },
        {
            title: 'Acciones',
            dataIndex:'',
        },
    ]

    return(
        <>
            <h3>Eventos</h3>
            <p>Buscar por nombre de evento</p>
            <input type="text" className="inputEventos"></input>
            <div className="SearchImg"></div>
            <br></br><button className="buttonEventos">Crear evento</button>
            <Table
                columns={columns}
                // dataSource={}
                // loading={}
            />
        </>
    )
}