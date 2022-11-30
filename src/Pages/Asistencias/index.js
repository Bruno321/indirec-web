import React from 'react';
import { Table } from '../../Components/Table/Table';
import { useFetchData } from '../../Hooks/Fetch.hook';

export const AsistenciasScreen = () => {
  const [asistencias, loading] = useFetchData('deportistas/asistencias');

  const columns = [
    {
      title: 'Nombre(s)',
      dataIndex: '',
      render: (_, row) => `${row?.deportistum?.nombre}`,
    },
    {
      title: 'Apellido(s)',
      dataIndex: '',
      render: (_, row) => `${row?.deportistum?.apellido}`,
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
    },
    {
      title: 'Hora de Entrada',
      dataIndex: 'horaEntrada',
    },
    {
      title: 'Hora de Salida',
      dataIndex: 'horaSalida',
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
