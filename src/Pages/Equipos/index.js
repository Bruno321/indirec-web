import React, { useState, useContext, useEffect } from 'react';
import { Table } from '../../Components/Table/Table';
import { useFetchData } from '../../Hooks/Fetch.hook';
import iconDelete from "../../Assets/icons/delete.png";
import iconEdit from "../../Assets/icons/edit.png";
import pdf from "../../Assets/icons/pdf.png";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NavigationContext } from '../../Context/NavigationContext';
import { URL, process, SAVE, DELETE } from '../../Service/Api';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import ButtonsPages from '../../Components/ButtonsPages/ButtonsPages';
import { useDidMountEffect } from '../../Utils/DidMountEffect';

export const EquiposScreen = () => {
  const [equipos, loading, change] = useFetchData('equipos');
  const [pagina, setPagina] = useState(0);
  const { setItemId, setScreen } = useContext(NavigationContext);

  const [showSpinner, setShowSpinner] = useState(false);

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
      render: (sId, row) => (
        <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}>
          <img
            title="Generar PDF"
            src={pdf}
            className='icons pdf'
            onClick={async () => {
              setShowSpinner(true);
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
                    setShowSpinner(false)
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
              setItemId(row.id);
              setScreen(6);
            }}
          />
   <img
        title="Eliminar"
        src={iconDelete}
        className="icons delete"
        onClick={() => {
          Swal.fire({
            title: 'ELIMINAR',
            text: '¿Eliminar al equipo ' + row.nombre + '?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'ATENCION',
                text: '¿Estás seguro de eliminar al equipo ' + row.nombre + '?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar',
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    // Llama a la función para eliminar usando el ID del equipo
                    const response = await process(DELETE, 'equipos', null, { id: sId });
                    if (response.status === 200) {
                      Swal.fire(
                        'Eliminado satisfactoriamente',
                        'El equipo ' + row.nombre + ' ha sido eliminado.',
                        'success'
                      );
                      // Realiza una actualización para refrescar la lista de equipos
                      change();
                    } else {
                      Swal.fire(
                        'Error',
                        'Hubo un problema al intentar eliminar el equipo.',
                        'error'
                      );
                    }
                  } catch (error) {
                    console.error('Error al eliminar equipo:', error);
                    Swal.fire(
                      'Error',
                      'Hubo un problema al intentar eliminar el equipo.',
                      'error'
                    );
                  }
                }
              });
            }
          });
        }}
      />
        </div>
      ),
    }
  ];

  return (
    <>
      <h3>Equipos</h3>
      {
      showSpinner
      ?
        <LoadingSpinner texto="Descargando pdf"/>
      :
        <Table
          columns={columns}
          dataSource={equipos}
          loading={loading}
          change={change}
          pagina={pagina}
          setPagina={setPagina}
        />}
    </>
  );
};