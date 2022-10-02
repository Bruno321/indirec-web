import React,{useContext,useEffect,useState} from "react";
import QRScanner from '../../Components/QRScanner/QRScanner'
import Table from "../../Components/Table/Table";
import { NavigationContext } from "../../Context/NavigationContext";
import axios from "axios";
import RegistrarDeportista from "../../Components/RegistrarDeportista/RegistrarDeportista";
// let datos = [
//     {
//         expediente: '290246',
//         nombre: 'Daniel',
//         apellidos: 'Aros Ramirez',
//         facultad: 'informatica',
//         correo: 'danielaros200@gmail.com',
//         telefono: '4681121267',
//         telefonoEmergencia: '6881583',
//         noJugador: '2'
//     },
// ]

// let datos1 = [
//     {
//         nombre: 'Daniel',
//         apellidos: 'Aros Ramirez',
//         fecha: '21/09/2022',
//         horaEntrada: '10:48',
//         horaSalida: '13:52'
//     },
// ]

const MainPageRenderManager = () => {

    const {screen} = useContext(NavigationContext)
    const [data, setData] = useState([])
    const token = localStorage.getItem('token')
    const handleRender = () => {
        if(screen===0){
            return (
                <Table datos={data} tipo={'deportistas'}/>
            )
        }
        if(screen===1){
            return (
                <Table datos={data} tipo={'asistencias'}/>

            )
        }
        if(screen===2){
            return (
                <RegistrarDeportista />
            )
        }
        if(screen===3){
            return (
                <QRScanner />
            )
        }
    }

    // Los fetch ocurren cada que screen se actualiza (depende el valor de screen es a que ruta se hara)
    useEffect(()=>{
        setData([])
        if(screen===0){
            axios.get('http://localhost:3000/api/deportistas',{headers:{"Access-Control-Allow-Origin":null,'Authorization': `Bearer ${token}`}, mode: 'cors'})
            .then((response)=>{
                setData(response.data.data)
            })
            .catch((e)=>{
                console.log(e)
            })
        }
        if(screen===1){
            axios.get('http://localhost:3000/api/deportistas/asistencias',{headers:{"Access-Control-Allow-Origin":null,'Authorization': `Bearer ${token}`}, mode: 'cors'})
            .then((response)=>{
                setData(response.data.data)
            })
            .catch((e)=>{
                console.log(e)
            })
        }


    },[screen])
    return (
        <>
            {handleRender()}
        </>
    )
}

export default MainPageRenderManager