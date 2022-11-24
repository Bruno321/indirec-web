import React, { useState } from 'react';
import { Table } from '../../Components/Table/Table';
import { useFetchData } from '../../Hooks/Fetch.hook';
import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";
import iconMoreInfo from "../../Assets/icons/more-info.png";

import MoreInfo from '../../Components/MoreInfo/MoreInfo';

export const DeportistasScreen = () => {
  //State para mostrar MAS INFORMACION de un deportista
  const [buttonMoreInfo, setButtonMoreInfo] = useState(false);
  const [selected, setSelected] = useState();  
  const [deportistas, loading] = useFetchData('deportistas');

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
            onClick={() => {
              setButtonMoreInfo(true);
              setSelected(row);
            }}
          />
        </>
      ),
    }
  ];

  return (
    <>
      <h3>Deportistas</h3>
      <Table
        columns={columns}
        dataSource={deportistas}
        loading={loading}
      />
      <MoreInfo
        trigger={buttonMoreInfo}
        setTrigger={setButtonMoreInfo}
        datos={selected}
      />
    </>
  );
};
