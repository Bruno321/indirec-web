import React, { useState } from 'react';
import { Table } from '../../Components/Table/Table';
import { useFetchData } from '../../Hooks/Fetch.hook';
import iconDelete from "../../Assets/icons/delete.png";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import './Deportistas.css';
import qr from '../../Assets/icons/qr.png';
import iconInfo from "../../Assets/icons/more-info.png";
import ButtonsPages from '../../Components/ButtonsPages/ButtonsPages';
import ModalQR from '../../Components/Modals/ModalQR/ModalQR';
import MoreInfo from '../../Components/MoreInfo/MoreInfo';

export const DeportistasScreen = () => {
  //State para mostrar MAS INFORMACION de un deportista
  const [buttonMoreInfo, setButtonMoreInfo] = useState(false);
  const [selected, setSelected] = useState();  
  const [showQR, setShowQR] = useState(false);
  const [deportistas, loading] = useFetchData('deportistas');
  const [deportista, setDeportista] = useState({});

  const [pagina, setPagina] = useState(1);

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
      dataIndex: 'id',
      render: (sId, row, index) => (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <img
            title="Mostrar QR"
            src={qr}
            className='icons moreinfo'
            onClick={() => {
              setSelected(row);
              const [apellidoP, apellidoM] = row.apellidos.split(' ');
              setDeportista({
                nombre: row.nombres,
                apellidoP,
                apellidoM,
                idPropio: sId,
              })
              setShowQR(true);
            }}
          />
          <img
            title="Ver más"
            src={iconInfo}
            className='icons moreinfo'
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
        </div>
      ),
    }
  ];

  return (
    <>
      <h3>Deportistas</h3>
      <div className='prueba'>
        <Table
          columns={columns}
          dataSource={deportistas.data}
          loading={loading}
        />
        <MoreInfo
          trigger={buttonMoreInfo}
          setTrigger={setButtonMoreInfo}
          datos={selected}
        />
      </div>
      {
        !loading
        ?
          <div className='container-pages'>
            <ButtonsPages numberPage={pagina} setPagina={setPagina}/>
          </div>
        :
        ''
      }
      {
        showQR ?  <ModalQR datos={deportista} setMostrarModalQr={setShowQR}/> : ''
      }
    </>
  );
};
