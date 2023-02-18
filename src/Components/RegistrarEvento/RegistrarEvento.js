import React from "react";
import {useState, useEffect} from "react";
import "./RegistrarEvento.css";
import axios from "axios";
import { SAVE, FIND, process } from "../../Service/Api";
import Swal from "sweetalert2";


const oInitialState = {
  nombreEvento: "",
  fechaEvento: "",
  horaEvento: "",
  equipoLocal: 1,
  directorTecnicoLocal : "",
  puntosLocal : "",
  canchaJugada : "",
  equipoVisitante : "",
  directorTecnicoVisitante : "",
  puntosVisitante : "",
  jornada : "",
  incidentes : "",
  jugadores: [1,2]
}

export const RegistrarEvento = () => {
  const [data, setData] = useState([]);
  const [form,setForm] = useState(oInitialState);

  // useEffect(() => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const responseUploadData = await process(SAVE, 'eventos', form).catch(e =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal, intenta mas tarde',


      })
      console.log(e);
      });
      if(responseUploadData?.data?.ok){
        Swal.fire({
          icon: 'success',
          title: 'El registro fue exitoso',
          confirmButtonText: 'Aceptar'
      })
      }
    }
  // },[]);

  // Para el Select Option
  const [selectedOption, setSelectedOption] = useState("");
  const token = localStorage.getItem("token");



  useEffect(()=>{
    const fetchApi = async() => {
      const response = await process(FIND, 'equipos');
      setData(response.data.data);
    } 

    
  fetchApi();
  },[])
  return (
    <>
      <h1 className="title-form">REGISTRAR EVENTOS</h1>
      <section className="form-section">
        <form id = "registrarEventoForm" onSubmit={(e)=> handleSubmit(e)}>
          <div className="first-part">
            <div className="column-flex">
              <label className="input-title">Nombre del evento: </label>
              <br />
              <input type="text" className="input-text input-name"  id = "nombreEvento" name = "nombreEvento" placeholder="Troyanos vs Damansus" onChange={e => setForm({...form, nombreEvento:e.target.value})}/>
              <br />
            </div>
            <div className="column-flex">
              <label className="input-title">Fecha del evento: </label>
              <br />
              <input
                type="date"
                id="fechaEvento"
                name="fechaEvento"
                className="input-date input-date-event"
                placeholder="dd-mm-yyyy"
                onChange = {e => setForm({...form, fechaEvento: e.target.value})}
                required
              />
            </div>
            <br />
            <div className="column-flex">
              <label className="input-title">Hora del evento: </label>
              <br />
              <input
                type="time"
                id = "horaEvento"
                name = "horaEvento"
                className="input-time input-timeEvent"
                onChange ={e => setForm({...form, horaEvento: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="second-part">
            <div className="left-side">
              <label className="label-title">Equipo Local:</label>
              <br />
              <select className="input-text margin-input" name = "equipoLocal" id = "equipoLocal" value = {form.equipoLocal} onChange ={e => setForm({...form,equipoLocal:e.target.value})}>
                <option value="">Selecciona una opción...</option>
                {data.map(item => 
                <option key={item.equipoId} value={item.equipoId}>
                  {item.nombre}
                </option>
                  )}
              </select>
              <button className = "btn-add-players">Agregar Jugadores</button>
              <label className="label-title">Director Técnico Local:</label>
              <br />
              <input type="text" className="input-text margin-input" name = "directorTecnicoLocal" id = "directorTecnicoLocal" onChange = {e => setForm({...form, directorTecnicoLocal:e.target.value})}/>
              <label className="label-title">Puntos del Local:</label>
              <br />
              <input type="text" className="input-text margin-input" name = "puntosLocal" id = "puntosLocal" onChange = {e => setForm({...form, puntosLocal:e.target.value})}/>
              <label className="label-title">Cancha donde jugaron:</label>
              <br />
              <input type="text" className="input-text margin-input" name = "canchaDeJuego" id = "canchaDeJuego" onChange = {e =>setForm({...form, canchaJugada:e.target.value})}/>
            </div>
            <div className="middle-side versus-title">
              <h2 className="versus-title">VS</h2>
            </div>
            <div className="right-side">
              <label className="label-title">Equipo Visitante:</label>
              <select className="input-text margin-input-right" name = "equipoVisitante" id = "equipoVisitante" value = {form.equipoVisitante} onChange = {e => setForm({...form, equipoVisitante:e.target.value})}>
                <option value="">Selecciona una opción...</option>
                {data.map(item => 
                <option key={item.equipoId} value={item.equipoId}>
                  {item.nombre}
                </option>
                  )}
              </select>
              <br />
              <button className = "btn-add-players">Agregar Jugadores</button>
              <label className="label-title">Director Técnico Visitante:</label>
              <input type="text" className="input-text margin-input-right" name = "directorTecnicoVisitante" id = "directorTecnicoVisitante" onChange = {e => setForm({...form, directorTecnicoVisitante:e.target.value})}/>
              <br />
              <label className="label-title">Puntos del Visitante:</label>
              <input type="text" className="input-text margin-input-right" name = "puntosVisitante" id = "puntosVisitante" onChange = {e=>setForm({...form, puntosVisitante: e.target.value})}/>
              <br />
              <label className="label-title">Jornada:</label>
              <input type="text" className="input-text margin-input-right" name = "jornada" id = "jornada" onChange = {e => setForm({...form, jornada: e.target.value})}/>
              <br />
            </div>
          </div>
          <div className="third-part">
            <label className="input-title">¿Sucedieron incidentes?</label>
            <br />
            <textarea className="convert-to-textarea" name = "incidentes" id = "incidentes" onChange = {e=>setForm({...form, incidentes: e.target.value })} required />
            <div className="btn-section">
            <button type="submit" form="registrarEventoForm" className="btn-registrar-evento">Registrar Evento</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
