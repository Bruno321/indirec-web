import React from "react";
import "./ListaJugadores.css";
import { useState, useEffect } from "react";
import {useFetchData} from '../../Hooks/Fetch.hook';
import TableListadoJugadores from "../TableListadoJugadores/TableListadoJugadores";

const ListaJugadores = ({ trigger, setTrigger, jugadores, setJugadores }) => {
    const [jugadoresEquipo, setJugadoresEquipo] = useState([]);

    useEffect(() => {
        if (jugadores?.length) {
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
                    <TableListadoJugadores jugadoresEquipo={jugadoresEquipo} jugadores={jugadores} setJugadoresEquipo={setJugadoresEquipo}/>
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