import React from "react";
import "./ListaJugadores.css";
import circleAdd from "../../Assets/icons/circleAdd.png";
import trash from "../../Assets/icons/trash.png";
import { useState, useEffect } from "react";

const ListaJugadores = ({ trigger, setTrigger, jugadores, setJugadores }) => {
    const [jugadoresEquipo, setJugadoresEquipo] = useState([]);

    useEffect(() => {
        if (jugadores?.length) {
            setJugadoresEquipo(jugadores);
        }
    }, []);

    const agregarJugador = (index) =>{
        setJugadoresEquipo(arr => [...arr, arrayDummy[index]]);
    }

    const quitarJugador = (index) => {
        setJugadoresEquipo(jugadoresEquipo.filter(jugador => jugador.num != arrayDummy[index].num)); //Cambiarlo por el expediente
    }

    const arrayDummy = [
        {
            'num': '1',
            'nombre': 'Daniel Aros Ramirez'
        },
        {
            'num': '2',
            'nombre': 'Alan Ronaldo'
        },
        {
            'num': '3',
            'nombre': 'Jorge Mbappe'
        },
        {
            'num': '4',
            'nombre': 'Sebastian Guttierez'
        },
        {
            'num': '5',
            'nombre': 'Jorge Bernal Gonzalitos'
        },
        {
            'num': '6',
            'nombre': 'Luis Vazquez'
        },
        {
            'num': '7',
            'nombre': 'Carlos Marcelo'
        },
        {
            'num': '8',
            'nombre': 'Cristiano Ronaldo'
        },
        {
            'num': '9',
            'nombre': 'Josue Ramirez'
        },
        {
            'num': '10',
            'nombre': 'Alan Alvarez'
        },
        {
            'num': '11',
            'nombre': 'Bruno Martinez'
        },
        {
            'num': '12',
            'nombre': 'Elias Gutierrez'
        },
        {
            'num': '13',
            'nombre': 'Marcos Hernandez'
        },
        {
            'num': '14',
            'nombre': 'Hernan Perez'
        },
        {
            'num': '15',
            'nombre': 'Diego Medina'
        },
        {
            'num': '16',
            'nombre': 'Jesus Eduardo'
        },
        {
            'num': '17',
            'nombre': 'Rafael Hernandez'
        },
        
    ]

    return trigger ? (
        <div className="containerListaJugadores">
            <div className="listaJugadores">
                <h3>Lista de jugadores:</h3>
                <div className="containerTableListaJugadores">
                    <table id="tableJugadoresEquipo" className="tableListaJugadoresEquipo">
                        <tbody>
                            <tr className="rowJugadoresEquipoHeader">
                                <th className="headerTables">#</th>
                                <th className="headerTables headerNombreCompleto">Nombre completo</th>
                                <th className="headerAcciones"></th>
                            </tr>
                            {
                                arrayDummy.map((element, index) => (
                                    <tr
                                        key={element.num}
                                        className={`rowJugadorEquipo ${
                                            jugadoresEquipo.findIndex(jugador => jugador.num === element.num) > -1 ? 'colorearFila' : ''}`
                                        }
                                    >
                                        <td>{element.num}</td>
                                        <td className="headerNombreCompleto">{element.nombre}</td>
                                        <td>
                                            <div className="containerIconsAcciones">
                                                <div
                                                    className={`containerAccionAgregar ${
                                                        jugadoresEquipo.findIndex(jugador => jugador.num === element.num) > -1 ? 'deshabilitarBtn' : ''}`
                                                    }
                                                    onClick={() => agregarJugador(index)}>
                                                    <img className="iconsAcciones" src={circleAdd}/>
                                                    <p>Añadir</p>
                                                </div>
                                            <img
                                                className={`iconsAcciones ${
                                                    jugadoresEquipo.findIndex(jugador => jugador.num === element.num) > -1 ? '' : 'deshabilitarBtn'}`
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