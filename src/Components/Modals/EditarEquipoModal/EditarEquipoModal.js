import React from "react";
import "./EditarEquipoModal.css";
import { aFacultities } from "../../../Utils/constants";
import TableJugadoresEquipo from "../../TableListaJugadoresEquipo/TableJugadoresEquipo";
import {useFetchData} from '../../../Hooks/Fetch.hook'
import ListaJugadores from "../../ListaJugadores/ListaJugadores";

function EditarEquipoModal(props) {

  const {closeModal} = props;
  const {equipo} = props;

  console.log()
  //const [equipo] = useFetchData(`equipos/${props.idEquipo}`)

  console.log(equipo);
  
  const campus = ['Centro Universitario', 'Juriquilla', 'Aeropuerto', 'Ex-prepa Centro', 'Prepa Norte', 'Prepa Sur', 'Centro Historico'];
  const categoria = [0, 1];
  const facultades = ['Facultad de Bellas Artes','Facultad de Ciencias Naturales','Facultad de Ciencias Políticas y Sociales','Facultad de Derecho',
    'Facultad de Filosofía','Facultad de Informática','Facultad de Ingeniería','Facultad de Lenguas y Letras','Facultad de Medicina','Facultad de Psicología',
    'Facultad de Contaduría','Facultad de Química','Facultad de Enfermería','Escuela de Bachilleres'
  ];


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
                <label className="labels" htmlFor="nombre">
                  Nombre del Equipo:
                </label>
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
                <label className="labels" htmlFor="facultad">Facultad:</label>
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
                <label className="labels" htmlFor="nombreEntrenador">Nombre del Entrenador:</label>
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
                <label htmlFor="nombreAsistente" className="labels">Nombre del Asistente:</label>
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
                <label htmlFor="campus" className="labels">Campus:</label>
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
                <label htmlFor="categoria" className="labels">Categoría:</label>
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
                <label htmlFor="apellidoEntrenador" className="labels">Apellido del Entrenador:</label>
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
                <label htmlFor="apellidoAsistente" className="labels">Apellido del Asistente:</label>
                <input
                  className="input inputText"
                  type="text"
                  name="apellidoAsistente "
                  id="apellidoAsistente"
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
            {/* <ListaJugadores/> */}
          </div>  
            <button className="addMemberBtn">Añadir Miembro</button>
          </div>
        </div>
      </div>
      <ListaJugadores/>
    </div>
  );
}
export default EditarEquipoModal;
