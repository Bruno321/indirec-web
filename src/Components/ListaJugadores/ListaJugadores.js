import React from "react";
import "./ListaJugadores.css";
import circleAdd from "../../Assets/icons/circleAdd.png";
import trash from "../../Assets/icons/trash.png";
import { useState, useEffect } from "react";
import {useFetchData} from '../../Hooks/Fetch.hook';

const ListaJugadores = ({ trigger, setTrigger, jugadores, setJugadores }) => {
    const [jugadoresEquipo, setJugadoresEquipo] = useState([]);
    const [deportistas] = useFetchData('deportistas');
    // console.log(deportistas)

    useEffect(() => {
        if (jugadores?.length) {
            setJugadoresEquipo(jugadores);
        }
    }, []);

    const agregarJugador = (index) =>{
        setJugadoresEquipo(arr => [...arr, deportistas[index]]);
    }

    const quitarJugador = (index) => {
        setJugadoresEquipo(jugadoresEquipo.filter(jugador => jugador.deportistaId != deportistas[index].deportistaId)); //Cambiarlo por el expediente
    }

    const limpiarFilas = () => {
        setJugadoresEquipo([]);
    }

    return trigger ? (
        <div className="containerListaJugadores">
            <div className="listaJugadores">
                <div className="containerTituloTabla">
                    <h3>Lista de jugadores:</h3>
                    <div>
                        <button className="bntLimpiarFilas" onClick={() => limpiarFilas()}>Limpiar Filas</button>
                        <span className="btnCerrarModal" onClick={() => {setTrigger(false)}}>X</span>
                    </div>
                </div>
                <div className="containerTableListaJugadores">
                    <table id="tableJugadoresEquipo" className="tableListaJugadoresEquipo">
                        <tbody>
                            <tr className="rowJugadoresEquipoHeader">
                                <th className="headerTables">#</th>
                                <th className="headerTables headerNombreCompleto">Nombre completo</th>
                                <th className="headerAcciones"></th>
                            </tr>
                            {
                                deportistas.map((element, index) => (
                                    <tr
                                        key={element.deportistaId}
                                        className={`rowJugadorEquipo ${
                                            jugadoresEquipo.findIndex(jugador => jugador.deportistaId === element.deportistaId) > -1 ? 'colorearFila' : ''}`
                                        }
                                    >
                                        <td>{element.numJugador}</td>
                                        <td className="headerNombreCompleto">{element.nombres} {element.apellidos}</td>
                                        <td>
                                            <div className="containerIconsAcciones">
                                                <div
                                                    className={`containerAccionAgregar ${
                                                        jugadoresEquipo.findIndex(jugador => jugador.deportistaId === element.deportistaId) > -1 ? 'deshabilitarBtn' : ''}`
                                                    }
                                                    onClick={() => agregarJugador(index)}>
                                                    <img className="iconsAcciones" src={circleAdd}/>
                                                    <p>Añadir</p>
                                                </div>
                                            <img
                                                className={`iconsAcciones ${
                                                    jugadoresEquipo.findIndex(jugador => jugador.deportistaId === element.deportistaId) > -1 ? '' : 'deshabilitarBtn'}`
                                                }
                                                src={trash}
                                                onClick={() => quitarJugador(index)}/>
                                        </div>
                                    </td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="containerBtnListaJugadores">
                    <button
                        className="btnListaJugadores"
                        onClick={() => {
                            setTrigger(false);
                            setJugadores(jugadoresEquipo);
                        }}
                    >
                        Guardar lista de jugadores
                    </button>
                </div>
            </div>
        </div>
    ) :
    null;
};

export default ListaJugadores;