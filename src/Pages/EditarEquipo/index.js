import React, { useState, useContext } from 'react';
import { NavigationContext } from "../../Context/NavigationContext.js";
import { useFetchData } from '../../Hooks/Fetch.hook';
import { Table } from '../../Components/Table/Table';
import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";
import PencilAlt from "../../Assets/icons/pencilAlt.png";
import ListaJugadores from '../../Components/ListaJugadores/ListaJugadores.js';
import { aFacultities, aCampus } from "../../Utils/constants";
import { useEffect } from 'react';
import { UPDATE, process } from "../../Service/Api";
import Swal from 'sweetalert2';
import leftArrow from "../../Assets/icons/left-arrow.png";

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

export const EditarEquipo = () => {
    const {itemId,setScreen} = useContext(NavigationContext)
    const [equipo, loading] = useFetchData(`equipos/${itemId}`);
    const [mostrarListaJugadoresEquipo, setMostrarListaJugadoresEquipo] = useState(false);
    const [listaJugadores, setListaJugadores] = useState([]);
    const [jugadoresToRender,setJugadoresToRender] = useState([])
    const [form, setForm] = useState(oInitialState);

    const campus = ['Centro Universitario', 'Juriquilla', 'Aeropuerto', 'Ex-prepa Centro', 'Prepa Norte', 'Prepa Sur', 'Centro Historico'];
    const categoria = [0, 1];
    const facultades = ['Facultad de Bellas Artes','Facultad de Ciencias Naturales','Facultad de Ciencias Políticas y Sociales','Facultad de Derecho',
      'Facultad de Filosofía','Facultad de Informática','Facultad de Ingeniería','Facultad de Lenguas y Letras','Facultad de Medicina','Facultad de Psicología',
      'Facultad de Contaduría','Facultad de Química','Facultad de Enfermería','Escuela de Bachilleres'
    ];
  
    const columns = [
      {
        title: 'Expediente',
        dataIndex: 'expediente',
      },
      {
        title: 'Nombre(s)',
        dataIndex: 'nombres',
      },
      {
        title: 'Apellido(s)',
        dataIndex: 'apellidos',
      },
      {
        title: 'Facultad',
        dataIndex: 'facultad',
      },
      {
        title: 'Correo',
        dataIndex: 'correo',
      },
      {
        title: 'Teléfono',
        dataIndex: 'telefono',
      },
      {
        title: 'Tel. Emergencia',
        dataIndex: 'telefonoEmergencia',
      },
      {
        title: 'No. Jugador',
        dataIndex: 'numJugador',
      },
      {
        title: 'Acciones',
        dataIndex: 'deportistaId',
        render: (sId, row, index) => (
          <>
            <img
              title="Editar"
              src={iconEdit}
              className='icons edit'
              onClick={() => {
                setButtonMoreInfo(true);
                setSelected(row);
              }}
              />
            <img
              title="Eliminar"
              src={iconDelete}
              className='icons delete'
              onClick={() => {
                setSelected(row);
                Swal.fire({
                  title: 'ELIMINAR',
                  text: "¿Eliminar a "+ row.nombres + " " + row.apellidos + " del equipo?",
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  cancelButtonText: 'Cancelar',
                  confirmButtonText: 'Confirmar'
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      title: 'ATENCION',
                      text: "¿Estas seguro de eliminar a "+ row.nombres + " " + row.apellidos + "?",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      cancelButtonText: 'Cancelar',
                      confirmButtonText: 'Confirmar'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire(
                          'Eliminado satisfactoriamente',
                          "El deportista "+ row.nombres + " " + row.apellidos + " ha sido eliminado.",
                          'success'
                        )
                      }
                    })
                  }
                })
              }}
              />
          </>
        ),
      }
    ];
    const handleSubmit = async () => {
      let oSend = {
        ...form,
        jugadores: jugadoresToRender.map(j => j.deportistaId),
      };
      const response = await process(UPDATE, 'equipos', oSend, { id: oSend.equipoId }).catch(e => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal, intenta mas tarde',
        })
        console.log(e);
      });
      
      console.log(response.data)
      if (response?.data?.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Se actualizó el equipo correctamente',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // updater();
          location.reload()
        });
      }
    };  

    useEffect(()=>{
      setJugadoresToRender(equipo.jugadores)
      if (equipo) {
        setForm(equipo);
      }
    },[equipo])

    useEffect(()=>{
      let mergedArray = [
        ...jugadoresToRender,
        ...listaJugadores
      ]
      setJugadoresToRender(mergedArray)
    },[listaJugadores])
    
    return (
        <div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <h1>{form.nombre}</h1>
            <img style={{cursor:"pointer"}} onClick={()=>setScreen(5)} src={leftArrow}/>
          </div>
            <h3>Editar Equipo</h3>
            <div className="modalUpdateContainer">
                <div className="formEditInformationTeam">
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
                </div>
            </div>
            <div>
                <h3>Deportistas</h3>
                    <div className="btnEditarEquipo" onClick={() => setMostrarListaJugadoresEquipo(true)}>
                        <img src={PencilAlt}/>
                        Agregar jugador
                    </div>
                    
            </div>
            <ListaJugadores trigger={mostrarListaJugadoresEquipo} setTrigger={setMostrarListaJugadoresEquipo} jugadores={listaJugadores} setJugadores={setListaJugadores}></ListaJugadores>
            <Table
              columns={columns}
              dataSource={jugadoresToRender}
              loading={loading}
            />
            <button type="submit" form="registrarEquipoForm" className="button-registroEquipo" style={{marginTop:"20px",marginLeft:"10px"}} onClick={handleSubmit}>Guardar cambios</button>
        </div>
    )
}