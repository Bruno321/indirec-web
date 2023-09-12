import React, { useState, useContext, useEffect, useCallback } from "react";
import { NavigationContext } from "../../../Context/NavigationContext";
import { useFetchData } from "../../../Hooks/Fetch.hook";
import { UPDATE, process, GET } from "../../../Service/Api"; 
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Swal from 'sweetalert2/dist/sweetalert2.js';

import './RegistrarResultadosEvento.css';

const oInitialState = {
    puntosLocal: '',
    puntosVisitante: '',
    incidentes: ''
}

function RegistrarResultadosEvento({ datos, trigger, setTrigger, update }) {    
    console.log(datos)
    //state para el update
    const [form, setForm] = useState(oInitialState);

    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        if(datos == undefined) return;
        setForm(datos)
    }, [datos])

    //Funcion para hendlesubmit
    const handleSubmit = async (e) => {
        setShowSpinner(true);
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
                setTrigger(false);
                update();
            });
        }
        setShowSpinner(false);
    }

    return trigger ? (
        <div className="more-info">
            <div className="more-info-inner">
            <div className="registrar-resultados-container">
                <div className="container-headers">
                    <h3>Registrar resultados</h3>   
                    <h3>{datos.nombre}</h3> 
                </div>
                
                <div className="upper-registrar-resultados">
                    <div>
                        <p>Puntaje del equipo {datos?.EquipoLocal?.nombre}:</p>
                        <input
                            type="number"
                            min="0"
                            placeholder="0"
                            id="puntosLocal"
                            name="puntosLocal"
                            onChange={e => setForm({ ...form, puntosLocal: e.target.value })}
                        />
                    </div>
                    <div>
                        <p>Puntaje del equipo {datos?.EquipoVisitante?.nombre}:</p>
                        <input
                            type="number"
                            min="0"
                            placeholder="0"
                            id="puntosVisitante"
                            name="puntosVisitante"
                            onChange={e => setForm({ ...form, puntosVisitante: e.target.value })}
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
                        placeholder="Registre los incidentes"
                        onChange={e => setForm({ ...form, incidentes: e.target.value })}
                    />
                </div>
                <div className="buttons-registrar-resultados">
                    <button className="cancelar" onClick={() => { setTrigger(false) }}>Cancelar</button>
                    <button className="guardar" onClick={
                        () =>
                            Swal.fire({
                                title: "ATENCIÓN",
                                text: "NO se podrán realizar cambios después",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                cancelButtonText: "Cancelar",
                                confirmButtonText: "Confirmar",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handleSubmit()
                                }
                            })
                    }>
                        {
                            showSpinner ? <LoadingSpinner login={true}/> : "Guardar"
                        }
                    </button>
                </div>
            </div>
            </div>
        </div>
    ) : "";
}

export default RegistrarResultadosEvento