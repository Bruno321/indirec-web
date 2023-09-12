import React, { useState, useContext } from "react";
import { NavigationContext } from "../../Context/NavigationContext.js";
import { useFetchData } from "../../Hooks/Fetch.hook";
import VerJugadoresEvento from "../VerJugadoresEvento/VerJugadoresEvento.js";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.js";
import moment from "moment";
import "./MoreInfoEventos.css";

function MoreInfoEventos() {
  const { itemId, setScreen } = useContext(NavigationContext);
  const [evento, loading] = useFetchData(`eventos/${itemId}`);

  const [equipoIdTable, setEquipoIdTable] = useState();
  const [nombreEquipo, setNombreEquipo] = useState();

  const [jugadores, setJugadores] = useState([]);

  const [trigger, setTrigger] = useState(false);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <section className="eventInformationHeader">
        <h1 className="titleEvent">{evento?.nombre}</h1>
        <section className="score-section-with-teams">
          <section className="local-info">
            <p>{evento.EquipoLocal?.nombre}</p>
            <p>LOCAL</p>
          </section>
          <section className="score-info-section">
            <p>
              {evento.puntosLocal ? (
                evento.puntosLocal
              ) : (
                <i style={{ opacity: "0.5" }}>Sin Registrar</i>
              )}
            </p>
            <p>-</p>
            <p>
              {evento.puntosVisitante ? (
                evento.puntosVisitante
              ) : (
                <i style={{ opacity: "0.5" }}>Sin Registrar</i>
              )}
            </p>
          </section>
          <section className="visitante-info">
            <p>{evento.EquipoVisitante?.nombre}</p>
            <p>VISITANTE</p>
          </section>
        </section>
      </section>

      <section className="separador-jornada">
        <p>Jornada {evento.jornada}</p>
      </section>

      <section className="basic-information-evento">
        <div className="fecha-info">
          <p>Fecha:</p>
          <p>
            {" "}
            {evento.fecha
              ? moment(evento.fecha).format("DD/MM/YYYY")
              : "Sin registrar"}
          </p>
        </div>
        <div className="hora-info">
          <p>Hora:</p>
          <p>{evento.hora}</p>
        </div>
        <div className="cancha-info">
          <p>Cancha:</p>
          <p>{evento.canchaJugada}</p>
        </div>
      </section>
      <section className="directoresTecnicos-section">
        <section className="director-tecnico-local">
          <p>Director técnico:</p>
          {/* <p>{evento.directorTecnicoLocal}</p> */}
          <p>Pep Guardiola</p>
          <button
            className="ver-jugadores"
            onClick={() => {
              setEquipoIdTable(evento.EquipoLocal.id);
              setJugadores(
                evento.eventos_details.filter(
                  ({ deportista }) =>
                    deportista.equipo.id === evento.equipo_local_id
                )
              );
              setTrigger(true);
              setNombreEquipo(evento.EquipoLocal?.nombre);
            }}
          >
            Ver jugadores
          </button>
        </section>
        <section className="director-tecnico-visitante">
          <p>Director técnico:</p>
          <p>{evento.directorTecnicoVisitante}</p>

          <button
            className="ver-jugadores"
            onClick={() => {
              setEquipoIdTable(evento.EquipoVisitante.id);
              setJugadores(
                evento.eventos_details.filter(
                  ({ deportista }) =>
                    deportista.equipo.id === evento.equipo_visitante_id
                )
              );
              setTrigger(true);
              setNombreEquipo(evento.EquipoVisitante?.nombre);
            }}
          >
            Ver jugadores
          </button>
        </section>
      </section>
      <div className="botones-verjugadores"></div>

      <section className="bottom-observaciones">
        <p>Observaciones:</p>
        <p>{evento.incidentes ? evento.incidentes : "--"}</p>
      </section>
      <section className="btn-aceptar-section">
        <button className="button-aceptar" onClick={() => setScreen(8)}>
          Aceptar
        </button>
      </section>

      {/* Modals para ver a los jugadores */}
      <VerJugadoresEvento
        trigger={trigger}
        setTrigger={setTrigger}
        setJugadores={setJugadores}
        equipoID={equipoIdTable}
        listaJugadores={jugadores}
        equipo={nombreEquipo}
      />
    </>
  );
}

export default MoreInfoEventos;
