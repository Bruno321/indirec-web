import React from 'react';
import { Table } from '../../Components/Table/Table';
import { useFetchData } from '../../Hooks/Fetch.hook';
import moment from 'moment';

export const AsistenciasScreen = () => {
  const [asistencias, loading] = useFetchData('deportistas/asistencias');

  const columns = [
    {
      title: 'Nombre(s)',
      dataIndex: '',
      render: (_, row) => `${row?.deportistum?.nombres}`,
    },
    {
      title: 'Apellido(s)',
      dataIndex: '',
      render: (_, row) => `${row?.deportistum?.apellidos}`,
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
    },
    {
      title: 'Hora de Entrada',
      dataIndex: 'horaEntrada',
      render: hE => hE ? moment(hE).format('HH:mm:ss a') : 'Sin registrar',
    },
    {
      title: 'Hora de Salida',
      dataIndex: 'horaSalida',
      render: hS => hS ? moment(hS).format('HH:mm:ss a') : 'Sin registrar',
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
