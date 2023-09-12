import React from 'react';

export const aSearchElements = (aSports) => [
  {
    label: 'Nombre del Evento',
    name: 'nombre',
    type: 'input',
  },
  {
    label: 'Deporte',
    name: 'deporte_id',
    type: 'select',
    values: () => aSports.map(oSport => (
      <option value={oSport.id}>{oSport.nombre}</option>
    )),
  },
];

export const oInitState = {
  nombre: '',
  deporte_id: null,
};
