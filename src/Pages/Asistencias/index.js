import React from 'react';
import { Table } from '../../Components/Table/Table';
import { useFetchData } from '../../Hooks/Fetch.hook';

export const AsistenciasScreen = () => {
  const [asistencias, loading] = useFetchData('deportistas/asistencias');

  const columns = [
    {
      title: 'Nombre(s)',
      dataIndex: '',
    },
    {
      title: 'Apellido(s)',
      dataIndex: '',
    },
    {
      title: 'Fecha',
      dataIndex: '',
    },
    {
      title: 'Hora de Entrada',
      dataIndex: '',
    },
    {
      title: 'Hora de Salida',
      dataIndex: '',
    },
  ];

  return (
    <>
      <h3>Asistencias</h3>
      <Table
        columns={columns}
        dataSource={asistencias}
        loading={loading}/>
    </>
  );
};
