import React from "react";
import "./EditarEquipoModal.css";
import { aFacultities } from "../../../Utils/constants";

function EditarEquipoModal({ closeModal }) {
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
                  placeholder="Real Mandril"
                  required
                />
                <br />
                <p className="labels">Facultad:</p>
                <select className="input inputSelect" id="facultad">
                  {aFacultities.map((oFc) => (
                    <option
                      value={`Facultad de ${oFc}`}
                    >{`Facultad de ${oFc}`}</option>
                  ))}
                  <option>Escuela de Bachilleres</option>
                </select>
                <br />
                <p className="labels">Nombre del Entrenador:</p>
                <input
                  className="input inputText"
                  type="text"
                  name="nombreEntrenador"
                  id="nombreEntrenador"
                  maxLength={100}
                  placeholder="Samantha"
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
                  placeholder="Hernández"
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
                  <option value="Juriquilla">Centro Universitario</option>
                  <option value="Centro Historico">Juriquilla</option>
                  <option value="Centro Historico">Aeropuerto</option>
                  <option value="Centro Historico">Ex-prepa Centro</option>
                  <option value="Centro Historico">Prepa Norte</option>
                  <option value="Centro Historico">Prepa Sur</option>
                </select>
                <br />
                <p className="labels">Categoría:</p>
                <select id="categoria" className="input inputSelect">
                  <option value={0}>Femenil</option>
                  <option value={1}>Varonil</option>
                </select>
                <br />
                <p className="labels">Apellido del Entrenador:</p>
                <input
                  className="input inputText"
                  type="text"
                  name="apellidoEntrenador"
                  id="apellidoEntrenador"
                  maxLength={100}
                  placeholder="Hernández"
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
                  placeholder="Vizcaya"
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
            
            </div>  
            <button className="addMemberBtn">Añadir Miembro</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditarEquipoModal;
