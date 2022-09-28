import React,{useContext,useEffect,useState} from "react";
import QRScanner from '../../Components/QRScanner/QRScanner'
import Table from "../../Components/Table/Table";
import { NavigationContext } from "../../Context/NavigationContext";
import axios from "axios";

const MainPageRenderManager = () => {

    let datos = [
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

    let datos1 = [
        {
            nombre: 'Daniel',
            apellidos: 'Aros Ramirez',
            fecha: '21/09/2022',
            horaEntrada: '10:48',
            horaSalida: '13:52'
        },
    ]
    const {screen} = useContext(NavigationContext)

    const handleRender = () => {
        if(screen===0){
            return (
                <Table datos={datos} tipo={'deportistas'}/>
            )
        }
        if(screen===1){
            return (
                <Table datos={datos1} tipo={'asistencias'}/>

            )
        }
        if(screen===2){
            return (
                <QRScanner />
            )
        }
    }

    // Los fetch ocurren cada que screen se actualiza (depende el valor de screen es a que ruta se hara)
    useEffect(()=>{

    },[screen])
    return (
        <>
            {handleRender()}
        </>
    )
}

export default MainPageRenderManager