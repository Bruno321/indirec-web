import React, { useState, useContext } from 'react';
import { Table } from '../../Components/Table/Table';
import { useFetchData } from '../../Hooks/Fetch.hook';
import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";
import pdf from "../../Assets/icons/pdf.png";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NavigationContext } from '../../Context/NavigationContext';
import { URL, process, SAVE } from '../../Service/Api';
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
      dataIndex: 'id',
      render: (sId, row, index) => (
        <>
          <img
            title="PDF"
            src={pdf}
            className='icons edit'
            onClick={async () => {
              console.log(sId)
              const response = await process(SAVE, 'equipo-pdf', {
                id: sId,
              }).catch(e=>{
                console.log(e.response.data)
              })

              if (response.status === 201) {
                  const link = document.createElement('a');
                  link.href = `${URL}/pdf/${response.data.pdf}`;
                  link.setAttribute('download', '');
                  link.setAttribute('target', '_blank');
                  link.setAttribute('rel', 'noopener noreferrer');

                  setTimeout(() => {
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                  }, [2000])
              } else {
                console.log(response);
              }
            }}
          />
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