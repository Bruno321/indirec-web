import React, { useState, useContext, useEffect } from "react";
import { NavigationContext } from "../../Context/NavigationContext.js";
import { useFetchData } from "../../Hooks/Fetch.hook";
import { Table } from "../../Components/Table/Table";
import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";
import ListaJugadores from "../../Components/ListaJugadores/ListaJugadores.js";
import { aFacultities, aCampus } from "../../Utils/constants";
import { UPDATE, process } from "../../Service/Api";
import Swal from "sweetalert2";
import "../../Components/Modals/EditarEquipoModal/EditarEquipoModal.css";

const oInitialState = {
  nombre: "",
  facultad: "",
  campus: "",
  deporte: "",
  categoria: null,
  nombreEntrenador: "",
  apellidoEntrenador: "",
  nombreAsistente: "",
  apellidoAsistente: "",
  jugadores: [],
};

export const EditarEquipo = () => {
  const { itemId, setScreen } = useContext(NavigationContext);
  const [equipo, loading] = useFetchData(`equipos/${itemId}`);
  const [mostrarListaJugadoresEquipo, setMostrarListaJugadoresEquipo] =
    useState(false);
  const [listaJugadores, setListaJugadores] = useState([]); //Arreglo que guarda los jugadores que se estan agregando mediante la tabla.
  const [pagina, setPagina] = useState(0);
  const [form, setForm] = useState(oInitialState);

  useEffect(() => {
    if (equipo.id === undefined) {
      return 
    }

    const equipoKeys = Object.keys(equipo).sort();
    const formKeys = Object.keys(form).sort();

    if (JSON.stringify(equipoKeys) === JSON.stringify(formKeys)) {
      return;
    }

    setForm(equipo);
  }, [equipo]);


  const categoria = [0, 1];

  const columns = [
    {
      title: "Expediente",
      dataIndex: "expediente",
    },
    {
      title: "Nombre(s)",
      dataIndex: "nombres",
    },
    {
      title: "Apellido(s)",
      dataIndex: "apellidos",
    },
    {
      title: "Facultad",
      dataIndex: "facultad",
    },
    {
      title: "Correo",
      dataIndex: "correo",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
    },
    {
      title: "Tel. Emergencia",
      dataIndex: "telefonoEmergencia",
    },
    {
      title: "No. Jugador",
      dataIndex: "numJugador",
    },
    {
      title: "Acciones",
      dataIndex: "deportistaId",
      render: (sId, row, index) => (
        <>
          <img
            title="Editar"
            src={iconEdit}
            className="icons edit"
            onClick={() => {
              setButtonMoreInfo(true);
              setSelected(row);
            }}
          />
          <img
            title="Eliminar"
            src={iconDelete}
            className="icons delete"
            onClick={() => {
              setSelected(row);
              Swal.fire({
                title: "ELIMINAR",
                text:
                  "¿Eliminar a " +
                  row.nombres +
                  " " +
                  row.apellidos +
                  " del equipo?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Confirmar",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "ATENCION",
                    text:
                      "¿Estas seguro de eliminar a " +
                      row.nombres +
                      " " +
                      row.apellidos +
                      "?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Confirmar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire(
                        "Eliminado satisfactoriamente",
                        "El deportista " +
                          row.nombres +
                          " " +
                          row.apellidos +
                          " ha sido eliminado.",
                        "success"
                      );
                    }
                  });
                }
              });
            }}
          />
        </>
      ),
    },
  ];
  const handleSubmit = async () => {
    let oSend = {
      ...form,
    };
    const response = await process(UPDATE, "equipos", oSend, {
      id: oSend.id,
    }).catch((e) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal, intenta mas tarde",
      });
    });

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Se actualizó el equipo correctamente",
        confirmButtonText: "Aceptar",
      }).then(() => {
        setScreen(5);
      });
    }
  };

  return (
    <div>
      <h3>Editar equipo</h3>
      
      <div className="modalUpdateContainer">
        <div className="formEditInformationTeam">
          <div className="formContainer">
            <div className="formContainerLeft">

              <label  htmlFor="nombre">
                Nombre del equipo:
              </label><br/>
              <input
                className="editarEquipo-input"
                type="text"
                name="nombre"
                id="nombre"
                maxLength={80}
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />
              <br />

              <label  htmlFor="facultad">
                Facultad:
              </label><br/>
              <select
                className="custom-select"
                id="facultad"
                value={form.facultad}
                onChange={(e) => setForm({ ...form, facultad: e.target.value })}
              >
                {aFacultities.map((c) => (
                  <option value={`Facultad de ${c}`}>Facultad de {c}</option>
                ))}
              </select>
              <br />

              <label  htmlFor="nombreEntrenador">
                Nombre del entrenador:
              </label><br/>
              <input
                className="editarEquipo-input"
                type="text"
                name="nombreEntrenador"
                id="nombreEntrenador"
                maxLength={100}
                value={form.nombreEntrenador}
                onChange={(e) =>
                  setForm({ ...form, nombreEntrenador: e.target.value })
                }
                required
              />
              <br />

              <label htmlFor="nombreAsistente" >
                Nombre del asistente:
              </label><br/>
              <input
                className="editarEquipo-input"
                type="text"
                name="nombreAsistente"
                id="nombreAsistente"
                maxLength={100}
                value={form.nombreAsistente}
                onChange={(e) =>
                  setForm({ ...form, nombreAsistente: e.target.value })
                }
                required
              />
              <br />

            </div>

            <div className="formContainerRight">

              <label htmlFor="campus" >
                Campus:
              </label><br/>
              <select
                className="custom-select"
                id="campus"
                value={form.campus}
                onChange={(e) => setForm({ ...form, campus: e.target.value })}
              >
                {aCampus.map((c) => (
                  <option value={`${c}`}>{c}</option>
                ))}
              </select>
              <br />

              <label htmlFor="categoria" >
                Categoría:
              </label><br/>
              <select
                id="categoria"
                className="custom-select"
                value={form.categoria}
                onChange={(e) =>
                  setForm({ ...form, categoria: e.target.value })
                }
              >
                {categoria.map((c) => (
                  <option value={c}>
                    {equipo.categoria === c ? "Varonil" : "Femenil"}
                  </option>
                ))}
              </select>
              <br />

              <label htmlFor="apellidoEntrenador" >
                Apellido del entrenador:
              </label><br/>
              <input
                className="editarEquipo-input"
                type="text"
                name="apellidoEntrenador"
                id="apellidoEntrenador"
                maxLength={100}
                value={form.apellidoEntrenador}
                onChange={(e) =>
                  setForm({ ...form, apellidoEntrenador: e.target.value })
                }
                required
              />
              <br />

              <label htmlFor="apellidoAsistente" >
                Apellido del asistente:
              </label><br/>
              <input
                className="editarEquipo-input"
                type="text"
                name="apellidoAsistente "
                id="apellidoAsistente"
                maxLength={100}
                value={form.apellidoAsistente}
                onChange={(e) =>
                  setForm({ ...form, apellidoAsistente: e.target.value })
                }
                required
              />
              <br />

            </div>
          </div>
        </div>
      </div>

      <div>
        <h3>Deportistas</h3>
      </div>
      <ListaJugadores
        trigger={mostrarListaJugadoresEquipo}
        setTrigger={setMostrarListaJugadoresEquipo}
        jugadores={listaJugadores}
        setJugadores={setListaJugadores}
      />
      <Table
        columns={columns}
        dataSource={loading ? [] : equipo.deportistas?.length ? {
          data: [...equipo.deportistas],
          total: equipo.deportistas.length
        } : []}
        loading={loading}
        pagina={pagina}
        setPagina={setPagina}
      />
      <div className="buttons-registrar-resultados">
        <button className="cancelar" onClick={() => setScreen(5)}>Cancelar</button>
        <button
          type="submit"
          form="registrarEquipoForm"
          className="guardar"
          onClick={handleSubmit}
        >
          Guardar cambios
        </button>

      </div>

    </div>
  );
};
