import React from "react";
import { useState, useEffect } from "react";
import "./RegistrarEvento.css";
import axios from "axios";
import { SAVE, FIND, process } from "../../Service/Api";
import Swal from "sweetalert2";
import ListaJugadores from "../ListaJugadores/ListaJugadores";

const oInitialState = {
  nombreEvento: "",
  fechaEvento: "",
  horaEvento: "",
  deporte: "",
  categoria: "",
  equipoLocal: "",
  directorTecnicoLocal: "",
  // puntosLocal : "",
  canchaJugada: "",
  equipoVisitante: "",
  directorTecnicoVisitante: "",
  // puntosVisitante : "",
  jornada: "",
  // incidentes : "",
};

export const RegistrarEvento = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(oInitialState);

  // Para el Select Option
  const [selectedOption, setSelectedOption] = useState("");
  const token = localStorage.getItem("token");

  //Estado para hacer visible la tabla para añadir jugadores del equipo correspondiente.
  const [mostrarTablaJugadoresLocal, setMostrarTablaJugadoresLocal] =
    useState(false);
  const [mostrarTablaJugadoresVisitante, setMostrarTablaJugadoresVisitante] =
    useState(false);

  //Se guarda en un estado el arreglo de los jugadores que corresponden a cada uno de los dos equipos.
  const [jugadoresLocales, setJugadoresLocales] = useState();
  const [jugadoresVisitantes, setJugadoresVisitantes] = useState();

  //Se guarda en un estado el id del equipo que será tanto local como visitante para posteriormente hacer la llamada de lo jugadores que corresponden a cada equipo seleccionado.
  const [equipoLocal, setEquipoLocal] = useState();
  const [equipoVisitante, setEquipoVisitante] = useState();

  //Estados para guardar en arreglos los deportistas que participaran en el evento.
  const [listaJugadoresLocales, setListaJugadoresLocales] = useState([]);
  const [listaJugadoresVisitantes, setListaJugadoresVisitantes] = useState([]);

  //Estado que sirve para que el arreglo vuelva a estar vacio si el usuario cambia el equipo en la etiqueta select
  const [limpiarJugadoresLocales, setLimpiarJugadoresLocales] = useState(false);
  const [limpiarJugadoresVisitantes, setLimpiarJugadoresVisitantes] =
    useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await process(FIND, "equipos");
      setData(response.data.data);
    };
    fetchApi();
  }, []);

  //UseEffect para el equipo local
  useEffect(() => {
    const fetchEquipoLocal = async () => {
      if (equipoLocal) {
        const response = await process(FIND, `equipos/${equipoLocal}`);
        setListaJugadoresLocales([]);
        setJugadoresLocales(response.data.data.jugadores);
      }
    };
    fetchEquipoLocal();
  }, [equipoLocal]);

  //UseEffect para el equipo visitante
  useEffect(() => {
    const fetchEquipoVisitante = async () => {
      if (equipoVisitante) {
        const response = await process(FIND, `equipos/${equipoVisitante}`);
        setListaJugadoresVisitantes([]);
        setJugadoresVisitantes(response.data.data.jugadores);
      }
    };
    fetchEquipoVisitante();
  }, [equipoVisitante]);

  //Función para enviar los datos del formulario correspondientes a la api.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (esMismoEquipo(equipoLocal, equipoVisitante)) {
      console.log(equipoLocal, equipoVisitante);

      const idJugadoresLocales = listaJugadoresLocales.map(
        (jugador) => jugador.deportistaId
      );
      const idJugadoresVisitantes = listaJugadoresVisitantes.map(
        (jugador) => jugador.deportistaId
      );
      const concatJugadores = idJugadoresLocales.concat(idJugadoresVisitantes);
      setForm((form.jugadores = concatJugadores));

      console.log(form);

      const responseUploadData = await process(SAVE, "eventos", form).catch(
        (e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal, intenta mas tarde",
          });
          console.log(e);
        }
      );

      if (responseUploadData?.data?.ok) {
        Swal.fire({
          icon: "success",
          title: "El registro fue exitoso",
          confirmButtonText: "Aceptar",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Los equipos deben de ser diferentes",
      });
    }
  };

  const esMismoEquipo = (equipoL, equipoV) => {
    return equipoL != equipoV;
  };

  return (
    <>
      <h3 className="title-form">Registrar evento</h3>
      <section className="form-section">
        <form id="registrarEventoForm" onSubmit={handleSubmit}>
          <div className="first-part">
            <div className="column-flex">
              <label className="input-title">Nombre del evento: </label>
              <br />
              <input
                type="text"
                className="input-text input-name"
                id="nombreEvento"
                name="nombreEvento"
                placeholder="Troyanos vs Damansus"
                onChange={(e) =>
                  setForm({ ...form, nombreEvento: e.target.value })
                }
                required
              />
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
                onChange={(e) =>
                  setForm({ ...form, fechaEvento: e.target.value })
                }
                required
              />
            </div>
            <br />
            <div className="column-flex">
              <label className="input-title">Hora del evento: </label>
              <br />
              <input
                type="time"
                id="horaEvento"
                name="horaEvento"
                className="input-time input-timeEvent"
                onChange={(e) =>
                  setForm({ ...form, horaEvento: e.target.value })
                }
                required
              />
            </div>
          </div>
        
          <div className="second-part">
            <div className="left-side">
            <label className="sport-title">Deporte</label>
            <select
              name="deporte"
              id="deporte"
              className="chose-sport input-text margin-input"
              value={form.deporte}
              onChange={(e) => {
                setForm({ ...form, deporte: e.target.value });
              }}
            >
              <option value="futbol">Futbol</option>
              <option value="basquetbol">Basquetbol</option>
            </select>
            <label className="label-title">Cancha:</label>
              <br />
              <input
                type="text"
                className="input-text margin-input"
                name="canchaDeJuego"
                id="canchaDeJuego"
                onChange={(e) =>
                  setForm({ ...form, canchaJugada: e.target.value })
                }
                required
              />
              <label className="label-title">Equipo Local:</label>
              <br />
              <select
                className="input-text margin-input"
                name="equipoLocal"
                id="equipoLocal"
                value={form.equipoLocal}
                onChange={(e) => {
                  setForm(
                    { ...form, equipoLocal: e.target.value },
                    setEquipoLocal(e.target.value)
                  ),
                    console.log("idEquipo", e.target.value);
                  setLimpiarJugadoresLocales(!limpiarJugadoresLocales);
                }}
              >
                {!equipoLocal ? (
                  <option value="">Selecciona una opción...</option>
                ) : (
                  ""
                )}
                {data.map((item) => (
                  <option key={item.equipoId} value={item.equipoId}>
                    {item.nombre}
                  </option>
                ))}
              </select>
              {equipoLocal ? (
                <div
                  className="btn-add-players"
                  onClick={() => setMostrarTablaJugadoresLocal(true)}
                >
                  Agregar Jugadores
                </div>
              ) : (
                ""
              )}
              <label className="label-title">Director Técnico Local:</label>
              <br />
              <input
                type="text"
                className="input-text margin-input"
                name="directorTecnicoLocal"
                id="directorTecnicoLocal"
                onChange={(e) =>
                  setForm({ ...form, directorTecnicoLocal: e.target.value })
                }
                required
              />
              {/* <label className="label-title">Puntos del Local:</label>
              <br />
              <input type="text" className="input-text margin-input" name = "puntosLocal" id = "puntosLocal" onChange = {e => setForm({...form, puntosLocal:e.target.value})}/> */}
             
            </div>
            <div className="middle-side versus-title">
              <h2 className="versus-title">VS</h2>
            </div>
            <div className="right-side">
            <label className="categoria-title">Categoría</label>
            <select
              name="categoria"
              id="categoria"
              className="chose-categoria input-text margin-input"
              value={form.categoria}
              onChange={(e) => {
                setForm({ ...form, categoria: e.target.value });
              }}
            >
              <option value="Varonil">Varonil</option>
              <option value="Femenil">Femenil</option>
            </select>
            <label className="label-title left-title">Jornada:</label>
              <input
                type="text"
                className="input-text margin-input-right"
                name="jornada"
                id="jornada"
                onChange={(e) => setForm({ ...form, jornada: e.target.value })}
                required
              />
              <br/>
              <label className="label-title">Equipo Visitante:</label>
              <select
                className="input-text margin-input-right"
                name="equipoVisitante"
                id="equipoVisitante"
                value={form.equipoVisitante}
                onChange={(e) => {
                  setForm({ ...form, equipoVisitante: e.target.value }),
                    setEquipoVisitante(e.target.value);
                  console.log("idEquipo", e.target.value);
                  setLimpiarJugadoresVisitantes(!limpiarJugadoresVisitantes);
                }}
              >
                {!equipoVisitante ? (
                  <option value="">Selecciona una opción...</option>
                ) : (
                  ""
                )}
                {data.map((item) => (
                  <option key={item.equipoId} value={item.equipoId}>
                    {item.nombre}
                  </option>
                ))}
              </select>
              <br />
              {equipoVisitante ? (
                <div
                  className="btn-add-players"
                  onClick={() => setMostrarTablaJugadoresVisitante(true)}
                >
                  Agregar Jugadores
                </div>
              ) : (
                ""
              )}
              <label className="label-title">Director Técnico Visitante:</label>
              <input
                type="text"
                className="input-text margin-input-right"
                name="directorTecnicoVisitante"
                id="directorTecnicoVisitante"
                onChange={(e) =>
                  setForm({ ...form, directorTecnicoVisitante: e.target.value })
                }
                required
              />
              <br />
              {/* <label className="label-title">Puntos del Visitante:</label>
              <input type="text" className="input-text margin-input-right" name = "puntosVisitante" id = "puntosVisitante" onChange = {e=>setForm({...form, puntosVisitante: e.target.value})}/>
              <br /> */}
            </div>
          </div>
          <div className="third-part">
            {/* <label className="input-title">¿Sucedieron incidentes?</label>
            <br />
            <textarea className="convert-to-textarea" name = "incidentes" id = "incidentes" onChange = {e=>setForm({...form, incidentes: e.target.value })}/> */}
            <div className="btn-section">
              <button
                type="submit"
                form="registrarEventoForm"
                className="btn-registrar-evento"
              >
                Registrar Evento
              </button>
            </div>
          </div>
          {
            <ListaJugadores
              trigger={mostrarTablaJugadoresLocal}
              setTrigger={setMostrarTablaJugadoresLocal}
              jugadores={listaJugadoresLocales}
              setJugadores={setListaJugadoresLocales}
              deportistas={jugadoresLocales}
              mostrarListaCompleta={true}
              limpiar={limpiarJugadoresLocales}
            />
          }
          {
            <ListaJugadores
              trigger={mostrarTablaJugadoresVisitante}
              setTrigger={setMostrarTablaJugadoresVisitante}
              jugadores={listaJugadoresVisitantes}
              setJugadores={setListaJugadoresVisitantes}
              deportistas={jugadoresVisitantes}
              mostrarListaCompleta={true}
              limpiar={limpiarJugadoresVisitantes}
            />
          }
        </form>
      </section>
    </>
  );
};
