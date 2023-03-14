import React, { useState, useContext } from 'react';
import { Table } from '../../Components/Table/Table';
import { useFetchData } from '../../Hooks/Fetch.hook';
import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";
import iconMoreInfo from "../../Assets/icons/more-info.png";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NavigationContext } from '../../Context/NavigationContext';
// Modal

export const EquiposScreen = () => {
  const [equipos, loading, updater] = useFetchData('equipos');
  const [visible, setVisible] = useState(false);
  const [equipo, setEquipo] = useState();
  const {setItemId,setScreen} = useContext(NavigationContext)
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      title: 'Facultad',
      dataIndex: 'facultad',
    },
    {
      title: 'Campus',
      dataIndex: 'campus',
    },
    {
      title: 'Deporte',
      dataIndex: 'deporte',
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      render: c => c ? 'Femenil' : 'Masculino',
    },
    {
      title: 'Entrenador',
      dataIndex: 'nombreEntrenador',
      render: (_, row) => `${row.nombreEntrenador} ${row.apellidoEntrenador}`,
    },
    {
      title: 'Asistente',
      dataIndex: 'nombreAsistente',
      render: (_, row) => `${row.nombreAsistente} ${row.apellidoAsistente}`,
    },
    {
      title: 'Acciones',
      dataIndex: 'equipoId',
      render: (sId, row, index) => (
        <>
          <img
            title="Editar"
            src={iconEdit}
            className='icons edit'
            onClick={() => {
              // setVisible(!visible);
              // setEquipo(row);
              setItemId(row.id);
              setScreen(6);
            }}
            />
          <img
            title="Eliminar"
            src={iconDelete}
            className='icons delete'
            onClick={() => {
              setEquipo(row);
              Swal.fire({
                title: 'ELIMINAR',
                text: "¿Eliminar al equipo " + row.nombre + "?",
                // text: JSON.stringify(row),
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
                    text: "¿Estas seguro de eliminar al equipo " + row.nombre + "?",
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
                        "El equipo " + row.nombre + " ha sido eliminado.",
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
    <>
      <h3>Equipos</h3>
      <Table
        columns={columns}
        dataSource={equipos.data}
        loading={loading}/>
    </>
  );
};