import React, { useState } from 'react';
import { Table } from '../../Components/Table/Table';
import { useFetchData } from '../../Hooks/Fetch.hook';
import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";
import iconMoreInfo from "../../Assets/icons/more-info.png";
import Swal from 'sweetalert2/dist/sweetalert2.js';

// import 'sweetalert2/src/sweetalert2.scss'

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
                text: "¿Eliminar a "+ row.nombres + " " + row.apellidos + "?",
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
