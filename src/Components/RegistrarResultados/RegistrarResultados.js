import React, {useState, useContext, useEffect} from "react";
import { NavigationContext } from "../../Context/NavigationContext";
import { useFetchData } from "../../Hooks/Fetch.hook";
import { UPDATE, process } from "../../Service/Api";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import './RegistrarResultados.css';

const oInitialState = {
    nombreEvento:'',
    fechaEvento:'',
    horaEvento:'',
    equipoLocal:'',
    directorTecnicoLocal:'',
    puntosLocal:'',
    canchaJugada:'',
    equipoVisitante:'',
    directorTecnicoVisitante:'',
    puntosVisitante:'',
    jornada:'',
    incidentes:''
}

function RegistrarResultados(){
    //Context de navigation
    const {itemId, setScreen} = useContext(NavigationContext)
    //fetches
    const [evento, loading] = useFetchData(`eventos/${itemId}`);
    //state para el update
    const [form, setForm] = useState(oInitialState);

    useEffect(()=>{
        if(evento) {
            setForm(evento);
        }
    }, [evento]);

    //Funcion para hendlesubmit
    const handleSubmit = async (e) =>{
        const { puntosLocal, puntosVisitante, incidentes } = form;

        const response = await process(UPDATE, 'eventos', {
            puntosLocal: puntosLocal || 0,
            puntosVisitante: puntosVisitante || 0,
            incidentes: incidentes || '',
        }, { id: form.id }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal, intenta mas tarde',
            })
            console.log(e);
        });

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Se registraron los resultados',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                setScreen(8)
            });
        }
    }
    
    return loading ? (
        <LoadingSpinner />
    ) : (
        <>
        <div className="registrar-resultados-container">
            <h3>Registrar resultados</h3>
            <h3>Evento: {evento.nombre}</h3>
                <div className="upper-registrar-resultados">
                    <div>
                        <p>Puntaje del equipo {evento?.EquipoLocal?.nombre}:</p>
                        <input
                            type="number"
                            min="0"
                            placeholder="0"
                            id="puntosLocal"
                            name="puntosLocal"
                            defaultValue="0"
                            onChange={e => setForm({ ...form, puntosLocal:e.target.value})}
                        />
                    </div>
                    <div>
                        <p>Puntaje del equipo {evento?.EquipoVisitante?.nombre}:</p>
                        <input
                            type="number"
                            min="0"
                            placeholder="0"
                            id="puntosVisitante"
                            name="puntosVisitante"
                            defaultValue="0"
                            onChange={e => setForm({ ...form, puntosVisitante:e.target.value})}
                        />
                    </div>
                </div>
                <div className="incidents">
                    <p>¿Sucedieron incidentes?</p>
                    <textarea
                        value={form.incidentes || ''}
                        className="incidents-textarea"
                        type="text"
                        id="incidentes"
                        name="incidentes"
                        onChange={e => setForm({ ...form, incidentes:e.target.value})}
                    />
                </div>
                <div className="buttons-registrar-resultados">
                    <button className="cancelar" onClick={()=>{setScreen(8)}}>Cancelar</button>
                    <button className="guardar" onClick={
                        ()=>
                        Swal.fire({
                            title: "ATENCIÓN",
                            text:"NO podrás realizar cambios después",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            cancelButtonText: "Cancelar",
                            confirmButtonText: "Confirmar",
                        }).then((result) => {
                            if(result.isConfirmed){
                                handleSubmit()
                            }
                        })
                        }>Guardar</button>
                </div>
            </div>
        </>
    )
}

export default RegistrarResultados