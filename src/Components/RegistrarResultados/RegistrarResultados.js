import React, {useState, useContext, useEffect} from "react";
import { NavigationContext } from "../../Context/NavigationContext";
import { useFetchData } from "../../Hooks/Fetch.hook";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UPDATE, process } from "../../Service/Api";

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
    const [eventos] = useFetchData(`eventos/${itemId}`);
    const [equipos] = useFetchData("equipos/");
    //state para el update
    const [form, setForm] = useState(oInitialState);

    //Obtenemos nombres de equipo para el front
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

    useEffect(()=>{
        if(eventos){
            setForm(eventos)
        }
    }, [eventos])

    //Funcion para hendlesubmit
    const handleSubmit = async (e) =>{
        let oSend = {
            ...form,
        }
        const response = await process(UPDATE, 'eventos', oSend, { id: oSend.eventoId }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salio mal, intenta mas tarde',
            })
            console.log(e);
        });

        if (response?.data?.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Se registraron los resultados',
                confirmButtonText: 'Aceptar'
              }).then(() => {
                setScreen(8)
              });
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
                        <input type="number" min="0" placeholder="0" id="puntosLocal" name="puntosLocal" onChange={e => setForm({ ...form, puntosLocal:e.target.value})} />
                    </div>
                    <div>
                        <p>Puntaje del equipo {equipoVisitObtenido}:</p>
                        <input type="number" min="0" placeholder="0" id="puntosVisitante" name="puntosVisitante" onChange={e => setForm({ ...form, puntosVisitante:e.target.value})}/>
                    </div>
                </div>
                <div className="incidents">
                    <p>¿Sucedieron incidentes?</p>
                    <textarea className="incidents-textarea" type="text" id="incidentes" name="incidentes" onChange={e => setForm({ ...form, incidentes:e.target.value})}></textarea>
                </div>
                <div className="buttons-registrar-resultados">
                    <button className="cancelar" onClick={()=>{setScreen(8)}}>Cancelar</button>
                    <button className="guardar" onClick={handleSubmit}>Guardar</button>
                </div>
            </div>
        </>
    )
}

export default RegistrarResultados