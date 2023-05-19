import React from "react";
import "./ListaJugadores.css";
import { useState, useEffect } from "react";
import TableListadoJugadores from "../TableListadoJugadores/TableListadoJugadores";

/**
 * 
 * @params trigger y setTrigger -> parametros que reciben un booleano para saber si se muestra o no el modal con la tabla de jugadores.
 * @params jugadores y setJugadores -> arreglo que contiene los jugadores que han sido añadidos a la lista.
 * @params deportistas -> parametro que contiene un arreglo de todos los deportistas que se renderizaran y mostraran en la tabla.
 * @params mostrarListaCompleta -> booleano que permite saber si se mostraran todos los deportistas, en caso de ser false, solo renderizara los deportistas que no estan asociados con un equipoId
 * @params limpiar -> parametro que permite restablecer el arreglo de jugadores a un arreglo vacio. (aplica solo para registrar eventos)
 */

const ListaJugadores = ({ trigger, setTrigger, jugadores, setJugadores, deportistas, mostrarListaCompleta, limpiar}) => {

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
                    <TableListadoJugadores 
                        jugadoresEquipo={jugadoresEquipo} 
                        jugadores={jugadores} 
                        setJugadoresEquipo={setJugadoresEquipo} 
                        deportistas={deportistas} 
                        mostrarListaCompleta={mostrarListaCompleta}
                        limpiar={limpiar}
                    />
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