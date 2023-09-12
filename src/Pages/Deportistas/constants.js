import React from 'react';
import { aFacultities } from '../../Utils/constants';

export const aSearchElements = (aSports) => [
  {
    label: 'Expediente/Nombre',
    name: 'expediente,nombres,apellidos',
    type: 'input',
    or: true,
  },
  {
    label: 'Deporte',
    name: 'deporte_id',
    type: 'select',
    values: () => aSports.map(oSport => (
      <option value={oSport.id}>{oSport.nombre}</option>
    )),
  },
  {
    label: 'Facultad',
    name: 'facultad',
    type: 'select',
    values: () => aFacultities.map(sF => (
      <option value={`Facultad de ${sF}`}>Facultad de {sF}</option>
    )),
  },
];

export const oInitState = {
  'expediente,nombres,apellidos': '',
  deporte_id: null,
  facultad: null,
};
