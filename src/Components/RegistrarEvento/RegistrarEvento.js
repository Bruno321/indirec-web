import React from "react";
import { useState, useEffect } from "react";
import "./RegistrarEvento.css";
import axios from "axios";
import { SAVE, FIND, process } from "../../Service/Api";
import Swal from "sweetalert2";
import ListaJugadores from '../ListaJugadores/ListaJugadores';
import { useFetchData } from '../../Hooks/Fetch.hook';

const oInitialState = {
  nombre: "",
  fecha: "",
  hora: "",
  deporte: "",
  equipo_local_id: "",
  directorTecnicoLocal : "",
  categoria: "",
  // puntosLocal : "",
  canchaJugada: "",
  equipoVisitante: "",
  directorTecnicoVisitante: "",
  // puntosVisitante : "",
  jornada: "",
  // incidentes : "",
};

export const RegistrarEvento = () => {
  const [equipos] = useFetchData("equipos");
  const [form,setForm] = useState(oInitialState);

  // Para el Select Option
  const [selectedOption, setSelectedOption] = useState("");
  //Se guarda en un estado el arreglo de los jugadores que corresponden a cada uno de los dos equipos.
  const [jugadoresLocales, setJugadoresLocales] = useState();
  const [jugadoresVisitantes, setJugadoresVisitantes] = useState();

//Estado para hacer visible la tabla para añadir jugadores del equipo correspondiente. 
const [mostrarTablaJugadoresLocal, setMostrarTablaJugadoresLocal] = useState(false);
const [mostrarTablaJugadoresVisitante, setMostrarTablaJugadoresVisitante] = useState(false);

  //Se guarda en un estado el id del equipo que será tanto local como visitante para posteriormente hacer la llamada de lo jugadores que corresponden a cada equipo seleccionado.
  const [equipoLocal, setEquipoLocal] = useState();
  const [equipoVisitante, setEquipoVisitante] = useState();

  //Estados para guardar en arreglos los deportistas que participaran en el evento.
  const [listaJugadoresLocales, setListaJugadoresLocales] = useState([]);
  const [listaJugadoresVisitantes, setListaJugadoresVisitantes] = useState([]);

  //Estado que sirve para que el arreglo vuelva a estar vacio si el usuario cambia el equipo en la etiqueta select
  const [limpiarJugadoresLocales, setLimpiarJugadoresLocales] = useState(false);
  const [limpiarJugadoresVisitantes, setLimpiarJugadoresVisitantes] = useState(false);

  //UseEffect para el equipo local
  useEffect(() => {
    const fetchEquipoLocal = async () => {
      if (equipoLocal) {
        const response = await process(FIND, `equipos/${equipoLocal}`);
        setListaJugadoresLocales([]);
        setJugadoresLocales(response.data?.deportistas);
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
        setJugadoresVisitantes(response.data?.deportistas);
      }
    };
    fetchEquipoVisitante();
  }, [equipoVisitante]);

  //Función para enviar los datos del formulario correspondientes a la api.
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(esMismoEquipo(equipoLocal, equipoVisitante)){
      // console.log(equipoLocal, equipoVisitante)

      const idJugadoresLocales = listaJugadoresLocales.map(jugador => jugador.id);
      const idJugadoresVisitantes = listaJugadoresVisitantes.map(jugador => jugador.id);
      const concatJugadores = idJugadoresLocales.concat(idJugadoresVisitantes);
      setForm(form.jugadores = concatJugadores)

      // console.log(form)

      const response = await process(SAVE, 'eventos', form).catch(e => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal, intenta mas tarde',
        })
        console.log(e);
      });

      if(response.status === 201){
        Swal.fire({
          icon: 'success',
          title: 'El registro fue exitoso',
          confirmButtonText: 'Aceptar'
        })
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los equipos deben de ser diferentes',
      })
    }
  };

  const esMismoEquipo = (equipoL, equipoV) => {
    return equipoL != equipoV;
  };

  return (
    <>
      <h3 className="title-form">Registrar evento</h3><br/>
      <section className="form-section">
        <form id="registrarEventoForm" onSubmit={handleSubmit}>
          <div className="first-part">
            <div className="column-flex">
              <label style={{marginBottom:"0px"}}>Nombre del evento: </label>
              <br />
              <input
                type="text"
                className="input-text input-name" 
                id="nombre"
                name="nombre"
                placeholder="Nombre del evento"
                onChange={e => setForm({...form, nombre:e.target.value})} 
                required
              />
              <br />
            </div>
            
            <div className="column-flex">
              <label style={{marginBottom:"0px"}}>Fecha del evento: </label>
              <br />
              <input
                type="date"
                id="fecha"
                name="fecha"
                className="input-date input-date-event"
                placeholder="dd-mm-yyyy"
                onChange = {e => setForm({...form, fecha: e.target.value})}
                required
              />
            </div>

            <div className="column-flex">
              <label style={{marginBottom:"0px"}}>Hora del evento: </label>
              <br />
              <input
                type="time"
                id = "hora"
                name = "hora"
                className="input-time input-timeEvent"
                onChange ={e => setForm({...form, hora: e.target.value})}
                required
              />
            </div>

            <div className="column-flex">
              <label>Jornada:</label><br/>
                <input
                  type="text"
                  className="input-text margin-input jornada"
                  name="jornada"
                  id="jornada"
                  placeholder="00"
                  onChange={(e) => setForm({ ...form, jornada: e.target.value })}
                  required
                />
            </div>
          </div>

          <div className="first-part">
            <div className="column-flex">
              <label>Categoría:</label><br/>
              <select
                name="categoria"
                id="categoria"
                className="chose-categoria input-select margin-input"
                value={form.categoria}
                onChange={(e) => {
                  setForm({ ...form, categoria: e.target.value });
                }}
              >
                <option value="Varonil">Varonil</option>
                <option value="Femenil">Femenil</option>
              </select>
            </div>
            <div className="column-flex">
              <label>Deporte:</label><br/>
                <select
                  name="deporte"
                  id="deporte"
                  className="chose-sport input-select margin-input"
                  value={form.deporte}
                  onChange={(e) => {
                    setForm({ ...form, deporte: e.target.value });
                  }}
                >
                  <option value="futbol">Futbol</option>
                  <option value="basquetbol">Basquetbol</option>
                </select>
            </div>

            <div className="column-flex">
              <label>Cancha:</label><br/>
                <input
                  type="text"
                  className="input-text margin-input"
                  name="canchaDeJuego"
                  id="canchaDeJuego"
                  placeholder="Cancha de juego"
                  onChange={(e) =>
                    setForm({ ...form, canchaJugada: e.target.value })
                  }
                  required
                />
            </div>
          </div>
        
          <div className="second-part">
          <div className="left-side">
              <label className="label-title">Equipo Local:</label>
              <select 
                className="input-text margin-input-right" 
                name="equipoLocal" id="equipoLocal" 
                value={form.equipo_local_id} 
                onChange={e => {
                  setForm({...form, equipo_local_id:e.target.value}, 
                  setEquipoLocal(e.target.value)), 
                  console.log('idEquipo', e.target.value)
                  setLimpiarJugadoresLocales(!limpiarJugadoresLocales)
                }}
              >
                {
                  !equipoLocal 
                  ? 
                    <option value="">Selecciona una opción...</option>
                  :
                    ''
                }
                {equipos.data.map(item =>
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                )}
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
              <br/><label className="label-title">Director Técnico Local:</label>
              <input
                type="text"
                className="input-text margin-input-right"
                name="directorTecnicoLocal"
                id="directorTecnicoLocal"
                onChange={(e) =>
                  setForm({ ...form, directorTecnicoLocal: e.target.value })
                }
                required
              />
            </div>
            <div className="middle-side versus-title">
              <h2 className="versus-title">VS</h2>
            </div>
            <div className="right-side">
              <label className="label-title">Equipo Visitante:</label>
              <select 
                className="input-text margin-input-right" 
                name="equipoVisitante" 
                id="equipoVisitante" 
                value={form.equipo_visitante_id} 
                onChange={e => {
                  setForm({...form, equipo_visitante_id:e.target.value}), 
                  setEquipoVisitante(e.target.value)
                  console.log('idEquipo', e.target.value)
                  setLimpiarJugadoresVisitantes(!limpiarJugadoresVisitantes)
                }}
              >
                {
                  !equipoVisitante
                  ? 
                    <option value="">Selecciona una opción...</option>
                  :
                    ""
                }
                {equipos.data.map(item => 
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                )}
              </select>
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
              <br/><label className="label-title">Director Técnico Visitante:</label>
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
            </div>
          </div>
          <div className="third-part">
            <div className="btn-section">
              <button
                type="submit"
                form="registrarEventoForm"
                className="custom-button"
              >
                Registrar
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
