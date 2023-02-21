import React from "react";
import "./ListaJugadores.css";
import { useState, useEffect } from "react";
import {useFetchData} from '../../Hooks/Fetch.hook';
import TableListadoJugadores from "../TableListadoJugadores/TableListadoJugadores";

const ListaJugadores = ({ trigger, setTrigger, jugadores, setJugadores, deportistas, mostrarListaCompleta}) => {

    const [jugadoresEquipo, setJugadoresEquipo] = useState([]);//Arreglo que guarda los jugadores que perteneceran al equipo.

    useEffect(() => {
        if (jugadores?.length) {
            //Si el equipo ya tiene jugadores previamente registrados, los guarda en el estado de jugadoresEquipo. 
            setJugadoresEquipo(jugadores);
        }
    }, []);

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
                    <TableListadoJugadores jugadoresEquipo={jugadoresEquipo} jugadores={jugadores} setJugadoresEquipo={setJugadoresEquipo} deportistas={deportistas} mostrarListaCompleta={mostrarListaCompleta}/>
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