import React from "react";
import "./RegistrarEvento.css";

export const RegistrarEvento = () => {
  return (
    <>
      <h1 className="title-form">REGISTRAR EVENTOS</h1>
      <section className="form-section">
        <form id = "registrarEventoForm">
          <div className="first-part">
            <div className="column-flex bg-purple">
              <label className="input-title">Nombre del evento: </label>
              <br />
              <input type="text" className="input-text input-name"  id = "nombreEvento" name = "nombreEvento" placeholder="Troyanos vs Damansus"/>
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
                required
              />
            </div>
          </div>
          <div className="second-part">
            <div className="left-side">
              <label className="label-title">Equipo Local:</label>
              <br />
              <select className="input-text margin-input" name = "equipoLocal" id = "equipoLocal" >
                <option value="pumas">Pumas</option>
                <option value="toluca">Toluca</option>
              </select>
              <button className = "btn-add-players">Agregar Jugadores</button>
              <label className="label-title">Director Técnico Local:</label>
              <br />
              <input type="text" className="input-text margin-input" name = "directorTecnicoLocal" id = "directorTecnicoLocal"/>
              <label className="label-title">Puntos del Local:</label>
              <br />
              <input type="text" className="input-text margin-input" name = "puntosLocal" id = "puntosLocal"/>
              <label className="label-title">Cancha donde jugaron:</label>
              <br />
              <input type="text" className="input-text margin-input" name = "canchaDeJuego" id = "canchaDeJuego"/>
            </div>
            <div className="middle-side versus-title">
              <h2 className="versus-title">VS</h2>
            </div>
            <div className="right-side">
              <label className="label-title">Equipo Visitante:</label>
              <select className="input-text margin-input-right" name = "equipoVisitante" id = "equipoVisitante">
                <option value="pumas">Pumas</option>
                <option value="toluca">Toluca</option>
              </select>
              <br />
              <button className = "btn-add-players">Agregar Jugadores</button>
              <label className="label-title">Director Técnico Visitante:</label>
              <input type="text" className="input-text margin-input-right" />
              <br />
              <label className="label-title">Puntos del Visitante:</label>
              <input type="text" className="input-text margin-input-right" />
              <br />
              <label className="label-title">Jornada:</label>
              <input type="text" className="input-text margin-input-right" />
              <br />
            </div>
          </div>
          <div className="third-part">
            <label className="input-title">¿Sucedieron incidentes?</label>
            <br />
            <textarea className="convert-to-textarea" required />
            <div className="btn-section">
            <button type="submit" form="registrarEventoForm" className="btn-registrar-evento">Registrar Evento</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
