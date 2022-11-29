import React, { useState } from 'react';
import { Table } from '../../Components/Table/Table';
import { useFetchData } from '../../Hooks/Fetch.hook';
import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";
import iconMoreInfo from "../../Assets/icons/more-info.png";

// Modal
import EditarEquipoModal from '../../Components/Modals/EditarEquipoModal/EditarEquipoModal';

export const EquiposScreen = () => {
  const [equipos, loading] = useFetchData('equipos');
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [equipo, setEquipo] = useState();

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
            onClick={() => {setOpenModalEdit(true); setEquipo(row)}}
            />
          <img
            title="Eliminar"
            src={iconDelete}
            className='icons delete'
            />
          <img
            title="Más información"
            src={iconMoreInfo}
            className='icons moreinfo'
          />
        </>
      ),
    }
  ];

  return (
    <>
      <h3>Equipos</h3>
      {openModalEdit && <EditarEquipoModal closeModal={setOpenModalEdit} equipo={equipo}/>}
      <Table
        columns={columns}
        dataSource={equipos}
        loading={loading}/>
    </>
  );
};
