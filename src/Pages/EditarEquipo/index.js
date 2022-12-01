import React, { useState, useContext } from 'react';
import { NavigationContext } from "../../Context/NavigationContext.js";
import { useFetchData } from '../../Hooks/Fetch.hook';
import { Table } from '../../Components/Table/Table';
import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";

export const EditarEquipo = () => {
    const {itemId} = useContext(NavigationContext)
    const [equipo, loading] = useFetchData(`equipos/${itemId}`);

    console.log(equipo)
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

    return (
        <div>
            <h1>--------------</h1>
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
                        value={'a'}
                        placeholder= {``}
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
                        value={'a'}
                        placeholder={``}
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
                        value={'a'}
                        placeholder={``}
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
                        value={'a'}
                        placeholder={``}
                        required
                        />
                        <br />
                        <label htmlFor="apellidoAsistente" className="labels">Apellido del Asistente:</label>
                        <input
                        className="input inputText"
                        type="text"
                        maxLength={100}
                        name="apellidoAsistente"
                        id="apellidoAsistente"
                        value={'a'}
                        placeholder= {``}
                        required
                        />
                        <br />
                    </div>
                    </div>
                </div>
            </div>
            <div>
                <h3>Deportistas</h3>
                <button>Agregar deportistas</button>
            </div>
            <Table
              columns={columns}
              dataSource={equipo.jugadores}
              loading={loading}
            />
        </div>
    )
}