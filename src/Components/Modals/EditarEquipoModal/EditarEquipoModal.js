import React, { useState, useEffect } from "react";
import { aFacultities, aCampus } from "../../../Utils/constants";
import TableJugadoresEquipo from "../../TableListaJugadoresEquipo/TableJugadoresEquipo";
import TableListadoJugadores from "../../TableListadoJugadores/TableListadoJugadores";
import { UPDATE, process } from '../../../Service/Api';
import Swal from 'sweetalert2';
import "./EditarEquipoModal.css";

const oInitialState ={ 
  nombre: '',
  facultad: '',
  campus: '',
  deporte: '',
  categoria: null,
  nombreEntrenador: '',
  apellidoEntrenador: '',
  nombreAsistente: '',
  apellidoAsistente: '',
  jugadores: []
};

function EditarEquipoModal({ equipo, visible, setVisible, updater }) {
  const [mostrarListaJugadores, setMostrarListaJugadores] = useState(false);
  const [jugadoresEquipo, setJugadoresEquipo] = useState([]);
  const [form, setForm] = useState(oInitialState);
  const categoria = [0, 1];

  useEffect(() => {
    if (equipo) {
      setForm(equipo);
      setJugadoresEquipo(equipo.jugadores);
    }
  }, [equipo]);

  const handleSubmit = async () => {
    let oSend = {
      ...form,
      jugadores: jugadoresEquipo.map(j => j.deportistaId),
    };

    const response = await process(UPDATE, 'equipos', oSend, { id: oSend.equipoId }).catch(e => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal, intenta mas tarde',
      })
      // console.log(e);
    });

    if (response?.data?.ok) {
      setVisible(false);
      Swal.fire({
        icon: 'success',
        title: 'Se actualizó el equipo correctamente',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        updater();
      });
    }
  };  

  return visible ? (
    <div className="modalBackgroundBlur modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setVisible(false)}>X</button>
        </div>
        <div className="modalUpdateContainer">
          <div className="formEditInformationTeam">
            <div className="modalTitle">
              <h1 className="title">Editar Equipo</h1>
            </div>
            <div className="formContainer">
              <div className="formContainerLeft">
                <label className="labels" htmlFor="nombre">
                  Nombre del Equipo:
                </label>
                <input
                  className="input inputText"
                  type="text"
                  name="nombre"
                  id="nombre"
                  maxLength={80}
                  value={form.nombre}
                  onChange={e => setForm({ ...form, nombre: e.target.value })}
                  required
                />
                <br />
                <label className="labels" htmlFor="facultad">Facultad:</label>
                <select
                  className="input inputSelect"
                  id="facultad"
                  value={form.facultad}
                  onChange={e =>  setForm({ ...form, facultad: e.target.value })}
                >
                  {
                    aFacultities.map(c => (
                      <option value={`Facultad de ${c}`}>Facultad de {c}</option>
                    )
                    )
                  }
                </select>
                <br />
                <label className="labels" htmlFor="nombreEntrenador">Nombre del Entrenador:</label>
                <input
                  className="input inputText"
                  type="text"
                  name="nombreEntrenador"
                  id="nombreEntrenador"
                  maxLength={100}
                  value={form.nombreEntrenador}
                  onChange={e => setForm({ ...form, nombreEntrenador: e.target.value })}
                  required
                />
                <br />
                <label htmlFor="nombreAsistente" className="labels">Nombre del Asistente:</label>
                <input
                  className="input inputText"
                  type="text"
                  name="nombreAsistente"
                  id="nombreAsistente"
                  maxLength={100}
                  value={form.nombreAsistente}
                  onChange={e => setForm({ ...form, nombreAsistente: e.target.value })}
                  required
                />
                <br />
              </div>

              <div className="formContainerRight">
                <label htmlFor="campus" className="labels">Campus:</label>
                <select
                  className="inputSelect input"
                  id="campus"
                  value={form.campus}
                  onChange={e => setForm({ ...form, campus: e.target.value })}
                > 
                  {
                    aCampus.map(c => (
                        <option value={`${c}`}>{c}</option> 
                    ))
                  }
                </select>
                <br />
                <label htmlFor="categoria" className="labels">Categoría:</label>
                <select
                  id="categoria"
                  className="input inputSelect"
                  value={form.categoria}
                  onChange={e => setForm({ ...form, categoria: e.target.value })}
                >
                  {
                    categoria.map(c => (
                      <option value={c}>{form.categoria ? 'Femenil' : 'Varonil'}</option>
                    ))
                  }
                </select>
                <br />
                <label htmlFor="apellidoEntrenador" className="labels">Apellido del Entrenador:</label>
                <input
                  className="input inputText"
                  type="text"
                  name="apellidoEntrenador"
                  id="apellidoEntrenador"
                  maxLength={100}
                  value={form.apellidoEntrenador}
                  onChange={e => setForm({ ...form, apellidoEntrenador: e.target.value })}
                  required
                />
                <br />
                <label htmlFor="apellidoAsistente" className="labels">Apellido del Asistente:</label>
                <input
                  className="input inputText"
                  type="text"
                  name="apellidoAsistente "
                  id="apellidoAsistente"
                  maxLength={100}
                  value={form.apellidoAsistente}
                  onChange={e => setForm({ ...form, apellidoAsistente: e.target.value })}
                  required
                />
                <br />
              </div>
            </div>
            <div className="btnContainer">
              <div className="centerBtnContainer">
                <button onClick={handleSubmit}>Guardar</button>
                <button className="cancelBtn" onClick={() => setVisible(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
          <div className="teamTable">
            <div className="containerTableJugadoresEquipo">
              {
                mostrarListaJugadores 
                ?
                  <TableListadoJugadores 
                    jugadores={jugadoresEquipo} 
                    setJugadoresEquipo={setJugadoresEquipo}
                  />
                :
                  <TableJugadoresEquipo listaJugadores={jugadoresEquipo}/>
              }

            </div>  
            {
                mostrarListaJugadores 
                ?
                  <button className="addMemberBtn" onClick={() => setMostrarListaJugadores(false)}>Guardar</button>
                :
                  <button className="addMemberBtn" onClick={() => setMostrarListaJugadores(true)}>Añadir Miembro</button>
            }
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
export default EditarEquipoModal;