import React, {useState, useContext} from "react";
import { NavigationContext } from "../../Context/NavigationContext";
import { useFetchData } from "../../Hooks/Fetch.hook";
import Swal from 'sweetalert2/dist/sweetalert2.js';

import './RegistrarResultados.css';

function RegistrarResultados(){
    const {itemId, setScreen} = useContext(NavigationContext)
    const [equipos] = useFetchData('equipos');
    const [eventos] = useFetchData(`eventos/${itemId}`);

    let equipoLocalObtenido
    let equipoVisitObtenido

    for(let i = 0; i < equipos.length; i++){
        if(eventos.equipoLocal == equipos[i].equipoId){
            equipoLocalObtenido=equipos[i].nombre;
        }
        if(eventos.equipoVisitante == equipos[i].equipoId){
            equipoVisitObtenido=equipos[i].nombre;
        }
    }
    
    return(
        <>
        <div className="registrar-resultados-container">
            <h3>Registrar resultados</h3>
            <h3>Evento: {eventos.nombreEvento}</h3>
                <div className="upper-registrar-resultados">
                    <div>
                        <p>Puntaje del equipo {equipoLocalObtenido}:</p>
                        <input type="text" placeholder="0"/>
                    </div>
                    <div>
                        <p>Puntaje del equipo {equipoVisitObtenido}:</p>
                        <input type="text" placeholder="0"/>
                    </div>
                </div>
                <div className="incidents">
                    <p>¿Sucedieron incidentes?</p>
                    <textarea className="incidents-textarea" type="text"></textarea>
                </div>
                <div className="buttons-registrar-resultados">
                    <button className="cancelar" onClick={()=>{setScreen(8)}}>Cancelar</button>
                    <button className="guardar" onClick={()=>{Swal.fire({
                        title: 'ATENCIÓN',
                        text: "¿Desea guardar los resultados al evento " + eventos.nombreEvento + " ?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Cancelar',
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                        Swal.fire(
                            'Resultados de evento registrados',
                            "Ha registrado los resultados para el evento "+ eventos.nombreEvento,
                            'success'
                        )
                        }
                    })}
                    }>Guardar</button>
                </div>
            </div>
        </>
    )
}

export default RegistrarResultados