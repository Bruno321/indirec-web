import React from "react";
import "./EditarEquipoModal.css";
import { aFacultities } from "../../../Utils/constants";
import TableJugadoresEquipo from "../../TableListaJugadoresEquipo/TableJugadoresEquipo";
import {useFetchData} from '../../../Hooks/Fetch.hook'

function EditarEquipoModal(props) {

  const {closeModal} = props;
  const [equipo] = useFetchData(`equipos/${props.idEquipo}`)

  console.log(equipo)
  
  const campus = ['Centro Universitario', 'Juriquilla', 'Aeropuerto', 'Ex-prepa Centro', 'Prepa Norte', 'Prepa Sur', 'Centro Historico'];
  const categoria = [0, 1];
  const facultades = ['Facultad de Bellas Artes','Facultad de Ciencias Naturales','Facultad de Ciencias Políticas y Sociales','Facultad de Derecho',
    'Facultad de Filosofía','Facultad de Informática','Facultad de Ingeniería','Facultad de Lenguas y Letras','Facultad de Medicina','Facultad de Psicología',
    'Facultad de Contaduría','Facultad de Química','Facultad de Enfermería','Escuela de Bachilleres'
  ]


  return (
    <div className="modalBackgroundBlur modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="modalUpdateContainer">
          <div className="formEditInformationTeam">
            <div className="modalTitle">
              <h1 className="title">Editar Equipo</h1>
            </div>
            <div className="formContainer">
              <div className="formContainerLeft">
                <p className="labels" htmlFor="">
                  Nombre del Equipo:
                </p>
                <input
                  className="input inputText"
                  type="text"
                  name="nombre"
                  id="nombre"
                  maxLength={80}
                  value={equipo.nombre}
                  required
                />
                <br />
                <p className="labels">Facultad:</p>
                <select className="input inputSelect" id="facultad">
                  {
                    facultades.map(c => c != equipo.facultad 
                      ? 
                        <option value={`${c}`}>{c}</option> 
                      : 
                        <option selected value={`${c}`}>{c}</option>
                    )
                  }
                </select>
                <br />
                <p className="labels">Nombre del Entrenador:</p>
                <input
                  className="input inputText"
                  type="text"
                  name="nombreEntrenador"
                  id="nombreEntrenador"
                  maxLength={100}
                  value={equipo.nombreEntrenador}
                  required
                />
                <br />
                <p className="labels">Nombre del Asistente:</p>
                <input
                  className="input inputText"
                  type="text"
                  name="nombreAsistente"
                  id="nombreAsistente"
                  maxLength={100}
                  value={equipo.nombreAsistente}
                  required
                />
                <br />
              </div>

              <div className="formContainerRight">
                <p className="labels">Campus:</p>
                <select
                  className="inputSelect input"
                  id="campus"
                  onChange={(e) => setForm({ ...form, campus: e.target.value })}
                > 
                  {
                    campus.map(c => c != equipo.campus 
                      ? 
                        <option value={`${c}`}>{c}</option> 
                      : <option selected value={`${c}`}>{c}</option>
                    )
                  }
                </select>
                <br />
                <p className="labels">Categoría:</p>
                <select id="categoria" className="input inputSelect">
                  {/* <option value={0}>Femenil</option>
                  <option value={1}>Varonil</option> */}
                  {
                    categoria.map(c => equipo.categoria == c 
                      ? 
                        <option selected value={equipo.categoria}>{equipo.categoria == 0 ? 'Varonil' : 'Femenil'}</option> 
                      : 
                        <option value={equipo.categoria != 0 ? 'Varonil' : 'Femenil'}>{equipo.categoria != 0 ? 'Varonil' : 'Femenil'}</option>
                      )
                  }
                </select>
                <br />
                <p className="labels">Apellido del Entrenador:</p>
                <input
                  className="input inputText"
                  type="text"
                  name="apellidoEntrenador"
                  id="apellidoEntrenador"
                  maxLength={100}
                  value={equipo.apellidoEntrenador}
                  required
                />
                <br />
                <p className="labels">Apellido del Asistente:</p>
                <input
                  className="input inputText"
                  type="text"
                  name="apellidoEntrenador"
                  id="apellidoEntrenador"
                  maxLength={100}
                  value={equipo.apellidoAsistente}
                  required
                />
                <br />
              </div>
            </div>
            <div className="btnContainer">
              <div className="centerBtnContainer">
                <button className="cancelBtn" onClick={() => closeModal(false)}>
                  Cancelar
                </button>
                <button>Guardar</button>
              </div>
            </div>
          </div>
          <div className="teamTable">
          <div className="containerTableJugadoresEquipo">
            <TableJugadoresEquipo listaJugadores={equipo.jugadores}/>
          </div>  
            <button className="addMemberBtn">Añadir Miembro</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditarEquipoModal;
