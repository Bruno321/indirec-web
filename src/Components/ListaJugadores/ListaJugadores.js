import React from "react";
import "./ListaJugadores.css";
import circleAdd from "../../Assets/icons/circleAdd.png";
import trash from "../../Assets/icons/trash.png";
import { useState, useEffect } from "react";

const ListaJugadores = (props) => {

    const [jugadoresEquipo, setJugadoresEquipo] = useState(props.jugadores);

    const agregarJugador = (index) =>{
        // console.log(index);
        setJugadoresEquipo(arr => [...arr, arrayDummy[index]]);
        let row = document.getElementById('tableJugadoresEquipo').rows.item(index+1);
        let btnAgregar = row.cells[2].firstElementChild.children[0];
        let btnBorrar = row.cells[2].firstElementChild.children[1];
        btnBorrar.classList.remove('deshabilitarBtn');
        btnAgregar.classList.add('deshabilitarBtn');
        row.classList.add("colorearFila");
        // row.classList.remove("descolorearFila");
    }

    const quitarJugador = (index) => {
        // console.log(index);
        let row = document.getElementById('tableJugadoresEquipo').rows.item(index+1);
        setJugadoresEquipo(jugadoresEquipo.filter(jugador => jugador.num != arrayDummy[index].num)); //Cambiarlo por el expediente
        let btnAgregar = row.cells[2].firstElementChild.children[0];
        let btnBorrar = row.cells[2].firstElementChild.children[1];
        btnAgregar.classList.remove('deshabilitarBtn');
        btnBorrar.classList.add('deshabilitarBtn');
        // row.classList.add("descolorearFila");
        row.classList.remove("colorearFila");
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

    return (props.trigger) ? (
        <div className="containerListaJugadores">
            {
                // console.log(jugadoresEquipo)
            }
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
                                // arrayDummy.map((element, index) => (jugadoresEquipo.indexOf(element.nombre) =! -1) ? (
                                //     <tr className="rowJugadorEquipo colorearFila">
                                //         <td>{element.num}</td>
                                //         <td className="headerNombreCompleto">{element.nombre}</td>
                                //         <td>
                                //             <div className="containerIconsAcciones">
                                //                 <div className="containerAccionAgregar deshabilitarBtn" onClick={() => agregarJugador(index)}>
                                //                     <img className="iconsAcciones" src={circleAdd}/>
                                //                     <p>Añadir</p>
                                //                 </div>
                                //                 <img className="iconsAcciones" src={trash} onClick={() => quitarJugador(index)}/>
                                //             </div>
                                //         </td>
                                //     </tr>
                                //     )
                                // :
                                //     (
                                //         <tr className="rowJugadorEquipo">
                                //             <td>{element.num}</td>
                                //             <td className="headerNombreCompleto">{element.nombre}</td>
                                //             <td>
                                //                 <div className="containerIconsAcciones">
                                //                     <div className="containerAccionAgregar" onClick={() => agregarJugador(index)}>
                                //                         <img className="iconsAcciones" src={circleAdd}/>
                                //                         <p>Añadir</p>
                                //                     </div>
                                //                     <img className="iconsAcciones deshabilitarBtn" src={trash} onClick={() => quitarJugador(index)}/>
                                //                 </div>
                                //             </td>
                                //         </tr>
                                //     )
                                // )
                                arrayDummy.map((element, index) => {
                                    // console.log(jugadoresEquipo.indexOf(arrayDummy[index]) != -1)
                                    // if(jugadoresEquipo.length != 0){
                                        if(jugadoresEquipo.indexOf(arrayDummy[index]) != -1){
                                            return (<tr key={element} className="rowJugadorEquipo colorearFila">
                                                    <td>{element.num}</td>
                                                    <td className="headerNombreCompleto">{element.nombre}</td>
                                                    <td>
                                                        <div className="containerIconsAcciones">
                                                            <div className="containerAccionAgregar deshabilitarBtn" onClick={() => agregarJugador(index)}>
                                                                <img className="iconsAcciones" src={circleAdd}/>
                                                                <p>Añadir</p>
                                                            </div>
                                                        <img className="iconsAcciones" src={trash} onClick={() => quitarJugador(index)}/>
                                                    </div>
                                                </td>
                                            </tr>)
                                        }else{
                                            return (<tr key={element.num} className="rowJugadorEquipo">
                                                 <td>{element.num}</td>
                                                 <td className="headerNombreCompleto">{element.nombre}</td>
                                                 <td>
                                                     <div className="containerIconsAcciones">
                                                         <div className="containerAccionAgregar" onClick={() => agregarJugador(index)}>
                                                             <img className="iconsAcciones" src={circleAdd}/>
                                                             <p>Añadir</p>
                                                         </div>
                                                        <img className="iconsAcciones deshabilitarBtn" src={trash} onClick={() => quitarJugador(index)}/>
                                                    </div>
                                                </td>
                                            </tr>)
                                        }
                                    // }
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="containerBtnListaJugadores">
                    <button className="btnListaJugadores" onClick={() => {props.setTrigger(false); props.setJugadores(jugadoresEquipo)}}>Guardar lista de jugadores</button>
                </div>
            </div>
        </div>
    ) :
    ""
}

export default ListaJugadores;